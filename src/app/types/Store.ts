import { DataSets } from './Data'
import { Page } from './Page'
import { Settings } from './Settings'

export interface Store {
  data: DataSets,
  page: Page,
  settings: Settings,
}
