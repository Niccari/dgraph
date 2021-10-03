import { Controller } from "./modules/controller";
import { Drawer } from "./modules/drawer";
import { Simulator } from "./modules/simulator";
import { Snapshots } from "./modules/snapshots";
import { Visualizer } from "./modules/visualizer";
import { initialState } from "./redux/slice/simulationSlice";

const visualizer = new Visualizer();
const simulator = new Simulator();
const snapshots = new Snapshots(simulator, visualizer);
const drawer = new Drawer();
export const controller = new Controller(snapshots, drawer);

controller.update(initialState.setting);
