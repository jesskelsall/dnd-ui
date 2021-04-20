import { Store } from '../types/Store'

export const dataToJson = (data: Store): string => JSON.stringify(data, null, 2)

export const dataToBlob = (blobData: Store): Blob => new Blob(
  [dataToJson(blobData)],
  { type: 'text/plain;charset=utf-8' },
)

export const fileToString = (file: File): Promise<string> => {
  const fileReader = new FileReader()

  return new Promise((resolve) => {
    fileReader.onload = () => {
      resolve(fileReader.result as string)
    }

    fileReader.readAsText(file)
  })
}
