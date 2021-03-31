import { Data } from '../types/Data'

export const dataToJson = (data: Data): string => JSON.stringify(data, null, 2)

export const dataToBlob = (blobData: Data): Blob => new Blob(
  [dataToJson(blobData)],
  { type: 'text/plain;charset=utf-8' },
)

export const fileToString = (file: File): Promise<string> => {
  const fileReader = new FileReader()

  return new Promise((resolve) => {
    fileReader.onload = () => {
      console.info('onload')
      resolve(fileReader.result as string)
    }

    fileReader.readAsText(file)
  })
}
