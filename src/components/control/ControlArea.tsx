import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { DEFAULT_PAGE } from '../../app/consts/page'
import { selectCharacters, selectPage } from '../../app/selectors'
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

  // TODO rename
  const reduxPage = useSelector(selectPage)
  const characters = useSelector(selectCharacters)

  return (
    <div className="area control-area">
      <Navbar
        // activePage={page}
        dataChangesToApply={dataChangesToApply}
        onApplyData={onApplyData}
        onChangeRealTime={onChangeRealTime}
        // onNavigate={setPage}
        realTime={realTime}
      />
      {reduxPage.primary === 'characters' && (
        <CharactersPage
          data={data}
          onChangeData={onChangeData}
          onStartEdit={editCharacterNavigation}
          realTime={realTime}
        />
      )}
      {reduxPage.primary === 'characters' && reduxPage.secondary && (
        <EditCharacterPage
          characterId={reduxPage.secondary}
          data={data}
          onChangeData={onChangeData}
          onChangeEditingCharacterId={editCharacterNavigation}
          onFinishEdit={() => editCharacterNavigation('')}
          realTime={realTime}
        />
      )}
      {reduxPage.primary === 'screens' && (
        <DisplayPage data={data} onChangeData={onChangeData} realTime={realTime} />
      )}
      {reduxPage.primary === 'data' && (
        <DataPage data={data} onChangeData={onChangeData} realTime={realTime} />
      )}
    </div>
  )
}
