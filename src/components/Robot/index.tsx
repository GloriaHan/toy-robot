import React, { useContext } from 'react'
import { Root, Img } from './index.style'
import { XRobotContext, YRobotContext } from '../../ToyRobot'

export default function Robot(): JSX.Element {
  const { xValue } = useContext(XRobotContext)
  const { yValue } = useContext(YRobotContext)
  let left: string ='0px';
  let bottom: string='0px';

  // if (400 >= xValue && xValue >= 0 && 400 >= yValue && yValue >= 0) {
    left = `${xValue}px`
    bottom = `${yValue}px`
  
console.log(left, bottom)
  return (
    <Root style={{ left, bottom }}>
      <Img src={process.env.PUBLIC_URL + '/img/chess.png'} alt="robot"></Img>
    </Root>
  )
}
