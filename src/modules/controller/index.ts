import { AxisSetting, ChartSetting } from "../../models";
import { IDrawer } from "../drawer/interface";
import { ISnapshots } from "../snapshots/interface";
import { ControllerUpdateAction, IController } from "./interface";

class Controller implements IController {
  private snapshots: ISnapshots;
  private drawer: IDrawer;

  public constructor(snapshots: ISnapshots, drawer: IDrawer, defaultSetting: ChartSetting) {
    this.snapshots = snapshots;
    this.drawer = drawer;

    this.update(defaultSetting);
  }

  private static toXRange = (axisSetting: AxisSetting): number[] => {
    const { xMin, xMax, xStep } = axisSetting;
    const count = Math.floor((xMax - xMin) / xStep) + 1;
    return new Array(count).fill(0).map((_, index) => xMin + index * xStep);
  };

  private static findAction = (setting: ChartSetting, prevSetting?: ChartSetting): ControllerUpdateAction => {
    if (!prevSetting) {
      return ControllerUpdateAction.UpdateAll;
    }
    const shouldUpdateSimulation = setting.equation !== prevSetting.equation || setting.axis !== prevSetting.axis;
    const shouldUpdateAppearance =
      setting.chartAppearance.draw !== prevSetting.chartAppearance.draw || setting.axis !== prevSetting.axis;
    if (shouldUpdateSimulation && shouldUpdateAppearance) {
      return ControllerUpdateAction.UpdateAll;
    }
    if (shouldUpdateSimulation) {
      return ControllerUpdateAction.UpdateSimulation;
    }
    if (shouldUpdateAppearance) {
      return ControllerUpdateAction.UpdateAppearance;
    }
    return ControllerUpdateAction.None;
  };

  public async update(setting: ChartSetting, prevSetting?: ChartSetting): Promise<void> {
    const x = Controller.toXRange(setting.axis);
    const action = Controller.findAction(setting, prevSetting);

    return this.snapshots.update(setting.equation, x, setting.chartAppearance.draw, action);
  }

  public draw(
    context: CanvasRenderingContext2D,
    setting: ChartSetting,
    canvasWidth: number,
    canvasHeight: number,
  ): void {
    const { coordinate, axis } = setting;
    const { thickness } = setting.chartAppearance;
    const snapshots = this.snapshots.get(coordinate);
    this.drawer.draw(context, snapshots, axis, thickness, canvasWidth, canvasHeight);
  }
}

export default Controller;
