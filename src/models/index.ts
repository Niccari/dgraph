import { ColorPattern } from "../modules/colorGenerator/interface";

export enum Coordinate {
  Ortho = "Ortho",
  Polar = "Polar",
}

export interface SnapshotDrawSetting {
  color: string;
}

export interface Value {
  x: number;
  y: number;
}

export interface Snapshot {
  x: number;
  value: Value;
  drawSetting: SnapshotDrawSetting;
}

export interface DrawSetting {
  pattern: ColorPattern;
  colorStep: number;
}

export interface ChartAppearanceSetting {
  draw: DrawSetting;
  thickness: number;
}

export interface AxisSetting {
  xStep: number;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

export interface ChartSetting {
  equation: string;
  coordinate: Coordinate;
  axis: AxisSetting;
  chartAppearance: ChartAppearanceSetting;
}
