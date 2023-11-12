import { useQuery, useQueryClient } from "@tanstack/react-query";
import controller from "../container";
import { ChartSetting, initialSetting } from "../models";

type SimulationState = {
  setting: ChartSetting;
  error?: Error;
  isLoading: boolean;
};

const queryKey = "simulationState";

// eslint-disable-next-line import/prefer-default-export
export const useSimulationState = (): {
  setting: ChartSetting;
  error?: Error;
  isLoading: boolean;
  updateSimulationState: (setting: ChartSetting) => void;
} => {
  const queryClient = useQueryClient();
  const { data } = useQuery<SimulationState, Error>({
    queryKey: [queryKey],
    initialData: {
      setting: initialSetting,
      error: undefined,
      isLoading: false,
    },
    enabled: false,
  });

  const updateSimulationState = async (setting: ChartSetting) => {
    queryClient.setQueryData<SimulationState>([queryKey], {
      ...data,
      isLoading: true,
    });
    try {
      await controller.update(setting, data.setting);
      queryClient.setQueryData<SimulationState>([queryKey], {
        ...data,
        setting,
        error: undefined,
        isLoading: false,
      });
    } catch (e) {
      queryClient.setQueryData<SimulationState>([queryKey], {
        ...data,
        error: e as Error,
        isLoading: false,
      });
    }
  };
  return { ...data, updateSimulationState };
};
