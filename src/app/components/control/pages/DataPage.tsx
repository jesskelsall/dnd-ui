import classNames from 'classnames'
import { saveAs } from 'file-saver'
import { DateTime } from 'luxon'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setData } from '../../../actions/data'
import { dataToBlob, dataToJson, fileToString } from '../../../functions/json'
import { selectData } from '../../../selectors'
import { Data } from '../../../types/Data'

interface Status {
  message: string,
  type: 'danger' | 'success' | 'warning' | null,
}

const DEFAULT_STATUS: Status = {
  message: '',
  type: null,
}

const STATUS_DELAY = 2000
const FILE_INPUT_ID = 'import-json'

export const DataPage = (): JSX.Element => {
  const [status, setStatus] = useState<Status>(DEFAULT_STATUS)
  const data = useSelector(selectData)
  const dispatch = useDispatch()

  const showActionStatus = (actionStatus: Status) => {
    setStatus(actionStatus)
    setTimeout(() => setStatus(DEFAULT_STATUS), STATUS_DELAY)
  }

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target

    if (files && files.length) {
      fileToString(files[0]).then((json) => {
        try {
          const importedData = JSON.parse(json) as Data
          dispatch(setData(importedData))

          showActionStatus({ message: 'Imported from JSON.', type: 'success' })
        } catch (error) {
          showActionStatus({ message: 'Invalid JSON.', type: 'danger' })
        }
      })
    } else {
      showActionStatus({ message: 'No file.', type: 'warning' })
    }
  }

  const onCopyToClipboard = () => {
    navigator.clipboard.writeText(dataToJson(data))

    showActionStatus({ message: 'Copied to clipboard.', type: 'success' })
  }

  const onExportToJSON = () => {
    const blob = dataToBlob(data)
    const formattedDate = DateTime.now().toFormat('yyyy-LL-dd HH-mm-ss')
    const name = `dnd-ui ${formattedDate}.json`

    saveAs(blob, name)

    showActionStatus({
      message: 'Exported to JSON.',
      type: 'success',
    })
  }

  const onImportFromJSON = () => {
    const input = document.getElementById(FILE_INPUT_ID)
    if (!input) return

    input.click()
  }

  return (
    <div className="page page-center data">
      <div className="d-grid gap-2 col-4">
        {/* Status */}
        <div
          className={classNames('alert', status.type ? `alert-${status.type}` : null)}
          role="alert"
        >
          {status.message}
        </div>

        {/* Actions */}
        <button className="btn btn-lg btn-primary" onClick={onImportFromJSON} type="button">Import from JSON</button>
        <button className="btn btn-lg btn-primary" onClick={onExportToJSON} type="button">Export to JSON</button>
        <button className="btn btn-lg btn-primary" onClick={onCopyToClipboard} type="button">Copy to Clipboard</button>

        {/* Import JSON input */}
        <input
          accept=".json"
          className="file-import"
          id={FILE_INPUT_ID}
          multiple={false}
          onChange={onChangeFile}
          type="file"
        />
      </div>
    </div>
  )
}
