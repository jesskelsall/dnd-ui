import { arrayToChoices } from '../../functions/choice'
import { Choice } from '../../types'

export const CLASSES: Choice[] = arrayToChoices([
  ['barbarian', 'Barbarian'],
  ['bard', 'Bard'],
  ['cleric', 'Cleric'],
  ['druid', 'Druid'],
  ['fighter', 'Fighter'],
  ['monk', 'Monk'],
  ['paladin', 'Paladin'],
  ['ranger', 'Ranger'],
  ['rogue', 'Rogue'],
  ['sorcerer', 'Sorcerer'],
  ['warlock', 'Warlock'],
  ['wizard', 'Wizard'],
])

export const RACES: Choice[] = arrayToChoices([
  ['aarakocra', 'Aarakocra'],
  ['aasimar', 'Aasimar'],
  ['dragonborn', 'Dragonborn'],
  ['dwarf', 'Dwarf'],
  ['elf', 'Elf'],
  ['firbolg', 'Firbolg'],
  ['genasi', 'Genasi'],
  ['gnome', 'Gnome'],
  ['goblin', 'Goblin'],
  ['goliath', 'Goliath'],
  ['halfElf', 'Half-elf'],
  ['halfOrc', 'Half-orc'],
  ['halfling', 'Halfling'],
  ['human', 'Human'],
  ['kenku', 'Kenku'],
  ['kobold', 'Kobold'],
  ['leonin', 'Leonin'],
  ['lizardfolk', 'Lizardfolk'],
  ['satyr', 'Satyr'],
  ['shifter', 'Shifter'],
  ['tabaxi', 'Tabaxi'],
  ['tiefling', 'Tiefling'],
  ['tortle', 'Tortle'],
  ['triton', 'Triton'],
])
