import { Field, Form, Formik } from "formik";
import { ChartSetting, Coordinate } from "../models";
import { ColorPattern } from "../modules/colorGenerator/interface";
import { initialState, SimulatingState } from "../redux/slice/simulationSlice";
import { StateMessage } from "./StateMessage";
import "./SettingForm.css";

interface Props {
  onSettingUpdate(newSetting: ChartSetting): void;
  simulatingState: SimulatingState;
}

export const SettingForm: (props: Props) => JSX.Element = ({ onSettingUpdate, simulatingState }) => {
  return (
    <Formik
      initialValues={initialState.setting}
      onSubmit={(values) => {
        onSettingUpdate(values);
      }}
      validate={(values) => {
        const errors: { equation?: string } = {};
        if (values.equation.length === 0) {
          errors.equation = "式を入れてください";
        }
        if (values.chartAppearance.thickness <= 0) {
          errors.equation = "線の太さは0以上にしてください";
        }
        return errors;
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isValid }) => (
        <Form onSubmit={handleSubmit} className="SettingFormFrame">
          <div className="SettingFormItem">
            <label className="SettingFormText">f(x)=</label>
            <Field
              type="text"
              name="equation"
              on
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.equation}
              placeholder="方程式を入れる"
              required={true}
              className="SettingFormEquation"
            ></Field>
            <StateMessage simulatingState={simulatingState} />
          </div>
          <div className="SettingFormItem">
            <label className="SettingFormText">色パターン</label>
            <select
              name="chartAppearance.draw.pattern"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.chartAppearance.draw.pattern}
            >
              <option value={ColorPattern.Rainbow}>虹</option>
              <option value={ColorPattern.Fire}>炎</option>
              <option value={ColorPattern.Green}>木漏れ日</option>
              <option value={ColorPattern.Ice}>氷結</option>
              <option value={ColorPattern.Heat}>熱</option>
              <option value={ColorPattern.Monochrome}>モノクロ</option>
              <option value={ColorPattern.Pastel}>パステル</option>
            </select>
          </div>
          <div className="SettingFormItem">
            <label className="SettingFormText">線の太さ</label>
            <Field
              type="number"
              name="chartAppearance.thickness"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.chartAppearance.thickness}
            ></Field>
          </div>
          <div className="SettingFormItem">
            <label className="SettingFormText">座標系</label>
            <select name="coordinate" onChange={handleChange} onBlur={handleBlur} value={values.coordinate}>
              <option value={Coordinate.Ortho}>直交座標</option>
              <option value={Coordinate.Polar}>極座標</option>
            </select>
          </div>
          <div className="SettingFormItem">
            <button type="submit" disabled={!isValid}>
              設定を更新する
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
