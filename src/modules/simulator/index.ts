import { ISimulator } from "./interface";
import { evaluate } from "mathjs";
import { Value } from "../../models";

export class Simulator implements ISimulator {
  async create(equation: string, x: number[]): Promise<Value[]> {
    return Promise.all(
      x.map(async (x) => {
        try {
          const result = evaluate(equation, { x });
          if (typeof result === "number") {
            return { x, y: result };
          }
          return { x, y: NaN };
        } catch {
          return Promise.reject("Cannot eval");
        }
      })
    );
  }
}
