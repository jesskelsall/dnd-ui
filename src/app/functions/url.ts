import { IMAGES_URL } from '../consts/images'

export const urlToFileName = (url: string): string => {
  if (!url) return ''

  const pathParts = url.split('/')
  return pathParts[pathParts.length - 1].replace('.png', '')
}

export const fileNameToUrl = (
  folder: string,
  fileName: string,
): string => (fileName ? `${IMAGES_URL}/${folder}/${fileName}.png` : '')
