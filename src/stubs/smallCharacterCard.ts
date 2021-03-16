import { SmallCharacterCardProps } from '../components/display/SmallCharacterCard'
import { GRADIENT_COLOURS } from '../consts/gradientColours'

export const smallCharacterCardProps: Record<string, SmallCharacterCardProps> = {
  rowanGreatSile: {
    avatar: {
      backgroundGradientColours: GRADIENT_COLOURS[11],
      url: 'https://raw.githubusercontent.com/jesskelsall/astarus/main/images/tokens/rowan-great-sile.png',
    },
    iconURL: 'https://raw.githubusercontent.com/jesskelsall/astarus/main/images/ranks/astorrel-5-lieutenant.png',
    textPrimary: 'Rowan Great Sile',
    textSecondary: 'Firbolg Druid',
    textTertiary: 'he/him',
  },
}
