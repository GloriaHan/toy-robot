import { ButtonContainer, CommandContainer, Input } from './index.style'
import React, { useState, useContext } from 'react'
import { RobotContext } from '../../ToyRobot'

export default function RobotControl(): JSX.Element {
  const { value, setValue } = useContext(RobotContext)
  const [input, setInput] = useState('')
  const GRID_SIZE = 5
  const CELL_SIZE = 80

  const { xValue, yValue, direction } = value

  const place = (x: number, y: number, directionInput: string): void => {
    setValue({
      xValue: (x - 1) * CELL_SIZE,
      yValue: (y - 1) * CELL_SIZE,
      direction: directionInput,
    })
  }

  const move = () => {
    if (direction === 'north' && yValue < GRID_SIZE * CELL_SIZE) {
      setValue({
        ...value,
        yValue: yValue + CELL_SIZE,
      })
    } else if (direction === 'south' && yValue > 0) {
      setValue({
        ...value,
        yValue: yValue - CELL_SIZE,
      })
    } else if (direction === 'west' && xValue > 0) {
      setValue({
        ...value,
        xValue: xValue - CELL_SIZE,
      })
    } else if (direction === 'east' && xValue < GRID_SIZE * CELL_SIZE) {
      setValue({
        ...value,
        xValue: xValue + CELL_SIZE,
      })
    } else {
      alert('Robot is out of the grid')
    }
  }

  const changeDirection = (inputDirection: string) => {
    if (inputDirection === 'left') {
      if (direction === 'north') {
        setValue({ ...value, direction: 'west' })
      } else if (direction === 'south') {
        setValue({ ...value, direction: 'east' })
      } else if (direction === 'west') {
        setValue({ ...value, direction: 'south' })
      } else if (direction === 'east') {
        setValue({ ...value, direction: 'north' })
      }
    }
    if (inputDirection === 'right') {
      if (direction === 'north') {
        setValue({ ...value, direction: 'east' })
      } else if (direction === 'south') {
        setValue({ ...value, direction: 'west' })
      } else if (direction === 'west') {
        setValue({ ...value, direction: 'north' })
      } else if (direction === 'east') {
        setValue({ ...value, direction: 'south' })
      }
    }
  }

  const enterChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
      changeDirection(inputDirection)
    } else if (new RegExp(patternReport).test(inputString)) {
      alert(
        `x: ${xValue / CELL_SIZE}, y: ${
          yValue / CELL_SIZE
        }, direction: ${direction}`
      )
    } else {
      alert('please input the right format command.')
    }
    setInput('')
  }

  const moveForward = () => {
    if (yValue >= CELL_SIZE * (GRID_SIZE - 1)) {
      alert('Robot has reached the edge of the table')
    } else {
      setValue({ ...value, yValue: yValue + CELL_SIZE,direction:'north' })
    }
  }

  const moveBackward = () => {
    if (yValue <= 0) {
      alert('Robot has reached the edge of the table')
    } else {
      setValue({ ...value, yValue: yValue - CELL_SIZE,direction:'south' })
    }
  }

  const moveLeft = () => {
    if (xValue <= 0) {
      alert('Robot has reached the edge of the table')
    } else {
      setValue({ ...value, xValue: xValue - CELL_SIZE,direction:'west' })
    }
  }

  const moveRight = () => {
    if (xValue >= CELL_SIZE * (GRID_SIZE - 1)) {
      alert('Robot has reached the edge of the table')
    } else {
      setValue({ ...value, xValue: xValue + CELL_SIZE,direction:'east' })
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
        <button onClick={() => setValue({ xValue: 0, yValue: 0, direction:'east'})}>RESET</button>
        <p>
          Position:
          <span>
            X: {value.xValue / CELL_SIZE + 1}, Y: {value.yValue / CELL_SIZE + 1}
            , Direction: {direction}
          </span>
        </p>
      </CommandContainer>
    </div>
  )
}
