"use client";

import React, { useState, useEffect, useCallback } from "react";
import type { Trail } from "./types";

export const TrailCursor: React.FC = () => {
  const [trails, setTrails] = useState<Trail[]>([]);
  const maxTrails = 15;
  const trailLifespan = 100; // Controls how long each trail point lives

  const updateTrail = useCallback((e: MouseEvent) => {
    const currentTime = Date.now();

    setTrails((prevTrails) => {
      const newTrail: Trail = {
        x: e.clientX,
        y: e.clientY,
        id: `${currentTime}-${Math.random()}`,
      };

      // Keep only trails within the lifespan
      const updatedTrails = prevTrails
        .filter((trail) => {
          const trailAge = currentTime - parseInt(trail.id.split("-")[0]);
          return trailAge < trailLifespan;
        })
        .slice(0, maxTrails - 1);

      return [newTrail, ...updatedTrails];
    });
  }, []);

  const smoothUpdateTrail = useCallback(
    (e: MouseEvent) => {
      requestAnimationFrame(() => updateTrail(e));
    },
    [updateTrail]
  );

  useEffect(() => {
    window.addEventListener("mousemove", smoothUpdateTrail);

    // Cleanup old trail points based on lifespan
    const cleanup = setInterval(() => {
      const currentTime = Date.now();
      setTrails((prev) =>
        prev.filter((trail) => {
          const trailAge = currentTime - parseInt(trail.id.split("-")[0]);
          return trailAge < trailLifespan;
        })
      );
    }, 50);

    return () => {
      window.removeEventListener("mousemove", smoothUpdateTrail);
      clearInterval(cleanup);
    };
  }, [smoothUpdateTrail]);

  return (
    <>
      {trails.map((trail, index) => {
        const trailAge = Date.now() - parseInt(trail.id.split("-")[0]);
        const opacity = Math.max(
          0,
          1 - trailAge / trailLifespan - index / maxTrails
        );
        const scale = Math.max(0.5, 1 - index / maxTrails);

        return (
          <div
            key={trail.id}
            className="fixed rounded-full pointer-events-none mix-blend-difference"
            style={{
              left: `${trail.x}px`,
              top: `${trail.y}px`,
              transform: `translate(-50%, -50%) scale(${scale})`,
              width: "8px",
              height: "8px",
              backgroundColor: "#f97316",
              opacity,
              transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
              zIndex: 50,
            }}
          />
        );
      })}
    </>
  );
};
