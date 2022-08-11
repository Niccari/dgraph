import { Field, Form, useFormikContext } from "formik";
import { ChartSetting, Coordinate } from "../models";
import { ColorPattern } from "../modules/colorGenerator/interface";
import StateMessage from "./StateMessage";
import "./SettingFormContent.css";
import { useSimulationState } from "../hooks/simulationState";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const SettingFormContent: (props: Props) => JSX.Element = () => {
  const { isLoading, error } = useSimulationState();
  const { values, handleChange, handleBlur, handleSubmit, isValid } = useFormikContext<ChartSetting>();

  return (
    <Form onSubmit={handleSubmit} className="SettingFormFrame">
      <div className="SettingFormItem">
        <label className="SettingFormText">
          f(x)=
          <Field
            type="text"
            name="equation"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.equation}
            placeholder="方程式を入れる"
            required
            className="SettingFormEquation"
          />
        </label>
        <StateMessage isLoading={isLoading} error={error} />
      </div>
      <div className="SettingFormItem">
        <label className="SettingFormText">
          色パターン
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
        </label>
      </div>
      <div className="SettingFormItem">
        <label className="SettingFormText">
          線の太さ
          <Field
            type="number"
            name="chartAppearance.thickness"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.chartAppearance.thickness}
          />
        </label>
      </div>
      <div className="SettingFormItem">
        <label className="SettingFormText">
          座標系
          <select name="coordinate" onChange={handleChange} onBlur={handleBlur} value={values.coordinate}>
            <option value={Coordinate.Ortho}>直交座標</option>
            <option value={Coordinate.Polar}>極座標</option>
          </select>
        </label>
      </div>
      <div className="SettingFormItem">
        <button type="submit" disabled={!isValid}>
          設定を更新する
        </button>
      </div>
    </Form>
  );
};

export default SettingFormContent;
