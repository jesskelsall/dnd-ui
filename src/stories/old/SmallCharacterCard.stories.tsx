import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { SmallCharacterCard } from '../../app/components/display/SmallCharacterCard'
import '../../app/styles/index.scss'

export default {
  title: 'Old/Display/SmallCharacterCard',
  component: SmallCharacterCard,
  argTypes: {
    avatar: { control: 'object' },
    icon: { control: 'text' },
    textPrimary: { control: 'text' },
    textPrimaryScale: { control: 'number' },
    textSecondary: { control: 'text' },
    textTertiary: { control: 'text' },
  },
} as ComponentMeta<typeof SmallCharacterCard>

const Template: ComponentStory<typeof SmallCharacterCard> = (
  args,
) => <SmallCharacterCard {...args} />

export const EphaineSeren = Template.bind({})
EphaineSeren.args = {
  avatar: {
    backgroundGradientColours: [
      '#f9ffe3',
      '#f7e61e',
      '#f7931e',
    ],
    url: 'https://raw.githubusercontent.com/jesskelsall/astarus-images/main/characters/tokens/3840bf1d6c005683.png',
  },
  icon: 'https://raw.githubusercontent.com/jesskelsall/astarus-images/main/icons/044148b7db2a3a72.png',
  textPrimary: 'Ephaine Seren',
  textPrimaryScale: 1,
  textSecondary: 'Human • she/her',
  textTertiary: 'Druid (6)',
}
