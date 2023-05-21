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

const initialState = {
  value: { xValue: 0, yValue: 0, direction: 'east' },
  setValue: () => {},
}

type valueType = {
  xValue: number
  yValue: number
  direction: string
}

type RobotContextType = {
  value: valueType
  setValue: Dispatch<SetStateAction<valueType>>
}

// type YRobotContextType = {
//   yValue: number
//   setYValue: Dispatch+<SetStateAction<number>>
// }

export const RobotContext = React.createContext<RobotContextType>(initialState)

export default function ToyRobot(): JSX.Element {
  const [value, setValue] = useState<valueType>({
    xValue: 0,
    yValue: 0,
    direction: 'east',
  })
  return (
    <RobotContext.Provider value={{ value, setValue }}>
      {/* <YRobotContext.Provider value={{ yValue, setYValue }}> */}
      <Header>Chipmunk Robot</Header>
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
            <span>place(x,y,direction): </span>x and y are integers between 1-5;
            direction is north/south/east/west. e.g. place(1,2,east).
          </p>
          <p>
            <span>move(): </span>Moves the robot 1 grid unit in the direction it
            is facing unless that movement will cause the robot to fall off the
            grid.
          </p>
          <p>
            <span>left()/right(): </span>Rotate the robot 90° anticlockwise/
            counterclockwise.
          </p>
          <p>
            <span>report(): </span>Outputs the robot's current grid location and
            facing direction.
          </p>
        </Instruction>
      </Root>
      {/* </YRobotContext.Provider> */}
    </RobotContext.Provider>
  )
}
