import React from "react";
import "./App.css";
import Board from "./components/Board";
import BoardPiece from "./components/BoardPiece";
import { initBoard } from "./services/go";
import STONE from "./services/STONE";

function App() {
  const onClick = (a: number): void => {};
  const { board } = initBoard("30 10 60 100");
  return (
    <div className="App">
      <Board board={board} />
    </div>
  );
}

export default App;
