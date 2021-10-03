import { SimulatingState } from "../redux/slice/simulationSlice";

interface Props {
  simulatingState: SimulatingState;
}

export const StateMessage: (props: Props) => JSX.Element = ({ simulatingState }) => {
  return (
    <>
      {simulatingState === SimulatingState.Loading && <span>⏰</span>}
      {simulatingState === SimulatingState.Error && <span>❌</span>}
      {simulatingState === SimulatingState.Completed && <span>✅</span>}
    </>
  );
};
