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
  margin: 20px auto;
  border-radius: 5px;
  font-size: 20px;
  & > p {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 180px;
    height: 30px;
    margin: 5px;
    font-size: 16px;
    margin: 20px auto;
    background-color: #aaa;
    font-size: 16px;
    font-weight: bold;
    border-style: none;
    border-radius: 3px;
  }
`
export const Input = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  height: 30px;

  & > input {
    height: 100%;
  }

  & > button {
    width: 80px;
    height: 36px;
    margin: 0 10px;
    font-size: 16px;
    font-weight: bold;
    border-style: none;
    border-radius: 3px;
    background-color: #aaa;
  }
`
