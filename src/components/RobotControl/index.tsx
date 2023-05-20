import { ButtonContainer, CommandContainer, Input } from './index.style'
import React, { useState, useContext } from 'react'
import { XRobotContext, YRobotContext } from '../../ToyRobot'

export default function RobotControl(): JSX.Element {
  const { xValue, setXValue } = useContext(XRobotContext)
  const { yValue, setYValue } = useContext(YRobotContext)
  const [input, setInput] = useState('')
  const [direction, setDirection] = useState('north')
  const GRID_SIZE = 5

  const place = (x: number, y: number, directionInput: string): void => {
    setXValue((x - 1) * 80)
    setYValue((y - 1) * 80)
    setDirection(directionInput)
  }
  const move = () => {
    if (direction === 'north') {
      if (yValue >= 320) {
        setYValue(320)
        alert('Robot has reached the edge of the table')
      } else {
        setYValue(yValue + 80)
      }
    } else if (direction === 'south') {
      if (yValue <= 0) {
        setYValue(0)
        alert('Robot has reached the edge of the table')
      } else {
        setYValue(yValue - 80)
      }
    } else if (direction === 'west') {
      if (xValue <= 0) {
        setXValue(0)
        alert('Robot has reached the edge of the table')
      } else {
        setXValue(xValue - 80)
      }
    } else if (direction === 'east') {
      if (xValue >= 320) {
        setXValue(320)
        alert('Robot has reached the edge of the table')
      } else {
        setXValue(xValue + 80)
      }
    }
  }

  const changeDirection = (inputDirection: string) => {
    if (inputDirection === 'left') {
      if (direction === 'north') {
        setDirection('west')
      } else if (direction === 'south') {
        setDirection('east')
      } else if (direction === 'west') {
        setDirection('south')
      } else if (direction === 'east') {
        setDirection('north')
      }
    }
    if (inputDirection === 'right') {
      if (direction === 'north') {
        setDirection('east')
      } else if (direction === 'south') {
        setDirection('west')
      } else if (direction === 'west') {
        setDirection('north')
      } else if (direction === 'east') {
        setDirection('south')
      }
    }
  }

  const enterChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e)
    if (e.key === 'Enter') {
      inputCmd()
    }
  }

  const inputCmd = () => {
    const inputString = input.replace(/\s/g, '')
    const patternPlace = `^place\\(([1-${GRID_SIZE}]),([1-${GRID_SIZE}]),(north|south|west|east)\\)$`
    const patternMove = `^move\\(\\)$`
    const patternLeft = `^left\\(\\)$`
    const patternRight = `^right\\(\\)$`
    const patternReport = `^report\\(\\)$`

    if (new RegExp(patternPlace).test(inputString)) {
      const valuesString = inputString.slice(6, -1) // Extract the values inside the parentheses
      const [xString, yString, directionInput] = valuesString.split(',')
      const x = parseInt(xString, 10)
      const y = parseInt(yString, 10)
      place(x, y, directionInput)
    } else if (new RegExp(patternMove).test(inputString)) {
      move()
    } else if (
      new RegExp(patternLeft).test(inputString) ||
      new RegExp(patternRight).test(inputString)
    ) {
      const inputDirection = inputString.slice(0, -2)
      console.log(inputDirection)
      changeDirection(inputDirection)
    } else if (new RegExp(patternReport).test(inputString)) {
      alert(`x: ${xValue / 80}, y: ${yValue / 80}, direction: ${direction}`)
    } else {
      alert('please input the right format command.')
    }
    setInput('')
  }

  const moveForward = () => {
    if (yValue >= 320) {
      setYValue(320)
      alert('Robot has reached the edge of the table')
    } else {
      setYValue(yValue + 80)
    }
  }

  const moveBackward = () => {
    if (yValue <= 0) {
      setYValue(0)
      alert('Robot has reached the edge of the table')
    } else {
      setYValue(yValue - 80)
    }
  }

  const moveLeft = () => {
    if (xValue <= 0) {
      setXValue(0)
      alert('Robot has reached the edge of the table')
    } else {
      setXValue(xValue - 80)
    }
  }

  const moveRight = () => {
    if (xValue >= 320) {
      setXValue(320)
      alert('Robot has reached the edge of the table')
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
          <input
            type="text"
            placeholder="Input Command"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={(e) => enterChange(e)}
          />
          <button onClick={inputCmd}>GO</button>
        </Input>
        <p>
          Position:
          <span>
            x: {xValue / 80 + 1}, y: {yValue / 80 + 1}, direction: {direction}
          </span>
        </p>
      </CommandContainer>
    </div>
  )
}
