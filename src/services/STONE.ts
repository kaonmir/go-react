import ERROR from "./error.json";

const STONE = {
  BLACK: 0,
  WHITE: 1,
  EMPTY: 9,
} as const;
type STONE = typeof STONE[keyof typeof STONE];

export default STONE;

export const isEnemy = (A: STONE, B: STONE): Boolean =>
  (A === STONE.BLACK && B === STONE.WHITE) ||
  (A === STONE.WHITE && B === STONE.BLACK);

export const isEmpty = (stone: STONE): Boolean => stone === STONE.EMPTY;

export const getOtherSTONE = (stone: STONE) => {
  if (isEmpty(stone)) throw Error(ERROR.GET_EMPTY_STONE);
  return stone === STONE.BLACK ? STONE.WHITE : STONE.BLACK;
};
