import * as React from "react";
import styled from "styled-components";
import { initBoard } from "../services/go";
import STONE, { getOtherSTONE } from "../services/STONE";
import Board from "./Board";

interface Props {}

interface States {
  board: STONE[];
  counts: { [id: number]: number };
  turn: STONE;
  log: String;
}

// const initBoardString = "30 10 60 100";

class GoPage extends React.Component<Props, States> {
  state = {
    board: [],
    counts: {
      [STONE.WHITE]: 0,
      [STONE.BLACK]: 0,
    },
    turn: STONE.BLACK,
    log: "",
  };

  componentDidMount() {
    const initFormat = "0 1 5 19";
    const boardProps = initBoard(initFormat);
    this.setState({ ...boardProps, log: initFormat });
  }

  onClick = (cur: number, count: number) => {
    const { log, counts, turn } = this.state;
    counts[turn] += count;

    this.setState({ log: `${log} ${cur}`, counts, turn: getOtherSTONE(turn) });
  };

  onError = (e: Error) => {
    console.log("e: " + e);
  };

  render() {
    const { board, counts, turn } = this.state;
    return (
      <GoPageBox>
        <BoardBox>
          <Board
            board={board}
            turn={turn}
            onClick={this.onClick}
            onError={this.onError}
          />
        </BoardBox>
      </GoPageBox>
    );
  }
}

const GoPageBox = styled.div`
  width: 600px;
  height: 600px;
`;
const BoardBox = styled.div(() => {
  const RATIO = 90;
  return {
    width: `min(${RATIO}vw, ${RATIO}vh)`,
    height: `min(${RATIO}vw, ${RATIO}vh)`,
  };
});

export default GoPage;
