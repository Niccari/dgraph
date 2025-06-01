import Mexp from "math-expression-evaluator";
import { Value } from "../../models";
import { ISimulator } from "./interface";

class Simulator implements ISimulator {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  public create = async (equation: string, x: number[]): Promise<Value[]> => {
    const mexp = new Mexp();
    return Promise.all(
      x.map(async (xi) => {
        try {
          // added parenthesis to miss replacing
          // ex) expected: 5.01x -> 5.01 * 2.3, not to be: 5.1x -> 5.12.3 when x = 2.3)
          const equationWithValue = equation.replace(/x/g, `(${(xi * 180) / Math.PI})`);
          const result = mexp.eval(equationWithValue);
          if (typeof result === "number") {
            return { x: xi, y: result };
          }
          return { x: xi, y: NaN };
        } catch (e) {
          return Promise.reject(new Error(`Cannot eval: ${e}`));
        }
      }),
    );
  };
}

export default Simulator;
