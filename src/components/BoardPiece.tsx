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
  const BOARD_LINESIZE = 4;
  const CENTER_POINTS = [60, 66, 72, 174, 180, 186, 288, 294, 300];

  const top = Math.floor(cur / BOARD_MAX) !== 0;
  const bottom = Math.floor(cur / BOARD_MAX) !== BOARD_MAX - 1;
  const left = cur % BOARD_MAX !== 0;
  const right = cur % BOARD_MAX !== BOARD_MAX - 1;
  const center = CENTER_POINTS.includes(cur);

  const onClickStone = () => {
    if (stone === STONE.EMPTY) onClick(cur);
  };

  return (
    <BoardPieceBox onClick={onClickStone}>
      {top && <TopLine lineSize={BOARD_LINESIZE} />}
      {bottom && <BottomLine lineSize={BOARD_LINESIZE} />}
      {left && <LeftLine lineSize={BOARD_LINESIZE} />}
      {right && <RightLine lineSize={BOARD_LINESIZE} />}
      {center && <CenterDot lineSize={BOARD_LINESIZE} />}

      {stone === STONE.EMPTY ? null : stone === STONE.BLACK ? (
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
  min-width: 20px;
  min-height: 20px;
`;

const Stone = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 70%;
  height: 70%;
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
  transform: ${({ lineSize }) => `translate(0, -50%)`};
`;
const RightLine = styled(LineHorizontal)`
  left: 50%;
  transform: ${({ lineSize }) => `translate(-${lineSize / 2}px, -50%)`};
`;
const TopLine = styled(LineVertical)`
  top: 0%;
  transform: ${({ lineSize }) => `translate(-50%, -${lineSize / 2}px)`};
`;
const BottomLine = styled(LineVertical)`
  top: 50%;
  transform: ${({ lineSize }) => `translate(-50%, -${lineSize / 2}px)`};
`;

const CenterDot = styled.div<LineProps>`
  position: absolute;
  border-radius: 50%;
  width: ${({ lineSize }) => `${lineSize * 3.5}px`};
  height: ${({ lineSize }) => `${lineSize * 3.5}px`};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: black;
`;
export default BoardPiece;
