import { atom, useAtom } from "jotai";
import { useTransition } from "react";
import controller from "../container";
import { ChartSetting, initialSetting } from "../models";

type SimulationState = {
  setting: ChartSetting;
  error?: Error;
};

const initialData: SimulationState = {
  setting: initialSetting,
  error: undefined,
};

const simulationStateAtom = atom<SimulationState>(initialData);

export const useSimulationState = () => {
  const [state, setState] = useAtom(simulationStateAtom);
  const [isPending, startTransition] = useTransition();

  const updateSimulationState = (setting: ChartSetting) => {
    startTransition(async () => {
      try {
        await controller.update(setting, state.setting);
        setState({
          setting,
          error: undefined,
        });
      } catch (e) {
        setState((prev) => ({
          ...prev,
          error: e as Error,
        }));
      }
    });
  };

  return {
    ...state,
    isLoading: isPending,
    updateSimulationState,
  };
};
