import { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";

const QueryUpdater = (): null => {
  const setting = useAppSelector((state) => state.simulation.setting);

  useEffect(() => {
    const settingSerialized = btoa(JSON.stringify(setting));
    const url = `${window.location.pathname}?setting=${settingSerialized}`;
    window.history.replaceState(null, "update setting", url);
  }, [setting]);

  return null;
};

export default QueryUpdater;
