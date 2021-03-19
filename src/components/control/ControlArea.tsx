import React, { useState } from 'react'
import { DEFAULT_PAGE } from '../../consts/page'
import { DataPropagationProps } from '../../types/DataPropagation'
import { Navbar } from './Navbar'
import { CharactersPage } from './pages/CharactersPage'
import { DataPage } from './pages/DataPage'
import { DisplayPage } from './pages/DisplayPage'
import { EditCharacterPage } from './pages/EditCharacterPage'

export interface ControlAreaProps extends DataPropagationProps {
  dataChangesToApply: boolean,
  onApplyData: () => void,
  onChangeRealTime: (realTime: boolean) => void,
}

export const ControlArea = ({
  data,
  dataChangesToApply,
  onApplyData,
  onChangeData,
  onChangeRealTime,
  realTime,
}: ControlAreaProps): JSX.Element => {
  const [page, setPage] = useState(DEFAULT_PAGE)
  const [editingCharacterId, setEditingCharacterId] = useState('')

  const editCharacterNavigation = (characterId: string) => {
    setEditingCharacterId(characterId)
    setPage(characterId ? 'editCharacter' : 'characters')
  }

  return (
    <div className="area control-area">
      <Navbar
        activePage={page}
        dataChangesToApply={dataChangesToApply}
        onApplyData={onApplyData}
        onChangeRealTime={onChangeRealTime}
        onNavigate={setPage}
        realTime={realTime}
      />
      {page === 'characters' && (
        <CharactersPage
          data={data}
          onChangeData={onChangeData}
          onStartEdit={editCharacterNavigation}
          realTime={realTime}
        />
      )}
      {page === 'display' && (
        <DisplayPage data={data} onChangeData={onChangeData} realTime={realTime} />
      )}
      {page === 'data' && (
        <DataPage data={data} onChangeData={onChangeData} realTime={realTime} />
      )}
      {page === 'editCharacter' && editingCharacterId && (
        <EditCharacterPage
          characterId={editingCharacterId}
          data={data}
          onChangeData={onChangeData}
          onChangeEditingCharacterId={editCharacterNavigation}
          onFinishEdit={() => editCharacterNavigation('')}
          realTime={realTime}
        />
      )}
    </div>
  )
}
