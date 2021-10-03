export enum ColorPattern {
  Rainbow = "Rainbow",
  Fire = "Fire",
  Green = "Green",
  Ice = "Ice",
  Heat = "Heat",
  Monochrome = "Monochrome",
  Pastel = "Pastel",
}

export interface IColorGenerator {
  next(): string;
  endIteration(): void;
}
