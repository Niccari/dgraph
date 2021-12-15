import { initialSetting } from "./models";
import Controller from "./modules/controller";
import Drawer from "./modules/drawer";
import Simulator from "./modules/simulator";
import Snapshots from "./modules/snapshots";
import Visualizer from "./modules/visualizer";

const visualizer = new Visualizer();
const simulator = new Simulator();
const snapshots = new Snapshots(simulator, visualizer);
const drawer = new Drawer();
const controller = new Controller(snapshots, drawer, initialSetting);

export default controller;
