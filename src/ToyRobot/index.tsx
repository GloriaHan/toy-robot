import React, { useState, Dispatch, SetStateAction } from 'react'
import ChessBoard from '../components/ChessBoard'
import {
  Header,
  Root,
  ToyRobotContainer,
  Instruction,
  ToyWraper,
} from './index.style'
import Robot from '../components/Robot'
import RobotControl from '../components/RobotControl'

const initialXState = { xValue: 0, setXValue: () => {} }
const initialYState = { yValue: 0, setYValue: () => {} }

type XRobotContextType = {
  xValue: number
  setXValue: Dispatch<SetStateAction<number>>
}

type YRobotContextType = {
  yValue: number
  setYValue: Dispatch<SetStateAction<number>>
}

export const XRobotContext =
  React.createContext<XRobotContextType>(initialXState)
export const YRobotContext =
  React.createContext<YRobotContextType>(initialYState)

export default function ToyRobot(): JSX.Element {
  const [xValue, setXValue] = useState<number>(0)
  const [yValue, setYValue] = useState<number>(0)
  return (
    <XRobotContext.Provider value={{ xValue, setXValue }}>
      <YRobotContext.Provider value={{ yValue, setYValue }}>
        <Header>Toy Robot</Header>
        <Root>
          <ToyWraper>
            <ToyRobotContainer>
              <ChessBoard />
              <Robot />
            </ToyRobotContainer>
            <RobotControl />
          </ToyWraper>
          <Instruction>
            <p>
              <span>Command Instruction:</span>
            </p>
            <p>
              <span>place(x,y,direction): </span>x and y are integers that
              relate to a location on the grid. Values that are outside the
              boundary of the grid should not be allowed.
            </p>
            <p>
              <span>move(): </span>Moves the robot 1 grid unit in the direction
              it is facing unless that movement will cause the robot to fall off
              the grid.
            </p>
            <p>
              <span>left()/right(): </span>Rotate the robot 90° anticlockwise/
              counterclockwise.
            </p>
            <p>
              <span>report(): </span>Outputs the robot's current grid location
              and facing direction.
            </p>
          </Instruction>
        </Root>
      </YRobotContext.Provider>
    </XRobotContext.Provider>
  )
}
