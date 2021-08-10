type Point = {
  x: number;
  y: number;
};

export default Point;
export const isOutBoard = ({ x, y }: Point) =>
  x < 0 || 19 < x || y < 0 || 19 < y;
export const convertToPoint = (cur: number): Point => ({
  x: Math.floor(cur / 19),
  y: cur % 19,
});
export const convertToNumber = (p: Point): number => p.x * 19 + p.y;

const ms = [
  { x: 0, y: -1 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 1, y: 0 },
];

export const toFourWays = (cur: number): number[] => {
  const p = convertToPoint(cur);
  return ms
    .map((m) => ({ x: m.x + p.x, y: m.y + p.y }))
    .filter((_) => !isOutBoard(_))
    .map((_) => convertToNumber(_));
};
