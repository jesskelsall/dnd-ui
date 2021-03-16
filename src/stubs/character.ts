import { GRADIENT_COLOURS } from '../consts/gradientColours'
import { Character } from '../types/data/character'

export const characters: Record<string, Character> = {
  ahsha: {
    affiliation: {
      division: 'City / Northhaven',
      group: 'Canary Squad',
      iconURL: 'https://raw.githubusercontent.com/jesskelsall/astarus/main/images/ranks/astorrel-2-private.png',
      organisation: 'Astorrel',
      rank: 'Squad Hand',
    },
    avatar: {
      gradientColours: GRADIENT_COLOURS[11],
      smallURL: 'https://raw.githubusercontent.com/jesskelsall/astarus/main/images/tokens/ahsha-sallas.png',
      largeURL: '',
    },
    class: 'Fighter',
    id: 'ahsha',
    name: {
      displayName: 'Ahsha',
      realName: 'Ahsha Sallas',
    },
    pronouns: 'she/her',
    race: 'Half-orc',
  },
}

const characterStubs = [
  // {
  //   avatar: true,
  //   class: 'Warlock',
  //   name: {
  //     knownName: 'Saoirse',
  //     realName: 'Saoirse ó Dochartaigh',
  //     useRealName: false,
  //   },
  //   pronouns: 'she/her',
  //   race: 'Aasimar',
  //   rank: '',
  //   show: true,
  // },
  // {
  //   avatar: true,
  //   class: 'Sorcerer',
  //   name: {
  //     knownName: 'Thanea',
  //     realName: 'Thanea Morlay',
  //     useRealName: false,
  //   },
  //   pronouns: 'she/her',
  //   race: 'Aasimar',
  //   rank: '',
  //   show: true,
  // },
  // {
  //   avatar: true,
  //   class: 'Fighter',
  //   name: {
  //     knownName: 'Torbra',
  //     realName: 'Torbra Tauff',
  //     useRealName: false,
  //   },
  //   pronouns: 'she/her',
  //   race: 'Genasi',
  //   rank: '',
  //   show: true,
  // },
  // {
  //   avatar: true,
  //   class: 'Druid',
  //   name: {
  //     knownName: '',
  //     realName: 'Wizira',
  //     useRealName: true,
  //   },
  //   pronouns: 'she/her',
  //   race: 'Firbolg',
  //   rank: '',
  //   show: true,
  // },
  {
    avatar: true,
    class: 'Fighter',
    name: {
      knownName: '',
      realName: 'Ahsha Sallas',
      useRealName: true,
    },
    pronouns: 'she/her',
    race: 'Half-orc',
    rank: 'astorrel-2-private',
    show: true,
  },
  {
    avatar: true,
    class: 'Druid',
    name: {
      knownName: '',
      realName: 'Ephaine Seren',
      useRealName: true,
    },
    pronouns: 'she/her',
    race: 'Human',
    rank: 'astorrel-2-private',
    show: true,
  },
  {
    avatar: true,
    class: 'Bard',
    name: {
      knownName: '',
      realName: 'Redwyn Humpledopper',
      useRealName: true,
    },
    pronouns: 'she/her',
    race: 'Dwarf',
    rank: 'astorrel-2-private',
    show: true,
  },
  {
    avatar: true,
    class: 'Rogue',
    name: {
      knownName: '',
      realName: 'Whisper on the Breeze',
      useRealName: true,
    },
    pronouns: 'they/them',
    race: 'Tabaxi',
    rank: 'astorrel-2-private',
    show: true,
  },
]

// const chars: Character[] = [
//   {
//     class: 'Warlock',
//     name: 'Saoirse ó Dochartaigh',
//     pronouns: 'she/her',
//     race: 'Aasimar',
//     token: 'saoirse-o-dochartaigh',
//   },
//   {
//     class: 'Sorcerer',
//     name: 'Thanea Morlay',
//     pronouns: 'she/her',
//     race: 'Aasimar',
//     token: 'thanea-morlay',
//   },
//   {
//     class: 'Fighter',
//     name: 'Torbra Tauff',
//     pronouns: 'she/her',
//     race: 'Earth Genasi',
//     token: 'torbra-tauff',
//   },
//   {
//     class: 'Druid',
//     name: 'Wizira',
//     pronouns: 'she/her',
//     race: 'Firbolg',
//     token: 'wizira',
//   },
// ]
