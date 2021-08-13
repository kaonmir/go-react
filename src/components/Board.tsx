import * as React from "react";
import { useEffect, useState } from "react";
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

const Board: React.FunctionComponent<Props> = (props) => {
  const [board, setBoard] = useState<STONE[]>([]);
  const [turn, setTurn] = useState<STONE>(STONE.BLACK);
  const [screenSize, setScreenSize] = useState<number>(window.innerWidth);

  useEffect(() => setBoard(props.board), [props.board]);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onClick = (cur: number) => {
    try {
      const count = move(board, cur, turn);
      props.onClick(cur, count);

      setBoard(board);
      setTurn(getOtherSTONE(turn));
    } catch (e) {
      props.onError(e);
    }
  };

  return (
    <BoardBox>
      {board.map((stone, cur) => (
        <BoardPiece key={cur} {...{ cur, stone, screenSize, onClick }} />
      ))}
    </BoardBox>
  );
};

const BoardBox = styled.div`
  display: inline-grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(19, 1fr);
  grid-template-rows: repeat(19, 1fr);
`;

export default Board;
