import React from 'react'
import { LINE_TRANSFORMERS } from '../../consts'
import { Character } from '../../types'
import { Avatar } from '../display/Avatar'

export interface CharacterControlProps {
  character: Character,
  onDelete: () => void,
  onDuplicate: () => void,
  onEdit: () => void,
}

export const CharacterControl = ({
  character,
  onDelete,
  onDuplicate,
  onEdit,
}: CharacterControlProps): JSX.Element => (
  <tr>
    <td>
      <div className="characters-list-avatar">
        {character.avatar.smallURL && (
          <Avatar
            backgroundGradientColours={character.avatar.gradientColours}
            size={38}
            url={character.avatar.smallURL}
          />
        )}
      </div>
    </td>
    <td>{LINE_TRANSFORMERS.realName(character)}</td>
    <td>{LINE_TRANSFORMERS.race(character)}</td>
    <td>{LINE_TRANSFORMERS.classes(character)}</td>
    <td className="characters-list-actions">
      <div className="characters-list-actions-buttons">
        <button className="btn btn-outline-primary" onClick={onEdit} type="button">Edit</button>
        <button className="btn btn-outline-primary" onClick={onDuplicate} type="button">Duplicate</button>
        <button className="btn btn-outline-danger" onClick={onDelete} type="button">Delete</button>
      </div>
    </td>
  </tr>
)
