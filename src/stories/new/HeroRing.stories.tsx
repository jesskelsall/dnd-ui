import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { HeroRing } from '../../app/components/new/HeroRing'
import '../../app/styles/index.scss'

export default {
  title: 'New/HeroRing',
  component: HeroRing,
  argTypes: {
    imageUrl: {
      control: 'text',
      table: { category: 'Image' },
    },
    imageScale: {
      control: {
        type: 'range',
        min: 0,
        max: 200,
        step: 1,
      },
      table: { category: 'Image' },
    },
    imageHorizontal: {
      control: {
        type: 'range',
        min: -500,
        max: 1000,
        step: 1,
      },
      table: { category: 'Image' },
    },
    imageVertical: {
      control: {
        type: 'range',
        min: -500,
        max: 1000,
        step: 1,
      },
      table: { category: 'Image' },
    },
    circleRadius: {
      control: 'number',
      table: { category: 'Circle' },
    },
    overflowRadius: {
      control: 'number',
      table: { category: 'Circle' },
    },
    overflowVertical: {
      control: {
        type: 'range',
        min: 0,
        max: 1,
        step: 0.01,
      },
      table: { category: 'Circle' },
    },
    showOverflow: {
      control: 'boolean',
      table: { category: 'Storybook' },
    },
  },
} as ComponentMeta<typeof HeroRing>

const Template: ComponentStory<typeof HeroRing> = (args) => <HeroRing {...args} />

const heroCardUrl = (id: string): string => `https://raw.githubusercontent.com/jesskelsall/astarus-images/main/characters/hero-cards/${id}.png`

const defaultArgs = {
  circleRadius: 250,
  overflowRadius: 50,
  showOverflow: false,
}

export const Ephaine = Template.bind({})
Ephaine.args = {
  imageUrl: heroCardUrl('3840bf1d6c005683'),
  imageScale: 156,
  imageHorizontal: 18,
  imageVertical: 2,
  circleRadius: defaultArgs.circleRadius,
  overflowRadius: defaultArgs.overflowRadius,
  overflowVertical: 0.66,
  showOverflow: defaultArgs.showOverflow,
}

export const Saoirse = Template.bind({})
Saoirse.args = {
  imageUrl: heroCardUrl('96456245c79828b5'),
  imageScale: 124,
  imageHorizontal: 23,
  imageVertical: 2,
  circleRadius: defaultArgs.circleRadius,
  overflowRadius: defaultArgs.overflowRadius,
  overflowVertical: 0.5,
  showOverflow: defaultArgs.showOverflow,
}

export const Updraft = Template.bind({})
Updraft.args = {
  imageUrl: heroCardUrl('a4214a21ac247b88'),
  imageScale: 104,
  imageHorizontal: -57,
  imageVertical: 36,
  circleRadius: defaultArgs.circleRadius,
  overflowRadius: defaultArgs.overflowRadius,
  overflowVertical: 0.33,
  showOverflow: defaultArgs.showOverflow,
}

export const Vetrall = Template.bind({})
Vetrall.args = {
  imageUrl: heroCardUrl('47336984c5f7be18'),
  imageScale: 99,
  imageHorizontal: 109,
  imageVertical: 9,
  circleRadius: defaultArgs.circleRadius,
  overflowRadius: defaultArgs.overflowRadius,
  overflowVertical: 0.54,
  showOverflow: defaultArgs.showOverflow,
}

export const Builder = Template.bind({})
Builder.args = {
  imageUrl: '',
  imageScale: 100,
  imageHorizontal: 50,
  imageVertical: 0,
  circleRadius: defaultArgs.circleRadius,
  overflowRadius: defaultArgs.overflowRadius,
  overflowVertical: 1,
  showOverflow: true,
}
