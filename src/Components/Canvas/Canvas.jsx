import React, { useRef, useEffect } from "react";
import "./Canvas.scss";

function Canvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 1024;
    canvas.height = 576;

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    animate();
  });

  return <canvas ref={canvasRef}></canvas>;
}

export default Canvas;
