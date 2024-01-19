'use client'

import { useState } from 'react';
import "./styles.css";

export function Board() {

  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(buttonIndex) {
    console.log("Clicked button" + buttonIndex);

    // I need to explicitly call "slice()" to create copy of the array. I cannot use the original array as otherwise stuff won't be re-rendered!!!
    var newSquares = squares.slice();
    newSquares[buttonIndex] = 'X';
    setSquares(newSquares);
  }

  return (
    <>
      <div className="board-row">
        <MyButton btnIndex={1} value={squares[0]} handleClickFnc={() => handleClick(0)} />
        <MyButton btnIndex={2} value={squares[1]} handleClickFnc={() => handleClick(1)} />
        <MyButton btnIndex={3} value={squares[2]} handleClickFnc={() => handleClick(2)} />
      </div>
    </>
  );
}

function MyButton({btnIndex, value, handleClickFnc}) {

  // const [value, setValue] = useState(btnIndex);

  return (
    <button className="square" onClick={handleClickFnc}>{value}</button>
  )
}