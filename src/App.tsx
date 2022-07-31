import "./App.css";
import Canvas from "./components/Canvas";
import QueryUpdater from "./components/QueryUpdater";
import SettingForm from "./components/SettingForm";

const App = (): JSX.Element => (
    <>
      <SettingForm />
      <Canvas />
      <QueryUpdater />
    </>
  );

export default App;
