import { ButtonContainer, CommandContainer, Input } from './index.style'
import React, { useState, useContext } from 'react'
import { XRobotContext, YRobotContext } from '../../ToyRobot'

export default function RobotControl(): JSX.Element {
  const { xValue, setXValue } = useContext(XRobotContext)
  const { yValue, setYValue } = useContext(YRobotContext)
  const [input, setInput] = useState('')

  const inputCmd = () => {
    const inputString = input.trim()
    console.log(inputString)
    setInput('')
  }

  const moveForward = () => {
    if (yValue >= 320) {
      setYValue(320)
    } else {
      setYValue(yValue + 80)
    }
  }

  const moveBackward = () => {
    if (yValue <= 0) {
      setYValue(0)
    } else {
      setYValue(yValue - 80)
    }
  }

  const moveLeft = () => {
    if (xValue <= 0) {
      setXValue(0)
    } else {
      setXValue(xValue - 80)
    }
  }

  const moveRight = () => {
    if (xValue >= 320) {
      setXValue(320)
    } else {
      setXValue(xValue + 80)
    }
  }

  return (
    <div>
      <ButtonContainer>
        <button onClick={moveForward}>up</button>
        <button onClick={moveBackward}>down</button>
        <button onClick={moveLeft}>left</button>
        <button onClick={moveRight}>right</button>
      </ButtonContainer>
      <CommandContainer>
        <Input>
          <p>INPUT: </p>
          <input
            type="text"
            placeholder="command"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={inputCmd}>GO</button>
        </Input>
        <p>
          OUTPUT: <span>result</span>
        </p>
      </CommandContainer>
    </div>
  )
}
