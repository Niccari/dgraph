import Canvas from "../components/Canvas";
import controller from "../container";
import { useAppSelector } from "../redux/hooks";

const CanvasContainer = (): JSX.Element => {
  const setting = useAppSelector((state) => state.simulation.setting);

  const onDraw = (context: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => {
    controller.draw(context, setting, canvasWidth, canvasHeight);
  };
  return <Canvas onDraw={onDraw} />;
};

export default CanvasContainer;
