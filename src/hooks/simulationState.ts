import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import controller from "../container";
import { ChartSetting, initialSetting } from "../models";

// eslint-disable-next-line import/prefer-default-export
export const useSimulationState = (): {
  setting: ChartSetting;
  error: Error | null;
  isLoading: boolean;
  updateSimulationState: (setting: ChartSetting) => void;
} => {
  const queryClient = useQueryClient();
  const nop = () => initialSetting;
  const { data, error, isLoading } = useQuery<ChartSetting, Error>(["simulationState"], nop, {
    initialData: initialSetting,
    cacheTime: Infinity,
    staleTime: 0,
  });

  const update = async (setting: ChartSetting, prevSetting?: ChartSetting): Promise<ChartSetting> => {
    controller.update(setting, prevSetting);
    return setting;
  };

  const { mutate } = useMutation((setting: ChartSetting) => update(setting, data), {
    onSuccess: (setting) => {
      queryClient.setQueryData<ChartSetting>(["simulationState"], setting);
    },
  });
  return { setting: data, error, isLoading, updateSimulationState: mutate };
};
