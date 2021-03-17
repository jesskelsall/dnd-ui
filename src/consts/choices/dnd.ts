import { arrayToChoices } from '../../functions/arrayToChoices'
import { Choice } from '../../types/Choice'

export const CLASSES: Choice[] = arrayToChoices([
  'Barbarian',
  'Bard',
  'Cleric',
  'Druid',
  'Fighter',
  'Monk',
  'Paladin',
  'Ranger',
  'Rogue',
  'Sorcerer',
  'Warlock',
  'Wizard',
])

export const RACES: Choice[] = arrayToChoices([
  'Aarakocra',
  'Aasimar',
  'Dragonborn',
  'Dwarf',
  'Elf',
  'Firbolg',
  'Genasi',
  'Gnome',
  'Goliath',
  'Half-elf',
  'Half-orc',
  'Halfling',
  'Human',
  'Kenku',
  'Kobold',
  'Leonin',
  'Lizardfolk',
  'Satyr',
  'Shifter',
  'Tabaxi',
  'Tiefling',
  'Tortle',
  'Triton',
])
