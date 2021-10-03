import { Coordinate, DrawSetting, Snapshot } from "../../models";
import { ControllerUpdateAction } from "../controller/interface";

export interface ISnapshots {
  update(equation: string, x: number[], drawSetting: DrawSetting, action: ControllerUpdateAction): Promise<void>;
  get(coordinate: Coordinate): Snapshot[];
}
