import { ChartSetting } from "../../models";

export const ControllerUpdateAction = {
  UpdateAll: "UpdateAll",
  UpdateSimulation: "UpdateSimulation",
  UpdateAppearance: "UpdateAppearance",
  None: "None",
} as const;
export type ControllerUpdateAction = (typeof ControllerUpdateAction)[keyof typeof ControllerUpdateAction];

export interface IController {
  update(setting: ChartSetting, PrevSetting: ChartSetting): Promise<void>;
  draw(context: CanvasRenderingContext2D, setting: ChartSetting, canvasWidth: number, canvasHeight: number): void;
}
