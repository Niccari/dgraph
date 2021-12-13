import { DrawSetting, Coordinate, Snapshot, SnapshotDrawSetting, Value } from "../../models";
import { ControllerUpdateAction } from "../controller/interface";
import { ISimulator } from "../simulator/interface";
import { IVisualizer } from "../visualizer/interface";
import { ISnapshots } from "./interface";

export class Snapshots implements ISnapshots {
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

  private async getValues(equation: string, x: number[], action: ControllerUpdateAction): Promise<Value[]> {
    if (action === ControllerUpdateAction.UpdateAll || action === ControllerUpdateAction.UpdateSimulation) {
      return await this.simulator.create(equation, x).catch((e) => {
        return Promise.reject(e);
      });
    } else {
      return this.snapshotsOrtho.map((s) => s.value);
    }
  }

  private async getDrawSettings(
    x: number[],
    drawSetting: DrawSetting,
    action: ControllerUpdateAction
  ): Promise<SnapshotDrawSetting[]> {
    if (action === ControllerUpdateAction.UpdateAll || action === ControllerUpdateAction.UpdateAppearance) {
      return await this.visualizer.create(x, drawSetting);
    } else {
      return this.snapshotsOrtho.map((s) => s.drawSetting);
    }
  }

  private toSnapshots(x: number[], values: Value[], drawSettings: SnapshotDrawSetting[]): Snapshot[] {
    const count = new Array(x.length).fill(0).map((_, index) => index);
    return count.map((index) => {
      return {
        x: x[index],
        value: values[index],
        drawSetting: drawSettings[index],
      };
    });
  }

  public async update(
    equation: string,
    x: number[],
    drawSetting: DrawSetting,
    action: ControllerUpdateAction
  ): Promise<void> {
    if (action === ControllerUpdateAction.None) {
      return;
    }
    const values = await this.getValues(equation, x, action).catch((e) => {
      return Promise.reject(e);
    });
    const drawSettings = await this.getDrawSettings(x, drawSetting, action);

    this.snapshotsOrtho = this.toSnapshots(x, values, drawSettings);
    this.snapshotsPolar = this.snapshotsOrtho.map((v) => {
      return {
        ...v,
        value: {
          x: Math.abs(v.value.y) * Math.cos(v.value.x),
          y: Math.abs(v.value.y) * Math.sin(v.value.x),
        },
      };
    });
  }

  public get(coordinate: Coordinate): Snapshot[] {
    switch (coordinate) {
      case Coordinate.Ortho:
        return this.snapshotsOrtho;
      case Coordinate.Polar:
        return this.snapshotsPolar;
    }
  }
}
