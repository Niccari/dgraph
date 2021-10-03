import { DrawSetting, SnapshotDrawSetting } from "../../models";
import ColorGenerator from "../colorGenerator";
import { IColorGenerator } from "../colorGenerator/interface";
import { IVisualizer } from "./interface";

export class Visualizer implements IVisualizer {
  async create(x: number[], drawSetting: DrawSetting): Promise<SnapshotDrawSetting[]> {
    const colorGenerator: IColorGenerator = new ColorGenerator(drawSetting);

    return x.map(() => {
      return {
        color: colorGenerator.next(),
      };
    });
  }
}
