import "./Canvas.css";
import React, { useEffect, useRef } from "react";
import controller from "../container";
import { useSimulationState } from "../hooks/simulationState";

const Canvas = (): React.ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setting } = useSimulationState();

  const adjustCanvasSize = (canvas: HTMLCanvasElement) => {
    // iOS Safari limitation: > 4096 x 4096 is not acceptable.
    const width = Math.min(1000 * window.devicePixelRatio, 4000);

    canvas.width = width;
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
