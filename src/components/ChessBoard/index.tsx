import React from 'react'
import { Chessboard, Cells } from './index.style';

export default function ChessBoard(): JSX.Element  {
  const rows = 5;
  const columns = 5;

  const renderCells = () => {
    const cells = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const key = `${row}-${col}`;
        cells.push(<Cells key={key}></Cells>);
      }
    }
    return cells;
  };

  return (
  <> 
  <Chessboard>
    {renderCells()}
  </Chessboard>
  </>)
}


