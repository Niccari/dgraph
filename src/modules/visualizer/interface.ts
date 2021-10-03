import { DrawSetting, SnapshotDrawSetting } from "../../models";

export interface IVisualizer {
  create(x: number[], drawSetting: DrawSetting): Promise<SnapshotDrawSetting[]>;
}
