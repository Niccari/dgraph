export const ColorPattern = {
  Rainbow: "Rainbow",
  Fire: "Fire",
  Green: "Green",
  Ice: "Ice",
  Heat: "Heat",
  Monochrome: "Monochrome",
  Pastel: "Pastel",
} as const;

export type ColorPattern = (typeof ColorPattern)[keyof typeof ColorPattern];

export interface IColorGenerator {
  next(): string;
  endIteration(): void;
}
