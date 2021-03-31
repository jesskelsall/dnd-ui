export interface Choice <V extends string = string>{
  label: string,
  value: V,
}

export interface ChoiceWithPath extends Choice {
  path: string,
}
