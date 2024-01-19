'use client'

import { useState } from 'react';
import "./styles.css";

export function Board() {

  const [crossNext, setCrossNext] = useState(false);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [history, setHistory] = useState([]);

  function checkLines(i1: number, i2: number, i3: number, squaress) {
    // console.log("checking " + i1 + ", " + i2 + ", " + i3);
    // console.log(squaress[i1] + " " + squaress[i2] + " " + squaress[i3]);
    if (squaress[i1] === 'O' && squaress[i2] === 'O' && squaress[i3] === 'O') return 'O';
    if (squaress[i1] === 'X' && squaress[i2] === 'X' && squaress[i3] === 'X') return 'X';
    return null;
  }
  function isWinner(squaress) {
    let lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (var i=0; i<lines.length ; i++) {
      var indexes = lines[i];
      var c = checkLines(indexes[0], indexes[1], indexes[2], squaress);
      if (c == 'O' || c == 'X') return c;
    }
    return null;
  }

  function handleClick(buttonIndex) {
    var winner = isWinner(squares);
    if (winner != null) {
      console.log("Winner is already " + winner);
      return;
    }

    console.log("Clicked button" + buttonIndex);

    // I need to explicitly call "slice()" to create copy of the array. I cannot use the original array as otherwise stuff won't be re-rendered!!!
    var newSquares = squares.slice();

    var charr = crossNext ? 'X' : 'O';
    if (newSquares[buttonIndex] !== null) return;

    setCrossNext(!crossNext);

    newSquares[buttonIndex] = charr;
    setSquares(newSquares);

    winner = isWinner(newSquares);
    if (winner != null) {
      console.log("Winner is " + winner);
    }

    var newHistory = history.slice();
    newHistory.push(newSquares);
    setHistory(newHistory);
  }

  return (
    <>
      <div className="board-row">
        <MyButton btnIndex={1} value={squares[0]} handleClickFnc={() => handleClick(0)} />
        <MyButton btnIndex={2} value={squares[1]} handleClickFnc={() => handleClick(1)} />
        <MyButton btnIndex={3} value={squares[2]} handleClickFnc={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <MyButton btnIndex={4} value={squares[3]} handleClickFnc={() => handleClick(3)} />
        <MyButton btnIndex={5} value={squares[4]} handleClickFnc={() => handleClick(4)} />
        <MyButton btnIndex={6} value={squares[5]} handleClickFnc={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <MyButton btnIndex={7} value={squares[6]} handleClickFnc={() => handleClick(6)} />
        <MyButton btnIndex={8} value={squares[7]} handleClickFnc={() => handleClick(7)} />
        <MyButton btnIndex={9} value={squares[8]} handleClickFnc={() => handleClick(8)} />
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