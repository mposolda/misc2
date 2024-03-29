import { MyApp1 } from "./MyApp1";
import { MyApp2 } from "./MyApp2";
import { MyApp3 } from "./MyApp3";
import { MyApp4 } from "./MyApp4";
import { Board } from "./tictactoe/Board";
import { BoardBonus } from "./tictactoe-bonus/BoardBonus";
import { ThinkingInReact } from "./thinking-in-react/Thinking";

export default function Page() {
  return (
    <div>
      <h1>Hello, my next.js!</h1>
      <hr />

      <MyApp1 />
      <hr />

      <MyApp2 />
      <hr />

      <MyApp3 />
      <hr />

      <MyApp4 />
      <hr />

      <Board />
      <hr />

      <h3>Tic-Tac-Toe board - bonus tasks</h3>
      <BoardBonus />
      <hr />

      <ThinkingInReact />
      <hr />

    </div>
  )
}
