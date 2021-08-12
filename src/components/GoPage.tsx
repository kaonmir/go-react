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
  errorMessage: String;
  errorVisible: Boolean;
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
    errorMessage: "",
    errorVisible: false,
  };

  componentDidMount() {
    const initFormat = "";
    const boardProps = initBoard(initFormat);
    this.setState({ ...boardProps, log: initFormat });
  }

  onClick = (cur: number, count: number) => {
    const { log, counts, turn } = this.state;
    counts[turn] += count;

    console.log(`${log} ${cur}`);
    this.setState({ log: `${log} ${cur}`, counts, turn: getOtherSTONE(turn) });
  };

  onError = (e: Error) => {
    this.setState({ errorMessage: e.message, errorVisible: true });
    setTimeout(() => this.setState({ errorVisible: false }), 2000);
  };

  render() {
    const { board, counts, turn, errorMessage, errorVisible } = this.state;
    return (
      <GoPageBox>
        <ErrorBox {...{ errorVisible }}>{errorMessage}</ErrorBox>
        <ScoreBox>
          BLACK {counts[STONE.BLACK]} : {counts[STONE.WHITE]} WHITE
        </ScoreBox>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  min-width: 400px;
  min-height: 400px;
`;

const BoardBox = styled.div(() => {
  const RATIO = 90;
  return {
    width: `min(${RATIO}vw, ${RATIO}vh)`,
    height: `min(${RATIO}vw, ${RATIO}vh)`,
  };
});

const ScoreBox = styled.div``;

interface ErrorBoxProps {
  errorVisible: Boolean;
}
const ErrorBox = styled.div<ErrorBoxProps>`
  color: red;
  transition: all 0.6s ease;

  opacity: ${({ errorVisible }) => (errorVisible ? "100%" : "0%")};
`;

export default GoPage;
