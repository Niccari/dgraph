import { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";

export const QueryUpdateContainer = (): JSX.Element => {
  const setting = useAppSelector((state) => state.simulation.setting);

  useEffect(() => {
    const settingSerialized = btoa(JSON.stringify(setting));
    const url = window.location.pathname + "?setting=" + settingSerialized;
    window.history.replaceState(null, "update setting", url);
  });

  return <></>;
};
