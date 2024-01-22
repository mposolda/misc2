'use client'

import { useState } from 'react';
import "./styles.css";

let status:String = "Next player is O";
let history: Array[] = [];
history.push(Array(9).fill(null));

export function Board() {

  const [crossNext, setCrossNext] = useState(false);
  const [squares, setSquares] = useState(Array(9).fill(null));
  console.log("Hello, I am here");

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
      status = "Winner is " + winner;
    } else {
      charr = !crossNext ? 'X' : 'O';
      status = "Next player is " + charr;
    }

    history.push(newSquares);
  }

  function handleBack() {
    console.log("Clicked back");
    if (history.length < 2) {
      console.log("No history. Returning back");
      return;
    }

    history.pop();
    var lastSquares = history[history.length - 1];

    setCrossNext(!crossNext);
    var charr = !crossNext ? 'X' : 'O';
    status = "Next player is " + charr;

    setSquares(lastSquares);
  }

  function buttons(row: number) {
    const buttonss = squares.slice(row, row+3).map((square, indexx) => {
      const buttonIndex = row*3 + indexx;
      console.log("row: " + row + ", buttonIndex: " + buttonIndex);
      return (
        <MyButton key={buttonIndex} value={squares[buttonIndex]} handleClickFnc={() => handleClick(buttonIndex)} />
      )
    });
    return buttonss;
  }

  return (
    <>
      <div className="board-row">
        {buttons(0)}
      </div>
      <div className="board-row">
        {buttons(1)}
      </div>
      <div className="board-row">
        {buttons(2)}
      </div>

      <div>
        <Status status={status} />
      </div>
      <div>
        <BackButton handleClickBack={handleBack} />
      </div>
    </>
  );
}

function MyButton({ value, handleClickFnc}) {

  // const [value, setValue] = useState(btnIndex);

  return (
    <button className="square" onClick={handleClickFnc}>{value}</button>
  )
}

function Status({status}) {
  return <h4>{status}</h4>
}

function BackButton({handleClickBack}) {
  return <button onClick={handleClickBack}>Back one turn</button>
}