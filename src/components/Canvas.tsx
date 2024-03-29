import "./Canvas.css";
import { useEffect, useRef } from "react";
import controller from "../container";
import { useSimulationState } from "../hooks/simulationState";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

const Canvas: React.FC<Props> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setting } = useSimulationState();

  const adjustCanvasSize = (canvas: HTMLCanvasElement) => {
    // iOS Safari limitation: > 4096 x 4096 is not acceptable.
    const width = Math.min(1000 * window.devicePixelRatio, 4000);

    // eslint-disable-next-line no-param-reassign
    canvas.width = width;
    // eslint-disable-next-line no-param-reassign
    canvas.height = width;
  };

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) {
      return;
    }
    adjustCanvasSize(canvas);
  }, []);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }
    controller.draw(context, setting, canvas.width, canvas.height);
  });

  return <canvas className="canvas" ref={canvasRef} />;
};

export default Canvas;
