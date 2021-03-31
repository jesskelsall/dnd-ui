import {
  add, filter, flow, getOr, map, reject, set,
} from 'lodash/fp'
import React from 'react'
import { useSelector } from 'react-redux'
import { DISPLAY_CHARACTER_TEMPLATE } from '../../../app/consts/dataTemplates'
import { sort } from '../../../app/functions/lodash'
import { randomId } from '../../../app/functions/random'
import { Choice } from '../../../app/types/Choice'
import { Character } from '../../../app/types/Character'
import { DataPropagationProps } from '../../../types/DataPropagation'
import { DropdownField } from '../form/DropdownField'

export const DisplayPage = ({
  data,
  onChangeData,
}: DataPropagationProps): JSX.Element => {
  const getUnusedCharacterChoices = (): Choice[] => {
    const usedCharacterIds = map('characterId', data.display.displayCharacters)

    return [
      { label: 'Add Character...', value: '' },
      ...flow(
        reject((character: Character) => usedCharacterIds.includes(character.id)),
        map((character) => ({
          label: character.names.real.name,
          value: character.id,
        })),
      )(data.characters),
    ]
  }

  const createDisplayCharacter = (characterId: string) => {
    if (characterId) {
      const { displayCharacters } = data.display

      const highestColumn = flow(
        map('position.column'),
        sort,
        getOr(1, '0'),
      )(displayCharacters)

      const nextRowInColumn = flow(
        filter(['position.column', highestColumn]),
        map('position.row'),
        sort,
        getOr(0, '0'),
        add(1),
      )(displayCharacters)

      const displayCharacterId = randomId()
      const displayCharacter = flow(
        set('characterId', characterId),
        set('id', displayCharacterId),
        set('position.column', highestColumn),
        set('position.row', nextRowInColumn),
      )(DISPLAY_CHARACTER_TEMPLATE)

      onChangeData(set(`display.displayCharacters.${displayCharacterId}`, displayCharacter, data))
    }
  }

  return (
    <div className="control-area-content">
      <DropdownField
        onChange={createDisplayCharacter}
        options={getUnusedCharacterChoices()}
        value=""
      />
    </div>
  )
}
