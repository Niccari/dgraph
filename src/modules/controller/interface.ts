import { ChartSetting } from "../../models";

export enum ControllerUpdateAction {
  UpdateAll,
  UpdateSimulation,
  UpdateAppearance,
  None,
}

export interface IController {
  update(setting: ChartSetting, PrevSetting: ChartSetting): Promise<void>;
  draw(context: CanvasRenderingContext2D, setting: ChartSetting, canvasWidth: number, canvasHeight: number): void;
}
