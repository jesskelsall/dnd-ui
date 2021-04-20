import classNames from 'classnames'
import {
  flow, get, isEqual, set,
} from 'lodash/fp'
import React, { useState } from 'react'
import {
  CLASSES, EMPTY_CHOICE, GRADIENT_COLOURS, IMAGE_TYPES, NAME_SCALES, ORGANISATIONS, RACES, RANKS,
} from '../../consts'
import {
  classesToListWithLevels, classesToPrimaryClass, createLinearGradient, fileNameToUrl,
} from '../../functions'
import {
  Character, Choice, ChoiceValue, Class, GradientColours,
} from '../../types'
import { Avatar } from '../display/Avatar'
import {
  BackgroundGradient, Dropdown, NumberInput, TextInput,
} from '../form'

export interface CharacterEditorProps {
  character: Character,
  onClose: () => void,
  onSave: (character: Character) => void,
}

export const CharacterEditor = ({
  character,
  onSave,
  onClose,
}: CharacterEditorProps): JSX.Element => {
  const [editingCharacter, setEditingCharacter] = useState(character)
  const [selectedClass, setSelectedClass] = useState(classesToPrimaryClass(character.classes))

  const characterChangesToApply = !isEqual(character, editingCharacter)

  const saveCharacter = () => {
    onSave(editingCharacter)
    onClose()
  }

  const setPath = <V extends unknown>(path: string) => (value: V) => setEditingCharacter(
    set(path, value, editingCharacter),
  )

  const renderSimpleDropdown = <V extends ChoiceValue = string>(
    path: string,
    choices: Choice<V>[],
  ) => (
    <Dropdown
      onChange={setPath<V>(path)}
      options={choices}
      value={get(path, editingCharacter)}
    />
    )

  const renderSimpleNumberInput = (path: string) => (
    <NumberInput onChange={setPath<number>(path)} value={get(path, editingCharacter)} />
  )

  const renderSimpleTextInput = (path: string) => (
    <TextInput onChange={setPath<string>(path)} value={get(path, editingCharacter)} />
  )

  const getClassLevel = (): number | string => {
    if (!selectedClass) return ''
    return editingCharacter.classes[selectedClass as Class] || ''
  }

  const onChangeClassLevel = (level: number) => {
    setEditingCharacter(set(`classes.${selectedClass}`, level, editingCharacter))
  }

  const onChangeId = (newId: string) => {
    setEditingCharacter(flow(
      set('id', newId),
      set('avatar.smallURL', newId ? fileNameToUrl(IMAGE_TYPES.SMALL, newId) : ''),
      set('avatar.largeURL', newId ? fileNameToUrl(IMAGE_TYPES.LARGE, newId) : ''),
    )(editingCharacter))
  }

  const onChangeRank = (value: string) => {
    const choice = RANKS.find((rank) => rank.value === value)

    setEditingCharacter(flow(
      set('affiliation.rank', choice ? choice.value : ''),
      set('affiliation.iconURL', choice ? fileNameToUrl(IMAGE_TYPES.ICON, choice.path) : ''),
    )(editingCharacter))
  }

  const onChangeBackground = (colours: GradientColours) => setEditingCharacter(
    set('avatar.gradientColours', colours, editingCharacter),
  )

  const renderNameFields = (namePath: string, fieldName: string): JSX.Element => (
    <div className="row mb-3">
      <label className="col-sm-2 col-form-label">{fieldName}</label>
      <div className="col">
        {renderSimpleTextInput(`${namePath}.name`)}
      </div>
      <label className="col-sm-2 col-form-label">Scale</label>
      <div className="col-sm-2">
        {renderSimpleDropdown<number>(`${namePath}.scale`, NAME_SCALES)}
      </div>
    </div>
  )

  const { gradientColours } = editingCharacter.avatar

  return (
    <div className="page character-editor">
      {/* Secondary Navbar */}
      <div className="navbar navbar-secondary">
        <div className="navbar-center d-grid gap-2 d-md-flex">
          <button
            className={classNames('btn', {
              'btn-primary': characterChangesToApply,
              'btn-outline-primary': !characterChangesToApply,
            })}
            disabled={!characterChangesToApply}
            onClick={saveCharacter}
            type="button"
          >
            Save
          </button>
          <button
            className={classNames('btn', {
              'btn-danger': characterChangesToApply,
              'btn-primary': !characterChangesToApply,
            })}
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Images */}
      <div
        className="card-img-flush"
        style={{
          background: createLinearGradient(gradientColours.slice(0, 2)),
        }}
      >
        {editingCharacter.avatar.largeURL && (
        <img alt="large" className="avatar-large" src={editingCharacter.avatar.largeURL} />
        )}
        <div className="right-images">
          {editingCharacter.avatar.smallURL && (
          <div className="avatar-small">
            <Avatar
              backgroundGradientColours={gradientColours}
              url={editingCharacter.avatar.smallURL}
            />
          </div>
          )}
          {editingCharacter.affiliation.iconURL && (
          <div className="organisation-icon-container">
            <img
              alt="icon"
              className="organisation-icon"
              src={editingCharacter.affiliation.iconURL}
            />
          </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="page page-scroll details">
        <div className="section">
          <h1>Character</h1>
          {renderNameFields('names.real', 'Real Name')}
          {renderNameFields('names.display', 'Display Name')}
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Pronouns</label>
            <div className="col">
              {renderSimpleTextInput('pronouns')}
            </div>
            <label className="col-sm-2 col-form-label">Race</label>
            <div className="col">
              {renderSimpleDropdown('race', [EMPTY_CHOICE, ...RACES])}
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Class</label>
            <div className="col">
              <Dropdown
                onChange={(changedClass) => setSelectedClass(changedClass)}
                options={[EMPTY_CHOICE, ...CLASSES]}
                value={selectedClass}
              />
            </div>
            <label className="col-sm-2 col-form-label">Class Level</label>
            <div className="col">
              <NumberInput
                disabled={!selectedClass}
                onChange={onChangeClassLevel}
                value={getClassLevel()}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label" />
            <div className="col class-levels">
              {classesToListWithLevels(editingCharacter.classes)}
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Hit Points</label>
            <div className="col">
              {renderSimpleNumberInput('initiative.maxHealth')}
            </div>
            <label className="col-sm-2 col-form-label">Initiative Bonus</label>
            <div className="col">
              {renderSimpleNumberInput('initiative.bonus')}
            </div>
          </div>
        </div>

        <div className="section">
          <h1>Affiliation</h1>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Organisation</label>
            <div className="col">
              {renderSimpleDropdown('affiliation.organisation', [EMPTY_CHOICE, ...ORGANISATIONS])}
            </div>
            <label className="col-sm-2 col-form-label">Rank</label>
            <div className="col">
              <Dropdown
                onChange={onChangeRank}
                options={[EMPTY_CHOICE, ...RANKS]}
                value={editingCharacter.affiliation.rank}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Division</label>
            <div className="col">
              {renderSimpleTextInput('affiliation.division')}
            </div>
            <label className="col-sm-2 col-form-label">Group</label>
            <div className="col">
              {renderSimpleTextInput('affiliation.group')}
            </div>
          </div>
        </div>

        <div className="section">
          <h1>Images</h1>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">ID</label>
            <div className="col">
              <TextInput
                onChange={onChangeId}
                value={editingCharacter.id}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Small Avatar</label>
            <div className="col">
              {renderSimpleTextInput('avatar.smallURL')}
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Large Avatar</label>
            <div className="col">
              {renderSimpleTextInput('avatar.largeURL')}
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Background</label>
            <div className="col gradient-colours">
              {GRADIENT_COLOURS.map((colours) => (
                <BackgroundGradient
                  key={colours[0]}
                  gradientColours={colours}
                  onClick={onChangeBackground}
                  selected={isEqual(colours, gradientColours)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="section">
          <h1>Player</h1>
          {renderNameFields('player.name', 'Player Name')}
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Pronouns</label>
            <div className="col">
              {renderSimpleTextInput('player.pronouns')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
