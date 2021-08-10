import * as React from "react";
import styled from "styled-components";
import STONE from "../services/STONE";

import BLACK_STONE from "../assets/Black_Stone.png";
import WHITE_STONE from "../assets/White_Stone.png";

export interface ChessPieceProps {
  cur: number;
  stone?: STONE;
  onClick: (index: number) => void;
}

const BoardPiece: React.FunctionComponent<ChessPieceProps> = ({
  cur,
  stone,
  onClick,
}) => {
  const BOARD_MAX = 19;
  const top = Math.floor(cur / BOARD_MAX) !== 0;
  const bottom = Math.floor(cur / BOARD_MAX) !== BOARD_MAX - 1;
  const left = cur % BOARD_MAX !== 0;
  const right = cur % BOARD_MAX !== BOARD_MAX - 1;

  const onClickStone = () => {
    if (stone === undefined) onClick(cur);
  };

  return (
    <BoardPieceBox onClick={onClickStone}>
      {top && <TopLine lineSize={4} />}
      {bottom && <BottomLine lineSize={4} />}
      {left && <LeftLine lineSize={4} />}
      {right && <RightLine lineSize={4} />}
      {stone === undefined ? null : stone === STONE.BLACK ? (
        <Stone src={BLACK_STONE} />
      ) : (
        <Stone src={WHITE_STONE} />
      )}
    </BoardPieceBox>
  );
};

const BoardPieceBox = styled.div`
  position: relative;
  background-color: #ddb35b;
`;

const Stone = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 30px;
  height: 30px;
  transform: translate(-50%, -50%);
`;

interface LineProps {
  lineSize: number;
}

const LineHorizontal = styled.div<LineProps>(({ lineSize }) => ({
  position: "absolute",
  borderBottom: `${lineSize}px solid black`,
  width: `calc(50% + ${lineSize / 2}px)`,
  top: "50%",
}));

const LineVertical = styled.div<LineProps>(({ lineSize }) => ({
  position: "absolute",
  borderLeft: `${lineSize}px solid black`,
  height: `calc(50% + ${lineSize / 2}px)`,
  left: "50%",
}));

const LeftLine = styled(LineHorizontal)`
  left: 0%;
  transform: translateY(-50%);
`;
const RightLine = styled(LineHorizontal)`
  left: 50%;
  transform: ${({ lineSize }) => `translate(-${lineSize / 2}px, -50%)`};
`;
const TopLine = styled(LineVertical)`
  top: 0%;
  transform: translateX(-50%);
`;
const BottomLine = styled(LineVertical)`
  top: 50%;
  transform: ${({ lineSize }) => `translate(-50%, -${lineSize / 2}px)`};
`;
export default BoardPiece;
