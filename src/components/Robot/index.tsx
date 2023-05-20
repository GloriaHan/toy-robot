import React, { useContext } from 'react'
import { Root, Img } from './index.style'
import { XRobotContext, YRobotContext } from '../../ToyRobot'

export default function Robot(): JSX.Element {
  const { xValue } = useContext(XRobotContext)
  const { yValue } = useContext(YRobotContext)
  let left: string ='0px';
  let bottom: string='0px';

    left = `${xValue}px`
    bottom = `${yValue}px`
  
console.log(left, bottom)
  return (
    <Root style={{ left, bottom }}>
      <Img src={process.env.PUBLIC_URL + '/img/chipmunk.png'} alt="robot"></Img>
    </Root>
  )
}
