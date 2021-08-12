import * as React from "react";
import styled from "styled-components";
import { move } from "../services/go";
import STONE, { getOtherSTONE } from "../services/STONE";
import BoardPiece from "./BoardPiece";

interface Props {
  board: STONE[];
  turn: STONE;
  onClick: (cur: number, count: number) => void;
  onError: (e: Error) => void;
}

interface States {
  board: STONE[];
  turn: STONE;
}

class Board extends React.Component<Props, States> {
  state = {
    board: [],
    turn: STONE.BLACK,
  };

  componentDidMount() {
    const { board, turn } = this.props;
    this.setState({ board, turn });
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log("error: " + error);
    console.log("errorInfo: " + errorInfo);
    this.props.onError(error);
  }

  onClick = (cur: number) => {
    const { board, onClick, onError } = this.props;
    const { turn } = this.state;
    try {
      const count = move(board, cur, turn);
      onClick(cur, count);
      this.setState({ board, turn: getOtherSTONE(turn) });
    } catch (e) {
      onError(e);
    }
  };

  displayMap = () =>
    this.props.board.map((stone, cur) => (
      <BoardPiece key={cur} cur={cur} stone={stone} onClick={this.onClick} />
    ));

  render() {
    return <BoardBox>{this.displayMap()}</BoardBox>;
  }
}

const BoardBox = styled.div`
  display: inline-grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(19, 1fr);
  grid-template-rows: repeat(19, 1fr);
`;

export default Board;
