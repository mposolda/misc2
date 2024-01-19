'use client'  // This looks like a requirement of "next.js" Probably not a general requirement of react. See https://nextjs.org/docs/app/building-your-application/rendering/client-components

import { useState } from 'react';

// This does not work. Those must be defined inside the "function" component itself
// const [count, setCount] = useState("a");
//
// function handleClick() {
//   setCount(count + 1);
// }

// Note "count" is of type "string" when "i" is of type "number"

let i: number = 0;

export function MyApp4() {

  const [count, setCount] = useState("");

  function handleClick() {
    i = i + 1;
    setCount(count + i);
  }

  return (
    <div>
      <MyButton count={count} clickHandler={handleClick} />
      <MyButton count={count} clickHandler={handleClick} />
    </div>
  );
}

function MyButton({count, clickHandler}) {

  return (
    <button onClick={clickHandler}>
      Every click will add another number here: {count}
    </button>
  );
}