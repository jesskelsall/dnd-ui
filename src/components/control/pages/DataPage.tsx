import classNames from 'classnames'
import { saveAs } from 'file-saver'
import { set } from 'lodash/fp'
import { DateTime } from 'luxon'
import React, { useState } from 'react'
import { dataToBlob, dataToJson, fileToString } from '../../../functions/json'
import { Data } from '../../../types/data'
import { DataPropagationProps } from '../../../types/DataPropagation'

type DataControl = 'copy' | 'export' | 'import'
type OutcomeStatus = 'danger' | 'success' | 'warning'

interface DataControlDetails {
  action: (data: Data) => Promise<void>,
  control: DataControl,
  name: string,
}

interface Outcome {
  status: OutcomeStatus | null,
  message: string,
}

const DEFAULT_OUTCOME: Outcome = {
  message: '',
  status: null,
}

const OUTCOME_DELAY = 2000
const FILE_INPUT_ID = 'import-json'

export const DataPage = ({
  data,
  onChangeData,
}: DataPropagationProps): JSX.Element => {
  const [
    controlOutcomes, setControlOutcomes,
  ] = useState<Record<DataControl, Outcome>>({
    copy: DEFAULT_OUTCOME,
    export: DEFAULT_OUTCOME,
    import: DEFAULT_OUTCOME,
  })

  const setControlOutcome = (control: DataControl, outcome: Outcome) => {
    setControlOutcomes(set(control, outcome, controlOutcomes))

    setTimeout(() => {
      setControlOutcomes(set(control, DEFAULT_OUTCOME, controlOutcomes))
    }, OUTCOME_DELAY)
  }

  const dataControls: DataControlDetails[] = [
    {
      action: async (): Promise<void> => {
        const input = document.getElementById(FILE_INPUT_ID)
        if (!input) return

        input.click()
      },
      control: 'import',
      name: 'Import from JSON',
    },
    {
      action: async (exportData) => {
        const blob = dataToBlob(exportData)
        const formattedDate = DateTime.now().toFormat('yyyy-LL-dd HH-mm-ss')
        const name = `dnd-ui ${formattedDate}.json`

        saveAs(blob, name)

        setControlOutcome('export', {
          message: 'Exported',
          status: 'success',
        })
      },
      control: 'export',
      name: 'Export to JSON',
    },
    {
      action: async (exportData) => {
        navigator.clipboard.writeText(dataToJson(exportData))

        setControlOutcome('copy', {
          message: 'Copied',
          status: 'success',
        })
      },
      control: 'copy',
      name: 'Copy to Clipboard',
    },
  ]

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target

    if (files && files.length) {
      fileToString(files[0]).then((json) => {
        try {
          const importedData = JSON.parse(json) as Data
          onChangeData(importedData)
          setControlOutcome('import', {
            message: 'Imported',
            status: 'success',
          })
        } catch (error) {
          setControlOutcome('import', {
            message: 'Invalid JSON',
            status: 'danger',
          })
        }
        console.info({ json })
      })
    } else {
      setControlOutcome('import', {
        message: 'No File',
        status: 'warning',
      })
    }
  }

  return (
    <div className="data-page">
      {/* Import JSON input */}
      <input
        accept=".json"
        className="file-import"
        id={FILE_INPUT_ID}
        multiple={false}
        onChange={onChangeFile}
        type="file"
      />

      {/* Controls */}
      <div className="data-page-controls d-grid gap-2 d-md-flex justify-content-md-center">
        {dataControls.map((dataControl) => {
          const outcome = controlOutcomes[dataControl.control]

          const onClick = async () => {
            await dataControl.action(data)
          }

          return (
            <button
              className={classNames(
                'btn',
                outcome.message ? `btn-${outcome.status}` : 'btn-outline-primary',
              )}
              key={dataControl.control}
              onClick={onClick}
              type="button"
            >
              {outcome.message || dataControl.name}
            </button>
          )
        })}
      </div>
      <pre className="data-json">{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
