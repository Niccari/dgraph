import { Snapshot, AxisSetting } from "../../models";
import { IDrawer } from "./interface";

class Drawer implements IDrawer {
  public draw(
    context: CanvasRenderingContext2D,
    snapshots: Snapshot[],
    axisSetting: AxisSetting,
    thickness: number,
    canvasWidth: number,
    canvasHeight: number
  ): void {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    for (let i = 0; i < snapshots.length - 1; i += 1) {
      const start = snapshots[i];
      const end = snapshots[i + 1];

      context.lineWidth = thickness;
      context.strokeStyle = snapshots[i].drawSetting.color;

      context.beginPath();
      const [startX, startY] = this.rescalePoint(start, axisSetting, canvasWidth, canvasHeight);
      context.moveTo(startX, startY);
      const [endX, endY] = this.rescalePoint(end, axisSetting, canvasWidth, canvasHeight);
      context.lineTo(endX, endY);
      context.closePath();
      context.stroke();
    }
  }

  private rescalePoint = (
    snapshot: Snapshot,
    axisSetting: AxisSetting,
    displayWidth: number,
    displayHeight: number
  ): [number, number] => {
    const { xMin, xMax, yMin, yMax } = axisSetting;
    return [
      ((snapshot.value.x - xMin) / (xMax - xMin)) * displayWidth,
      (1 - (snapshot.value.y - yMin) / (yMax - yMin)) * displayHeight,
    ];
  };
}

export default Drawer;
