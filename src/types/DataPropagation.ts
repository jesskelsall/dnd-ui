import { Data } from './data'

export interface DataPropagationProps {
  data: Data,
  onChangeData: (data: Data) => void,
  realTime: boolean,
}

export interface PageDataPropagationProps extends DataPropagationProps {
  isActivePage: boolean,
}
