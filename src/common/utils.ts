export const utils = {
    range: (min: number, max: number) => Array.from({ length: max - min }, (_, i) => min + i),
    random: (min: number, max: number) => Math.floor(Math.random() * (max - min) + min)
}

export type xyCoords = [number, number];

export enum GameStatus {
    NotStarted,
    Running,
    GameOver,
  }
