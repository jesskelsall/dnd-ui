import React from 'react'
import { RACES } from '../../consts'
import { choiceName, classesToList } from '../../functions'
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
    <td>{character.names.real.name}</td>
    <td>{choiceName(character.race, RACES)}</td>
    <td>{classesToList(character.classes)}</td>
    <td className="characters-list-actions">
      <div className="characters-list-actions-buttons">
        <button className="btn btn-outline-primary" onClick={onEdit} type="button">Edit</button>
        <button className="btn btn-outline-primary" onClick={onDuplicate} type="button">Duplicate</button>
        <button className="btn btn-outline-danger" onClick={onDelete} type="button">Delete</button>
      </div>
    </td>
  </tr>
)
