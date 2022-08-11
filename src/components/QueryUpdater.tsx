import { useEffect } from "react";
import { useSimulationState } from "../hooks/simulationState";

const QueryUpdater = (): null => {
  const { setting } = useSimulationState();

  useEffect(() => {
    const settingSerialized = btoa(JSON.stringify(setting));
    const url = `${window.location.pathname}?setting=${settingSerialized}`;
    window.history.replaceState(null, "update setting", url);
  }, [setting]);

  return null;
};

export default QueryUpdater;
