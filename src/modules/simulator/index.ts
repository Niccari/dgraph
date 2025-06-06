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
    const results: Value[] = [];
    
    for (let i = 0; i < x.length; i++) {
      const xi = x[i]!; // Safe since we're iterating with i < x.length
      try {
        // added parenthesis to miss replacing
        // ex) expected: 5.01x -> 5.01 * 2.3, not to be: 5.1x -> 5.12.3 when x = 2.3)
        const xDegrees = xi * this.degreeConversionFactor;
        const equationWithValue = equation.replace(/x/g, `(${xDegrees})`);
        const result = this.mexp.eval(equationWithValue);
        if (typeof result === "number") {
          results.push({ x: xi, y: result });
        } else {
          results.push({ x: xi, y: NaN });
        }
      } catch (e) {
        throw new Error(`Cannot eval: ${e}`);
      }
    }
    
    return Promise.resolve(results);
  };
}

export default Simulator;
