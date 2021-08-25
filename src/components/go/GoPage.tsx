import * as React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { createGo, getGoById, getAllIds, patchGoById } from "../../apis/go.api";
import * as goService from "../../services/go";
import STONE, { getOtherSTONE } from "../../services/STONE";
import Board from "./Board";
import GoPageSide from "./Sidebar";

const GoPage: React.FunctionComponent = (props) => {
  const [board, setBoard] = useState<STONE[]>([]);
  const [counts, setCounts] = useState<{ [id: number]: number }>({
    [STONE.WHITE]: 0,
    [STONE.BLACK]: 0,
  });
  const [turn, setTurn] = useState<STONE>(STONE.BLACK);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);

  const [ids, setIds] = useState<string[]>([]);

  const [id, setId] = useState("");
  const [logs, setLogs] = useState<number[]>([]);

  const initBoard = (logs: number[]) => {
    const boardProps = goService.initBoard(logs);
    setLogs(logs);
    setBoard(boardProps.board);
    setCounts(boardProps.counts);
    setTurn(boardProps.turn);
  };

  useEffect(() => {
    getAllIds().then((ids) => setIds(ids));
    initBoard([]);
  }, []);

  const onClickBoard = (cur: number) => {
    try {
      const count = goService.move(board, cur, turn);
      counts[turn] += count;
      setCounts(counts);
      setBoard(board);
      setTurn(getOtherSTONE(turn));
      setLogs([...logs, cur]);
    } catch (e) {
      onError(e);
      return;
    }

    if (logs.length === 0) {
      createGo(`${cur}`).then((go) => {
        setIds([...ids, go.id]);
        setId(go.id);
      });
    }
  };

  const onClickSidebard = (id: string) => {
    setId(id);
    getGoById(id).then((go) => initBoard(go.logs));
  };

  const onClickSave = () => {
    patchGoById(id, logs).then((go) => {
      alert("save successfully!!");
    });
  };

  const onError = (e: Error) => {
    setErrorMessage(e.message);
    setErrorVisible(true);
    setTimeout(() => setErrorVisible(false), 2000);
  };

  return (
    <GoPageBox>
      <GoPageSide
        id={id}
        ids={ids}
        onClick={onClickSidebard}
        onSave={onClickSave}
      />
      <GoPageContent>
        <ErrorBox {...{ errorVisible }}>{errorMessage}</ErrorBox>
        <ScoreBox>
          BLACK {counts[STONE.BLACK]} : {counts[STONE.WHITE]} WHITE
        </ScoreBox>
        <BoardBox>
          <Board
            board={board}
            turn={turn}
            onClick={onClickBoard}
            onError={onError}
          />
        </BoardBox>
      </GoPageContent>
    </GoPageBox>
  );
};

const GoPageBox = styled.div`
  display: flex;
  align-items: center;
`;
const GoPageContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
