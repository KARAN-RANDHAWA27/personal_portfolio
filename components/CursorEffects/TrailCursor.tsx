"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import type { Trail } from "./types";

export const TrailCursor: React.FC = () => {
  const [trails, setTrails] = useState<Trail[]>([]);
  const maxTrails = 12;
  const trailLifespan = 80;
  const lastUpdateTimeRef = useRef<number>(0);
  const throttleInterval = 16;
  const rafRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateTrail = useCallback((e: MouseEvent) => {
    const currentTime = Date.now();

    if (currentTime - lastUpdateTimeRef.current < throttleInterval) {
      return;
    }

    lastUpdateTimeRef.current = currentTime;

    setTrails((prevTrails) => {
      const newTrail: Trail = {
        x: e.clientX,
        y: e.clientY,
        id: `${currentTime}-${Math.random()}`,
      };

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
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        updateTrail(e);
        rafRef.current = null;
      });
    },
    [updateTrail]
  );

  useEffect(() => {
    const dummyTrails = Array(maxTrails)
      .fill(0)
      .map((_, i) => ({
        x: 0,
        y: 0,
        id: `dummy-${i}`,
      }));
    setTrails(dummyTrails);

    window.addEventListener("mousemove", smoothUpdateTrail, { passive: true });

    const cleanup = setInterval(() => {
      const currentTime = Date.now();
      setTrails((prev) =>
        prev.filter((trail) => {
          if (trail.id.startsWith("dummy-")) return true;
          const trailAge = currentTime - parseInt(trail.id.split("-")[0]);
          return trailAge < trailLifespan;
        })
      );
    }, 100);

    return () => {
      window.removeEventListener("mousemove", smoothUpdateTrail);
      clearInterval(cleanup);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [smoothUpdateTrail]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-50">
      {trails.map((trail, index) => {
        if (trail.id.startsWith("dummy-")) {
          return (
            <div
              key={trail.id}
              className="absolute rounded-full opacity-0"
              style={{
                width: "8px",
                height: "8px",
                transform: "translate(-50%, -50%)",
                willChange: "transform",
              }}
            />
          );
        }

        const trailAge = Date.now() - parseInt(trail.id.split("-")[0]);
        const opacity = Math.max(
          0,
          1 - trailAge / trailLifespan - index / maxTrails
        );
        const scale = Math.max(0.5, 1 - index / maxTrails);
        const hue = (220 + index * 10) % 360;
        const color = `hsl(${hue}, 70%, 60%)`;

        return (
          <div
            key={trail.id}
            className="absolute rounded-full mix-blend-difference will-change-transform"
            style={{
              left: `${trail.x}px`,
              top: `${trail.y}px`,
              transform: `translate(-50%, -50%) scale(${scale})`,
              width: "8px",
              height: "8px",
              backgroundColor: color,
              opacity,
              transition:
                index === 0
                  ? "none"
                  : "transform 0.15s ease-out, opacity 0.15s ease-out",
              willChange: "transform, opacity",
            }}
          />
        );
      })}
    </div>
  );
};
