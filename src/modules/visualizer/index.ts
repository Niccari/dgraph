import { DrawSetting, SnapshotDrawSetting } from "../../models";
import ColorGenerator from "../colorGenerator";
import { IColorGenerator } from "../colorGenerator/interface";
import { IVisualizer } from "./interface";

class Visualizer implements IVisualizer {
  // eslint-disable-next-line class-methods-use-this
  public create = async (x: number[], drawSetting: DrawSetting): Promise<SnapshotDrawSetting[]> => {
    const colorGenerator: IColorGenerator = new ColorGenerator(drawSetting);

    return x.map(() => ({
      color: colorGenerator.next(),
    }));
  };
}

export default Visualizer;
