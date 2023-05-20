import styled from 'styled-components'

export const Header = styled.h1`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Root = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`
export const ToyWraper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
`
export const ToyRobotContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px auto;
  width: 400px;
  height: 400px;
`

export const Instruction = styled.div`
  width: 400px;
  margin-left: 20px;;
  p {
    font-size: larger;
    span {
      font-size: 20px;
      font-weight: bold;
    }
  }
`
