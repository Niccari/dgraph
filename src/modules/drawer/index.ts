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

    if (snapshots.length < 2) return;

    context.lineWidth = thickness;

    let i = 0;
    while (i < snapshots.length - 1) {
      const currentColor = snapshots[i]!.drawSetting.color;

      context.strokeStyle = currentColor;
      context.beginPath();

      const [startX, startY] = Drawer.rescalePoint(snapshots[i]!, axisSetting, canvasWidth, canvasHeight);
      context.moveTo(startX, startY);

      // minimize stroke style change
      while (i < snapshots.length - 1 && snapshots[i]!.drawSetting.color === currentColor) {
        i++;
        const [x, y] = Drawer.rescalePoint(snapshots[i]!, axisSetting, canvasWidth, canvasHeight);
        context.lineTo(x, y);
      }

      context.stroke();
    }
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
