import {
  flow, get, isEqual, set,
} from 'lodash/fp'
import React, { useState } from 'react'
import {
  CLASSES, EMPTY_CHOICE, ORGANISATIONS, RANKS,
} from '../../app/consts/choices'
import { NAME_SCALES } from '../../app/consts/choices/display'
import { GRADIENT_COLOURS } from '../../app/consts/gradientColours'
import { IMAGE_TYPES } from '../../app/consts/images'
import { classesToListWithLevels, classesToPrimaryClass } from '../../app/functions/classes'
import { createLinearGradient } from '../../app/functions/gradient'
import { fileNameToUrl } from '../../app/functions/url'
import { Choice } from '../../app/types/Choice'
import { Character } from '../../app/types/Character'
import { Class } from '../../app/types/Class'
import { GradientColours } from '../../app/types/Gradient'
import { Avatar } from '../../app/components/display/Avatar'
import { BackgroundGradient } from './form/BackgroundGradient'
import { DropdownField } from './form/DropdownField'
import { NumberInputField } from './form/NumberInput'
import { TextInputField } from './form/TextInputField'

export interface CharacterEditorProps {
  character: Character,
  onChangeData: (character: Character) => void,
  onClose: () => void,
  realTime: boolean,
}

export const CharacterEditor = ({
  character,
  onChangeData,
  onClose,
  realTime,
}: CharacterEditorProps): JSX.Element => {
  const [editingCharacter, setEditingCharacter] = useState(character)
  const [selectedClass, setSelectedClass] = useState(classesToPrimaryClass(character.classes))

  const characterChangesToApply = !realTime && !isEqual(character, editingCharacter)

  const saveCharacter = () => {
    onChangeData(editingCharacter)
    onClose()
  }

  const updateCharacter = (updatedCharacter: Character) => {
    setEditingCharacter(updatedCharacter)
    if (realTime) onChangeData(updatedCharacter)
  }

  const setPath = (path: string) => (value: string) => updateCharacter(
    set(path, value, editingCharacter),
  )

  const renderSimpleDropdown = (path: string, choices: Choice[]) => (
    <DropdownField
      onChange={setPath(path)}
      options={[EMPTY_CHOICE, ...choices]}
      value={get(path, editingCharacter)}
    />
  )

  const renderSimpleTextInput = (path: string) => (
    <TextInputField onChange={setPath(path)} value={get(path, editingCharacter)} />
  )

  const getClassLevel = (): number | string => {
    if (!selectedClass) return ''
    return character.classes[selectedClass as Class] || ''
  }

  const onChangeClassLevel = (level: number) => {
    updateCharacter(set(`classes.${selectedClass}`, level, editingCharacter))
  }

  const onChangeId = (newId: string) => {
    updateCharacter(flow(
      set('id', newId),
      set('avatar.smallURL', newId ? fileNameToUrl(IMAGE_TYPES.SMALL, newId) : ''),
      set('avatar.largeURL', newId ? fileNameToUrl(IMAGE_TYPES.LARGE, newId) : ''),
    )(editingCharacter))
  }

  const onChangeRank = (value: string) => {
    const choice = RANKS.find((rank) => rank.value === value)

    updateCharacter(flow(
      set('affiliation.rank', choice ? choice.value : ''),
      set('affiliation.iconURL', choice ? fileNameToUrl(IMAGE_TYPES.ICON, choice.path) : ''),
    )(editingCharacter))
  }

  const onChangeBackground = (colours: GradientColours) => updateCharacter(
    set('avatar.gradientColours', colours, editingCharacter),
  )

  const { gradientColours } = editingCharacter.avatar

  return (
    <div className="container character-editor">
      <div className="card">
        {/* Header */}
        <div className="card-header">
          <h3>Edit Character</h3>
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
                <img alt="icon" className="organisation-icon" src={editingCharacter.affiliation.iconURL} />
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="card-body">
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Real Name</label>
            <div className="col">
              {renderSimpleTextInput('names.real.name')}
            </div>
            <label className="col-sm-2 col-form-label">Scale</label>
            <div className="col-sm-2">
              {renderSimpleDropdown('names.real.scale', NAME_SCALES)}
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Display Name</label>
            <div className="col">
              {renderSimpleTextInput('names.display.name')}
            </div>
            <label className="col-sm-2 col-form-label">Scale</label>
            <div className="col-sm-2">
              {renderSimpleDropdown('names.display.scale', NAME_SCALES)}
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Class</label>
            <div className="col">
              <DropdownField
                onChange={(changedClass) => setSelectedClass(changedClass)}
                options={[EMPTY_CHOICE, ...CLASSES]}
                value={selectedClass}
              />
            </div>
            <label className="col-sm-2 col-form-label">Class Level</label>
            <div className="col">
              <NumberInputField
                disabled={!selectedClass}
                onChange={onChangeClassLevel}
                value={getClassLevel()}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label" />
            <div className="col class-levels">
              {classesToListWithLevels(character.classes)}
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Organisation</label>
            <div className="col">
              {renderSimpleDropdown('affiliation.organisation', ORGANISATIONS)}
            </div>
            <label className="col-sm-2 col-form-label">Rank</label>
            <div className="col">
              <DropdownField
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
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">ID</label>
            <div className="col">
              <TextInputField
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

        {/* Footer */}
        <div className="card-footer">
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            {realTime ? (
              <button className="btn btn-info" onClick={onClose} type="button">Done</button>
            ) : (
              <>
                <button className="btn btn-danger" onClick={onClose} type="button">Cancel</button>
                <button
                  className="btn btn-primary"
                  disabled={!characterChangesToApply}
                  onClick={saveCharacter}
                  type="button"
                >
                  Save
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Real Name - Text Size
 * Display Name - Text Size
 * Pronouns - Race
 * Class
 * Organisation - Rank
 * Division - Group
 * ID
 * Small Avatar
 * Large Avatar
 * Background
 */
