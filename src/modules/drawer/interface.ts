import { AxisSetting, Snapshot } from "../../models";

export interface IDrawer {
  draw(
    context: CanvasRenderingContext2D,
    snapshots: Snapshot[],
    axisSetting: AxisSetting,
    thickness: number,
    canvasWidth: number,
    canvasHeight: number
  ): void;
}
