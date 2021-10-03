import { CanvasContainer } from "./CanvasContainer";
import { SettingFormContainer } from "./SettingFormContainer";
import { QueryUpdateContainer } from "./QueryUpdateContainer";

export const RootContainer = (): JSX.Element => {
  return (
    <>
      <SettingFormContainer />
      <CanvasContainer />
      <QueryUpdateContainer />
    </>
  );
};
