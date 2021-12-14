import React from 'react'
import styled, { css } from 'styled-components'
import { nanoid } from 'nanoid'

interface IStyledHeroRingProps {
  size: number,
}

const StyledHeroRing = styled.div((props: IStyledHeroRingProps) => css`
  position: relative;
  width: ${props.size}px;
  height: ${props.size}px;
`)

interface IHeroProps {
  clipPathId: string,
  imageScale: number,
  imageHorizontal: number,
  imageUrl: string,
  imageVertical: number,
  showOverflow: boolean,
}

const Hero = styled.svg((props: IHeroProps) => css`
  background-image: url("${props.imageUrl}");
  background-repeat: no-repeat;
  background-size: ${props.imageScale}%;
  background-position: ${props.imageHorizontal}% ${props.imageVertical}%;
  clip-path: url(#${props.clipPathId});

  ${props.showOverflow && css`
    background-color: rgba(100, 150, 200, 0.5);
    `}
`)

interface IRingProps {
  overflow: number;
  size: number;
}

const Ring = styled.div((props: IRingProps) => css`
  position: absolute;
  top: ${props.overflow}px;
  left: ${props.overflow}px;
  width: ${props.size}px;
  height: ${props.size}px;
  border-radius: ${props.size}px;
  outline: 10px solid black;
  background-color: lightgrey;
`)

export interface IHeroRingProps {
  circleRadius: number,
  overflowRadius?: number,
  overflowVertical?: number,
  imageHorizontal?: number,
  imageScale?: number,
  imageUrl: string,
  imageVertical?: number,
  showOverflow?: boolean,
}

export const HeroRing = ({
  circleRadius, // Radius of the visible circle interior
  overflowRadius = 0, // Square "radius" the image is allowed to overflow the circle into
  overflowVertical = 0.5, // Above this vertical fraction, the image is allowed to overflow
  imageHorizontal = 50, // Percentage alignment along the horizontal axis
  imageScale = 100, // Percentage of the circle width the image should occupy
  imageUrl, // Character portrait
  imageVertical = 0, // Percentage alignment along the vertical axis
  showOverflow = false,
}: IHeroRingProps): JSX.Element => {
  const id = nanoid()
  const totalRadius = circleRadius + overflowRadius
  const totalSize = totalRadius * 2

  return (
    <StyledHeroRing size={totalSize}>
      <Ring overflow={overflowRadius} size={circleRadius * 2} />
      <Hero
        clipPathId={id}
        height={totalSize}
        imageHorizontal={imageHorizontal}
        imageScale={imageScale}
        imageUrl={imageUrl}
        imageVertical={imageVertical}
        showOverflow={showOverflow}
        width={totalSize}
        viewBox={`0 0 ${totalSize} ${totalSize}`}
      >
        <defs>
          <clipPath id={id}>
            <circle cx={totalRadius} cy={totalRadius} r={circleRadius} />
            <rect width={totalSize} height={totalSize * overflowVertical} />
          </clipPath>
        </defs>
      </Hero>
    </StyledHeroRing>
  )
}
