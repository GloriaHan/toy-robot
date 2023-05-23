import React, { useContext } from 'react'
import { Root, Img } from './index.style'
import { RobotContext } from '../../ToyRobot'

export default function Robot(): JSX.Element {
  const {
    value: { xValue, yValue, direction },
  } = useContext(RobotContext)

  let left: string = '0px'
  let bottom: string = '0px'
  let rotation: string = '0deg'
  let transformation: string = ''

  switch (direction) {
    case 'north':
      rotation = '270deg'
      break
    case 'south':
      rotation = '90deg'
      break
    case 'west':
      rotation = '0deg'
      transformation = 'scaleX(-1)'
      break
    case 'east':
      rotation = '0deg'
      break
    default:
      rotation = '0deg'
  }

  left = `${xValue}px`
  bottom = `${yValue}px`

  return (
    <Root style={{ left, bottom }}>
      <Img
        src={process.env.PUBLIC_URL + '/img/chipmunk.png'}
        alt="robot"
        style={{ transform: `rotate(${rotation}) ${transformation}` }}
      ></Img>
    </Root>
  )
}
