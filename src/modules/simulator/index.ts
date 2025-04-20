import { parser } from "mathjs";
import { Value } from "../../models";
import { ISimulator } from "./interface";

class Simulator implements ISimulator {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  public create = async (equation: string, x: number[]): Promise<Value[]> => {
    const fx = parser();
    fx.evaluate(`f(x) = ${equation}`);
    return Promise.all(
      x.map(async (xi) => {
        try {
          const result = fx.evaluate(`f(${xi})`) as number | undefined;
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
