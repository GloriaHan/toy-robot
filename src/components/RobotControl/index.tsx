import { ButtonContainer, CommandContainer, Input } from './index.style'
import React, { useState, useEffect, useContext } from 'react'
import { RobotContext } from '../../ToyRobot'
import { GRID_SIZE, CELL_SIZE } from '../../constant'

export default function RobotControl(): JSX.Element {
  const { value, setValue } = useContext(RobotContext)
  const [input, setInput] = useState('')
  const grid_size = GRID_SIZE
  const cell_size = CELL_SIZE

  const { xValue, yValue, direction } = value

  const place = (x: number, y: number, directionInput: string): void => {
    setValue({
      xValue: (x - 1) * cell_size,
      yValue: (y - 1) * cell_size,
      direction: directionInput,
    })
  }

  const move = () => {
    if (direction === 'north' && yValue < grid_size * cell_size) {
      setValue({
        ...value,
        yValue: yValue + cell_size,
      })
    } else if (direction === 'south' && yValue > 0) {
      setValue({
        ...value,
        yValue: yValue - cell_size,
      })
    } else if (direction === 'west' && xValue > 0) {
      setValue({
        ...value,
        xValue: xValue - cell_size,
      })
    } else if (direction === 'east' && xValue < grid_size * cell_size) {
      setValue({
        ...value,
        xValue: xValue + cell_size,
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
    console.log(e)
    if (e.key === 'Enter') {
      inputCmd()
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        moveForward()
      } else if (e.key === 'ArrowDown') {
        moveBackward()
      } else if (e.key === 'ArrowLeft') {
        moveLeft()
      } else if (e.key === 'ArrowRight') {
        moveRight()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })


  const inputCmd = () => {
    const inputString = input.replace(/\s/g, '')
    const patternPlace = `^place\\(([1-${grid_size}]),([1-${grid_size}]),(north|south|west|east)\\)$`
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
        `x: ${xValue / cell_size}, y: ${
          yValue / cell_size
        }, direction: ${direction}`
      )
    } else {
      alert('please input the right format command.')
    }
    setInput('')
  }

  const moveForward = () => {
    if (yValue >= cell_size * (grid_size - 1)) {
      alert('Robot has reached the edge of the table')
    } else {
      setValue({ ...value, yValue: yValue + cell_size, direction: 'north' })
    }
  }

  const moveBackward = () => {
    if (yValue <= 0) {
      alert('Robot has reached the edge of the table')
    } else {
      setValue({ ...value, yValue: yValue - cell_size, direction: 'south' })
    }
  }

  const moveLeft = () => {
    if (xValue <= 0) {
      alert('Robot has reached the edge of the table')
    } else {
      setValue({ ...value, xValue: xValue - cell_size, direction: 'west' })
    }
  }

  const moveRight = () => {
    if (xValue >= cell_size * (grid_size - 1)) {
      alert('Robot has reached the edge of the table')
    } else {
      setValue({ ...value, xValue: xValue + cell_size, direction: 'east' })
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
        <button
          onClick={() => setValue({ xValue: 0, yValue: 0, direction: 'east' })}
        >
          RESET
        </button>
        <p>
          Position:
          <span>
            X: {value.xValue / cell_size + 1}, Y: {value.yValue / cell_size + 1}
            , Direction: {direction}
          </span>
        </p>
      </CommandContainer>
    </div>
  )
}
