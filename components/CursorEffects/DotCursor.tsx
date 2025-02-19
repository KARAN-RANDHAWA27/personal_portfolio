import React, { useState, useEffect } from "react";
import { Position } from "./types";

export const DotCursor: React.FC = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent): void => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div
      className="fixed w-4 h-4 bg-orange-500 rounded-full pointer-events-none z-50 mix-blend-difference"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
        transition: "all 0.1s ease",
      }}
    />
  );
};
