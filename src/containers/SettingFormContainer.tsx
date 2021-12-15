import SettingForm from "../components/SettingForm";
import { ChartSetting } from "../models";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { simulateAsync } from "../redux/slice/simulationSlice";

const SettingFormContainer = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const setting = useAppSelector((state) => state.simulation.setting);
  const simulatingState = useAppSelector((state) => state.simulation.simulatingState);
  const onSettingUpdate = (newSetting: ChartSetting) => {
    dispatch(
      simulateAsync({
        setting: newSetting,
        prevSetting: setting,
      })
    );
  };

  return <SettingForm onSettingUpdate={onSettingUpdate} simulatingState={simulatingState} />;
};

export default SettingFormContainer;
