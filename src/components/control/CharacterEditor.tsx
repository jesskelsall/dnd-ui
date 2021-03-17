import { isEqual } from 'lodash'
import {
  flow, get, kebabCase, noop, set,
} from 'lodash/fp'
import React, { useState } from 'react'
import {
  CLASSES, EMPTY_CHOICE, ORGANISATIONS, PRONOUNS, RACES, RANKS,
} from '../../consts/choices'
import { GRADIENT_COLOURS } from '../../consts/gradientColours'
import { IMAGE_TYPES } from '../../consts/images'
import { fileNameToUrl, urlToFileName } from '../../functions/url'
import { Choice } from '../../types/Choice'
import { Character } from '../../types/data/character'
import { GradientColours } from '../../types/Gradient'
import { Avatar } from '../display/Avatar'
import { BackgroundGradient } from './form/BackgroundGradient'
import { DropdownField } from './form/DropdownField'
import { TextInputField } from './form/TextInputField'

export interface CharacterEditorProps {
  character: Character,
  onClose?: () => void,
  onSave?: (character: Character) => void,
}

export const CharacterEditor = ({
  character,
  onClose = noop,
  onSave = noop,
}: CharacterEditorProps): JSX.Element => {
  const [editingCharacter, setEditingCharacter] = useState(character)

  const saveCharacter = () => onSave(editingCharacter)

  const setPath = (path: string) => (value: string) => setEditingCharacter(
    set(path, value, editingCharacter),
  )

  const setURL = (path: string, folder: string) => (value: string) => setEditingCharacter(
    set(path, fileNameToUrl(folder, value), editingCharacter),
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

  const onChangeRealName = (value: string) => {
    const namePath = kebabCase(value)

    setEditingCharacter(flow(
      set('name.realName', value),
      set('avatar.smallURL', fileNameToUrl(IMAGE_TYPES.SMALL, namePath)),
      set('avatar.largeURL', fileNameToUrl(IMAGE_TYPES.LARGE, namePath)),
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
            background: `linear-gradient(to bottom, ${gradientColours.slice(0, 2)})`,
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
              <TextInputField
                onChange={onChangeRealName}
                value={get('name.realName', editingCharacter)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Display Name</label>
            <div className="col">
              {renderSimpleTextInput('name.displayName')}
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Pronouns</label>
            <div className="col">
              {renderSimpleDropdown('pronouns', PRONOUNS)}
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Race</label>
            <div className="col">
              {renderSimpleDropdown('race', RACES)}
            </div>
            <label className="col-sm-2 col-form-label">Class</label>
            <div className="col">
              {renderSimpleDropdown('class', CLASSES)}
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
                value={get('affiliation.rank', editingCharacter)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Division</label>
            <div className="col">
              {renderSimpleTextInput('affiliation.division')}
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Group</label>
            <div className="col">
              {renderSimpleTextInput('affiliation.group')}
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label">Small Avatar</label>
            <div className="col">
              <TextInputField
                onChange={setURL('avatar.smallURL', IMAGE_TYPES.SMALL)}
                value={urlToFileName(get('avatar.smallURL', editingCharacter))}
              />
            </div>
            <label className="col-sm-2 col-form-label">Large Avatar</label>
            <div className="col">
              <TextInputField
                onChange={setURL('avatar.largeURL', IMAGE_TYPES.LARGE)}
                value={urlToFileName(get('avatar.largeURL', editingCharacter))}
              />
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
            <button className="btn btn-outline-primary" onClick={onClose} type="button">Cancel</button>
            <button className="btn btn-primary" onClick={saveCharacter} type="button">Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}
