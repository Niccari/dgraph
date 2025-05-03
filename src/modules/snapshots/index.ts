import { DrawSetting, Coordinate, Snapshot, SnapshotDrawSetting, Value } from "../../models";
import { ControllerUpdateAction } from "../controller/interface";
import { ISimulator } from "../simulator/interface";
import { IVisualizer } from "../visualizer/interface";
import { ISnapshots } from "./interface";

class Snapshots implements ISnapshots {
  private simulator: ISimulator;
  private visualizer: IVisualizer;
  private snapshotsOrtho: Snapshot[];
  private snapshotsPolar: Snapshot[];

  public constructor(simulator: ISimulator, visualizer: IVisualizer) {
    this.simulator = simulator;
    this.visualizer = visualizer;
    this.snapshotsOrtho = [];
    this.snapshotsPolar = [];
  }

  private getValues = async (equation: string, x: number[], action: ControllerUpdateAction): Promise<Value[]> => {
    if (action === ControllerUpdateAction.UpdateAll || action === ControllerUpdateAction.UpdateSimulation) {
      return this.simulator.create(equation, x).catch((e) => Promise.reject(e));
    }
    return this.snapshotsOrtho.map((s) => s.value);
  };

  private getDrawSettings = async (
    x: number[],
    drawSetting: DrawSetting,
    action: ControllerUpdateAction,
  ): Promise<SnapshotDrawSetting[]> => {
    if (action === ControllerUpdateAction.UpdateAll || action === ControllerUpdateAction.UpdateAppearance) {
      return this.visualizer.create(x, drawSetting);
    }
    return this.snapshotsOrtho.map((s) => s.drawSetting);
  };

  private static toSnapshots = (x: number[], values: Value[], drawSettings: SnapshotDrawSetting[]): Snapshot[] => {
    const count = new Array(x.length).fill(0).map((_, index) => index);
    return count.map((index) => ({
      x: x[index] ?? 0,
      value: values[index] ?? { x: 0, y: 0 },
      drawSetting: drawSettings[index] ?? { color: "#000000", thickness: 1 },
    }));
  };

  public update = async (
    equation: string,
    x: number[],
    drawSetting: DrawSetting,
    action: ControllerUpdateAction,
  ): Promise<void> => {
    if (action === ControllerUpdateAction.None) {
      return;
    }
    const values = await this.getValues(equation, x, action).catch((e) => Promise.reject(e));
    const drawSettings = await this.getDrawSettings(x, drawSetting, action);

    this.snapshotsOrtho = Snapshots.toSnapshots(x, values, drawSettings);
    this.snapshotsPolar = this.snapshotsOrtho.map((v) => ({
      ...v,
      value: {
        x: Math.abs(v.value.y) * Math.cos(v.value.x),
        y: Math.abs(v.value.y) * Math.sin(v.value.x),
      },
    }));
  };

  public get(coordinate: Coordinate): Snapshot[] {
    switch (coordinate) {
      case Coordinate.Ortho:
        return this.snapshotsOrtho;
      case Coordinate.Polar:
        return this.snapshotsPolar;
      default:
        return this.snapshotsOrtho;
    }
  }
}

export default Snapshots;
