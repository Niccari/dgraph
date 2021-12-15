import { ColorPattern } from "../modules/colorGenerator/interface";

export const Coordinate = {
  Ortho: "Ortho",
  Polar: "Polar",
} as const;
export type Coordinate = typeof Coordinate[keyof typeof Coordinate];

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

const defaultSetting = {
  equation: "2(sin(5.01x) + cos(4.99x))sin(10x)",
  axis: {
    xStep: 0.001,
    xMin: -Math.PI,
    xMax: Math.PI,
    yMin: -Math.PI,
    yMax: Math.PI,
  },
  coordinate: Coordinate.Polar,
  chartAppearance: {
    draw: {
      pattern: ColorPattern.Rainbow,
      colorStep: 256 / ((2 * Math.PI) / 0.001),
    },
    thickness: 5,
  },
};

export const initialSetting = ((): ChartSetting => {
  const query = new URL(document.location.href).searchParams;
  const settingQuery = query.get("setting") || "";
  try {
    return JSON.parse(atob(settingQuery));
  } catch (e) {
    return defaultSetting;
  }
})();
