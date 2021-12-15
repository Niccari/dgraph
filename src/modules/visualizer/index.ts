import { DrawSetting, SnapshotDrawSetting } from "../../models";
import ColorGenerator from "../colorGenerator";
import { IColorGenerator } from "../colorGenerator/interface";
import { IVisualizer } from "./interface";

class Visualizer implements IVisualizer {
  public create = async (x: number[], drawSetting: DrawSetting): Promise<SnapshotDrawSetting[]> => {
    const colorGenerator: IColorGenerator = new ColorGenerator(drawSetting);

    return x.map(() => {
      return {
        color: colorGenerator.next(),
      };
    });
  };
}

export default Visualizer;
