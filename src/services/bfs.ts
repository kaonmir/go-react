import { toFourWays } from "./Point";

function bfs<T>(
  board: T[],
  cur: number,
  value: T,
  visited: Boolean[],
  answer: number[]
) {
  if (visited[cur] || board[cur] !== value) return;
  visited[cur] = true;

  answer.push(cur);
  toFourWays(cur)
    .filter((dst) => !visited[dst])
    .forEach((dst) => bfs(board, dst, value, visited, answer));
}

// 19 * 19 빼는 범용적으로 해보장
function getAlliances<T>(board: T[], cur: number): number[] {
  const answer: number[] = [];
  const value = board[cur];
  const visited = Array<Boolean>(19 * 19).fill(false);

  bfs(board, cur, value, visited, answer);

  return answer;
}

export default getAlliances;
