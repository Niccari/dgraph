import { useEffect } from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import QueryUpdater from "./components/QueryUpdater";
import SettingForm from "./components/SettingForm";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { simulateAsync } from "./redux/slice/simulationSlice";

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const setting = useAppSelector((state) => state.simulation.setting);

  useEffect(() => {
    dispatch(simulateAsync({ setting }));
  }, []);

  return (
    <>
      <SettingForm />
      <Canvas />
      <QueryUpdater />
    </>
  );
};

export default App;
