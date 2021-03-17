export interface Choice {
  name: string,
  value: string,
}

export interface ChoiceWithPath extends Choice {
  path: string,
}
