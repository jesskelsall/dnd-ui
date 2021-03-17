import { toPairs } from 'lodash/fp'
import React, { useState } from 'react'
import { PAGES } from '../../consts/pages'
import { DataPropagationProps } from '../../types/DataPropagation'
import { Page } from '../../types/Page'
import { Navbar } from './Navbar'
import { CharactersPage } from './pages/CharactersPage'
import { DataPage } from './pages/DataPage'
import { DisplayPage } from './pages/DisplayPage'

const pages: Record<Page, (props: DataPropagationProps) => JSX.Element> = {
  Characters: CharactersPage,
  Display: DisplayPage,
  Data: DataPage,
}

export const ControlArea = ({
  data,
  onSave,
}: DataPropagationProps): JSX.Element => {
  const [page, setPage] = useState(PAGES[0])

  return (
    <div className="area control-area">
      <Navbar activePage={page} onClick={setPage} />
      {toPairs(pages).map(([pageName, PageComponent]) => {
        const isActivePage = pageName === page
        return isActivePage ? <PageComponent data={data} onSave={onSave} /> : null
      })}
    </div>
  )
}
