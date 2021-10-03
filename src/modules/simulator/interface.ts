import { Value } from "../../models";

export interface ISimulator {
  create(equation: string, x: number[]): Promise<Value[]>;
}
