import styled from 'styled-components'

export const ButtonContainer = styled.div`
  display: flex;
  margin: 2px auto;
  align-items: center;
  justify-content: center;

  & > button {
    width: 80px;
    height: 30px;
    margin: 5px;
    font-size: 16px;
  }
`

export const CommandContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin:20px auto;
  border-radius: 5px;
  font-size: 20px;
`
export const Input = styled.div`
  display: flex;
  justify-content: start;
  border-radius: 5px;
`