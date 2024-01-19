'use client'

import { useState } from 'react';
import "./styles.css";

export function Board() {

  return (
    <>
      <div className="board-row">
        <MyButton btnIndex="1" />
        <MyButton btnIndex="2" />
        <MyButton btnIndex="3" />
      </div>
      <div className="board-row">
        <MyButton btnIndex="4" />
        <MyButton btnIndex="5" />
        <MyButton btnIndex="6" />
      </div>
      <div className="board-row">
        <MyButton btnIndex="7" />
        <MyButton btnIndex="8" />
        <MyButton btnIndex="9" />
      </div>
    </>
  );
}

function MyButton({btnIndex}) {

  const [value, setValue] = useState(btnIndex);

  function handleClick() {
    console.log("Clicked" + btnIndex);
    setValue("X");
  }

  return (
    <button className="square" onClick={handleClick}>{value}</button>
  )
}