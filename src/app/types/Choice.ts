export type ChoiceValue = string | number

export interface Choice <V extends ChoiceValue = string>{
  label: string,
  value: V,
}

export interface ChoiceWithPath extends Choice {
  path: string,
}
