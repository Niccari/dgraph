import { useEffect } from "react";
import CanvasContainer from "./CanvasContainer";
import SettingFormContainer from "./SettingFormContainer";
import QueryUpdateContainer from "./QueryUpdateContainer";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { simulateAsync } from "../redux/slice/simulationSlice";

const RootContainer = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const setting = useAppSelector((state) => state.simulation.setting);

  useEffect(() => {
    dispatch(simulateAsync({ setting }));
  }, []);

  return (
    <>
      <SettingFormContainer />
      <CanvasContainer />
      <QueryUpdateContainer />
    </>
  );
};

export default RootContainer;
