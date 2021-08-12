import STONE, { isEmpty, isEnemy } from "./STONE";
import ERROR from "./error.json";
import { toFourWays } from "./Point";
import getAlliances from "./bfs";

// Group 을 구현하는 것도 애매하다.

const parseGo = (str: string) =>
  str
    .trim()
    .split(" ")
    .map((k) => parseInt(k));

// counts: 검은색이 1점 더 먹었다.
export const initBoard = (
  str: string
): {
  board: STONE[];
  counts: { [id: number]: number };
  turn: STONE;
} => {
  const board: STONE[] = Array(19 * 19).fill(STONE.EMPTY);
  const moveLogs: number[] = parseGo(str).filter((k) => !isNaN(k));

  const counts = {
    [STONE.BLACK]: 0,
    [STONE.WHITE]: 0,
  };

  moveLogs.forEach((cur, idx) => {
    const turn = idx % 2 === 0 ? STONE.BLACK : STONE.WHITE;
    const capturedStones: number = move(board, cur, turn);
    counts[turn] += capturedStones;
  });

  const turn = moveLogs.length % 2 === 0 ? STONE.BLACK : STONE.WHITE;
  return { board, counts, turn };
};

// 같은 곳 여러 번 왔다갔다 하는 건 구현 X
// 얼마나 많이 잡았는가를 return
export const move = (board: STONE[], cur: number, turn: STONE): number => {
  if (!isEmpty(board[cur])) throw Error(ERROR.LOG_ERROR);
  // 0. 돌을 놓는다.
  board[cur] = turn;

  // TODO: 상대방의 돌로 둘러싸인 돌은 죽은 돌이 된다.
  const counts = cankill(board, cur);

  // TODO: 사방이 다른 색 돌로 둘러싸인 곳에는 착수할 수 없다. 단, 둘러싼 다른 색 돌 중 끊어진 부분이 있어서 단수가 되어있을 때는 착수가 가능하다. 물론 단수가 된 그 다른 색 돌은 잡힌다.
  if (canbekilled(board, cur)) {
    board[cur] = STONE.EMPTY;
    throw Error(ERROR.CAN_BE_KILLED);
  } else return counts;
};

const canbekilled = (board: STONE[], cur: number) => {
  const alliances = getAlliances<STONE>(board, cur);
  return alliances.every((alliance) =>
    toFourWays(alliance).every((p) => !isEmpty(board[p]))
  );
};

const cankill = (board: STONE[], cur: number) =>
  toFourWays(cur)
    .filter((dst) => isEnemy(board[cur], board[dst]))
    .filter((dst) => canbekilled(board, dst))
    .map((dst) => {
      if (isEmpty(board[dst])) return 0;

      const alliances = getAlliances(board, dst);
      alliances.forEach((p) => (board[p] = STONE.EMPTY));
      return alliances.length;
    })
    .reduce((prev, v) => prev + v, 0);
