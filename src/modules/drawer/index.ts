import { Snapshot, AxisSetting } from "../../models";
import { IDrawer } from "./interface";

class Drawer implements IDrawer {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  public draw(
    context: CanvasRenderingContext2D,
    snapshots: Snapshot[],
    axisSetting: AxisSetting,
    thickness: number,
    canvasWidth: number,
    canvasHeight: number,
  ): void {
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    snapshots.reduce((start, end) => {
      context.lineWidth = thickness;
      context.strokeStyle = start.drawSetting.color;

      context.beginPath();
      const [startX, startY] = Drawer.rescalePoint(start, axisSetting, canvasWidth, canvasHeight);
      context.moveTo(startX, startY);
      const [endX, endY] = Drawer.rescalePoint(end, axisSetting, canvasWidth, canvasHeight);
      context.lineTo(endX, endY);
      context.closePath();
      context.stroke();

      return end;
    }, snapshots[0] as Snapshot);
  }

  private static rescalePoint = (
    snapshot: Snapshot,
    axisSetting: AxisSetting,
    displayWidth: number,
    displayHeight: number,
  ): [number, number] => {
    const { xMin, xMax, yMin, yMax } = axisSetting;
    return [
      ((snapshot.value.x - xMin) / (xMax - xMin)) * displayWidth,
      (1 - (snapshot.value.y - yMin) / (yMax - yMin)) * displayHeight,
    ];
  };
}

export default Drawer;
