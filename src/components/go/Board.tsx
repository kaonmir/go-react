import * as React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import STONE from "../../services/STONE";
import BoardPiece from "./BoardPiece";

interface Props {
  board: STONE[];
  turn: STONE;
  onClick: (cur: number) => void;
  onError: (e: Error) => void;
}

const Board: React.FunctionComponent<Props> = (props) => {
  const [screenSize, setScreenSize] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <BoardBox>
      {props.board.map((stone, cur) => (
        <BoardPiece
          key={cur}
          {...{ cur, stone, screenSize, onClick: props.onClick }}
        />
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
