import { Formik } from "formik";
import { initialState, simulateAsync } from "../redux/slice/simulationSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import SettingFormContent from "./SettingFormContent";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const SettingForm: (props: Props) => JSX.Element = () => {
  const dispatch = useAppDispatch();
  const setting = useAppSelector((state) => state.simulation.setting);
  return (
    <Formik
      initialValues={initialState.setting}
      onSubmit={(submitedValues) => {
        dispatch(
          simulateAsync({
            setting: submitedValues,
            prevSetting: setting,
          })
        );
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
