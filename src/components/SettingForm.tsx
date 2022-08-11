import { Formik } from "formik";
import { useSimulationState } from "../hooks/simulationState";
import { initialSetting } from "../models";
import SettingFormContent from "./SettingFormContent";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const SettingForm: (props: Props) => JSX.Element = () => {
  const { updateSimulationState } = useSimulationState();

  return (
    <Formik
      initialValues={initialSetting}
      onSubmit={(submitedValues) => {
        updateSimulationState(submitedValues);
      }}
      validate={(validatingValues) => {
        const errors: { equation?: string } = {};
        const { equation, chartAppearance } = validatingValues;
        if (equation.length === 0) {
          errors.equation = "式を入れてください";
        }
        if (chartAppearance.thickness <= 0) {
          errors.equation = "線の太さは0以上にしてください";
        }
        return errors;
      }}
    >
      <SettingFormContent />
    </Formik>
  );
};

export default SettingForm;
