import { Data } from './data'

export interface DataPropagationProps {
  data: Data,
  onSave: (data: Data) => void,
}
