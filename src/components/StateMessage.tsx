import { SimulatingState } from "../redux/slice/simulationSlice";

interface Props {
  simulatingState: SimulatingState;
}

const StateMessage: (props: Props) => JSX.Element = ({ simulatingState }) => (
  <>
    {simulatingState === SimulatingState.Loading && <span>⏰</span>}
    {simulatingState === SimulatingState.Error && <span>❌</span>}
    {simulatingState === SimulatingState.Completed && <span>✅</span>}
  </>
);

export default StateMessage;
