import * as React from "react";
import styled from "styled-components";
import STONE from "../services/STONE";
import BoardPiece from "./BoardPiece";

const initFormat = JSON.stringify({
  map: `rnbqkbnrpppppppp................................PPPPPPPPRNBKQBNR`,
  // map: `rnbqk..........P................................PPPPPPPPRNBKQBNR`,

  log: "",
});

interface Props {
  board: STONE[];
}

interface States {}

class Board extends React.Component<Props, States> {
  state = {};

  onClick = (cur: number) => {};

  displayMap = () => {
    console.log(this.props.board.length);
    return this.props.board.map((stone, cur) => {
      console.log(cur);
      return <BoardPiece cur={cur} stone={stone} onClick={this.onClick} />;
    });
  };

  render() {
    return <BoardBox>{this.displayMap()}</BoardBox>;
  }
}

const BoardBox = styled.div`
  display: inline-grid;
  width: 1000px;
  height: 1000px;
  grid-template-columns: repeat(19, 1fr);
  grid-template-rows: repeat(19, 1fr);
  grid-gap: 5px;
`;

export default Board;
