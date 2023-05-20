
import styled from "styled-components";

export const Chessboard = styled.div` 
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 1px;
  width: 400px;
  height: 400px;
`

export const Cells = styled.div`
  background-color: #ccc;
  &:nth-child(even) {
  background-color: #aaa;
}
`
