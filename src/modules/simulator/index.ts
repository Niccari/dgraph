import { evaluate } from "mathjs";
import { ISimulator } from "./interface";
import { Value } from "../../models";

class Simulator implements ISimulator {
  // eslint-disable-next-line class-methods-use-this
  public create = async (equation: string, x: number[]): Promise<Value[]> => {
    return Promise.all(
      x.map(async (xi) => {
        try {
          const result = evaluate(equation, { x: xi });
          if (typeof result === "number") {
            return { x: xi, y: result };
          }
          return { x: xi, y: NaN };
        } catch {
          return Promise.reject(new Error("Cannot eval"));
        }
      })
    );
  };
}

export default Simulator;
