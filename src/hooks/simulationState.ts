import { atom, useAtom } from "jotai";
import controller from "../container";
import { ChartSetting, initialSetting } from "../models";

type SimulationState = {
  setting: ChartSetting;
  error?: Error;
  isLoading: boolean;
};

const initialData: SimulationState = {
  setting: initialSetting,
  error: undefined,
  isLoading: false,
};

const simulationStateAtom = atom<SimulationState>(initialData);

export const useSimulationState = () => {
  const [state, setState] = useAtom(simulationStateAtom);

  const updateSimulationState = async (setting: ChartSetting) => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));

    try {
      await controller.update(setting, state.setting);
      setState((prev) => ({
        ...prev,
        setting,
        error: undefined,
        isLoading: false,
      }));
    } catch (e) {
      setState((prev) => ({
        ...prev,
        error: e as Error,
        isLoading: false,
      }));
    }
  };

  return {
    ...state,
    updateSimulationState,
  };
};
