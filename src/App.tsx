import React from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import QueryUpdater from "./components/QueryUpdater";
import SettingForm from "./components/SettingForm";

const App = (): React.ReactElement => (
  <>
    <SettingForm />
    <Canvas />
    <QueryUpdater />
  </>
);

export default App;
