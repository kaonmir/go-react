import STONE, { getOtherSTONE, isEmpty, isEnemy } from "./STONE";
import ERROR from "./error.json";
import { toFourWays } from "./Point";

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
  groups: number[];
  counts: { [id: number]: number };
} => {
  const board: STONE[] = Array(19 * 19);
  const moveLogs: number[] = parseGo(str);
  const groups: number[] = Array(19 * 19).fill(0);

  const counts = {
    [STONE.BLACK]: 0,
    [STONE.WHITE]: 0,
  };

  moveLogs.forEach((cur, idx) => {
    const turn = idx % 2 === 0 ? STONE.BLACK : STONE.WHITE;
    const capturedStones: number = move(board, groups, cur, turn);
    counts[turn] += capturedStones;
  });

  return { board, groups, counts };
};

// 같은 곳 여러 번 왔다갔다 하는 건 구현 X
// 얼마나 많이 잡았는가를 return
export const move = (
  board: STONE[],
  groups: number[],
  cur: number,
  turn: STONE
): number => {
  if (!isEmpty(board[cur])) throw Error(ERROR.LOG_ERROR);
  // 0. 돌을 놓는다.
  board[cur] = turn;

  // TODO: 상대방의 돌로 둘러싸인 돌은 죽은 돌이 된다.
  const counts = cankill(board, groups, cur);

  // TODO: 사방이 다른 색 돌로 둘러싸인 곳에는 착수할 수 없다. 단, 둘러싼 다른 색 돌 중 끊어진 부분이 있어서 단수가 되어있을 때는 착수가 가능하다. 물론 단수가 된 그 다른 색 돌은 잡힌다.
  if (canbekilled(board, groups, cur)) throw Error(ERROR.CAN_BE_KILLED);
  else return counts;
};

const canbekilled = (board: STONE[], groups: number[], cur: number) =>
  groups.every((group, dst) => {
    if (group !== groups[cur]) return true;
    else return toFourWays(dst).every((p) => board[p] !== undefined);
  });

const cankill = (board: STONE[], groups: number[], cur: number) => {
  // 1. 놓은 돌을 그룹에 넣는다. BFS
  // 원래는 BFS 인데 전체 탐색도 괜찮을 듯하다.

  const dsts = toFourWays(cur);
  /// 내가 놓은 돌 주변의 그룹을 가져온다. (내 편만!)
  const gs: number[] = dsts
    .filter((dst) => board[dst] === board[cur])
    .map((dst) => groups[dst])
    .filter((dst, idx, _) => _.indexOf(dst) === idx);

  const maxGroup = Math.max(...groups);
  if (gs.length === 0) groups[cur] = maxGroup + 1;
  else if (gs.length === 1) groups[cur] = gs[0];
  else
    gs.slice(1).forEach((g) =>
      groups.forEach((group, idx) => {
        if (group === g) groups[idx] = gs[0];
      })
    );

  // 2. 다른 그룹을 완벽히 감싸는지 확인함.
  const enemyGroups = dsts
    .filter((dst) => isEnemy(board[cur], board[dst]))
    .map((dst) => groups[dst]);

  const enemyCoveredGroups = enemyGroups.filter((enemyGroup) => {
    return groups.every((group, dst) => {
      if (group !== enemyGroup) return true;
      else return toFourWays(dst).every((p) => board[p] !== undefined);
    });
  });

  // 3. 감싸면 count를 늘려주고 돌을 싹 없앤다.
  var count = 0;
  enemyCoveredGroups.forEach((enemyCoveredGroup) => {
    groups.forEach((group, dst) => {
      if (group === enemyCoveredGroup) {
        count += 1;
        delete board[dst];
        groups[dst] = 0;
      }
    });
  });

  return count;
};
