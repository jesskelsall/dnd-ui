import classNames from 'classnames'
import {
  flow, get, isEqual, set, startCase,
} from 'lodash/fp'
import React, { useState } from 'react'
import {
  CLASSES, EMPTY_CHOICE, ORGANISATIONS, RACES, RANKS,
} from '../../consts/choices'
import { NAME_SCALES } from '../../consts/choices/display'
import { GRADIENT_COLOURS } from '../../consts/gradientColours'
import { IMAGE_TYPES } from '../../consts/images'
import { classesToListWithLevels, classesToPrimaryClass } from '../../functions/classes'
import { createLinearGradient } from '../../functions/gradient'
import { fileNameToUrl } from '../../functions/url'
import { Character } from '../../types/Character'
import { Choice } from '../../types/Choice'
import { Class } from '../../types/Class'
import { GradientColours } from '../../types/Gradient'
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

  const [test, setTest] = useState<string[]>(['nonBinary', 'feminine'])

  const onChangeTest = (values: string[]) => {
    console.info('onChangeTest', { values })
    setTest(values)
  }

  const characterChangesToApply = !isEqual(character, editingCharacter)

  const saveCharacter = () => {
    onSave(editingCharacter)
    onClose()
  }

  const setPath = (path: string) => (value: string) => setEditingCharacter(
    set(path, value, editingCharacter),
  )

  const renderSimpleDropdown = (path: string, choices: Choice[]) => (
    <Dropdown
      onChange={setPath(path)}
      options={[EMPTY_CHOICE, ...choices]}
      value={get(path, editingCharacter)}
    />
  )

  const renderSimpleTextInput = (path: string) => (
    <TextInput onChange={setPath(path)} value={get(path, editingCharacter)} />
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

  const renderNameFields = (namePath: string): JSX.Element => {
    const nameLabel = `${startCase(namePath)} Name`
    return (
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">{nameLabel}</label>
        <div className="col">
          {renderSimpleTextInput(`names.${namePath}.name`)}
        </div>
        <label className="col-sm-2 col-form-label">Scale</label>
        <div className="col-sm-2">
          {renderSimpleDropdown(`names.${namePath}.scale`, NAME_SCALES)}
        </div>
      </div>
    )
  }

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
          {renderNameFields('real')}
          {renderNameFields('display')}
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Pronouns</label>
            <div className="col">
              {renderSimpleTextInput('pronouns.character')}
            </div>
            <label className="col-sm-2 col-form-label">Race</label>
            <div className="col">
              {renderSimpleDropdown('race', RACES)}
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
        </div>

        <div className="section">
          <h1>Affiliation</h1>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Organisation</label>
            <div className="col">
              {renderSimpleDropdown('affiliation.organisation', ORGANISATIONS)}
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
          {renderNameFields('player')}
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Pronouns</label>
            <div className="col">
              {renderSimpleTextInput('pronouns.player')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
