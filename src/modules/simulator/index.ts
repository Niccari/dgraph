import Mexp from "math-expression-evaluator";
import { Value } from "../../models";
import { ISimulator } from "./interface";

class Simulator implements ISimulator {
  private readonly mexp: Mexp;
  private readonly degreeConversionFactor: number;

  public constructor() {
    this.mexp = new Mexp();
    this.degreeConversionFactor = 180 / Math.PI;
  }

  public create = async (equation: string, x: number[]): Promise<Value[]> => {
    const results: Value[] = new Array(x.length);

    for (let i = 0; i < x.length; i++) {
      const xi = x[i]!; // Safe since we're iterating with i < x.length
      try {
        const xDegrees = xi * this.degreeConversionFactor;
        const result = this.mexp.eval(
          equation,
          [
            {
              type: 3,
              show: "",
              precedence: 1,
              token: "x",
              value: "x",
            },
          ],
          { x: xDegrees },
        );
        if (typeof result === "number") {
          results[i] = { x: xi, y: result };
        } else {
          results[i] = { x: xi, y: NaN };
        }
      } catch (e) {
        throw new Error(`Cannot eval: ${e}`);
      }
    }

    return Promise.resolve(results);
  };
}

export default Simulator;
