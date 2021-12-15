import "./Canvas.css";
import { useEffect, useRef } from "react";

interface Props {
  onDraw: (context: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => void;
}

const Canvas: React.FC<Props> = ({ onDraw }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    onDraw(context, canvas.width, canvas.height);
  });

  return <canvas className="canvas" ref={canvasRef} />;
};

export default Canvas;
