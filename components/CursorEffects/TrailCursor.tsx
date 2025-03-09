"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import type { Trail } from "./types";

export const TrailCursor: React.FC = () => {
  const [trails, setTrails] = useState<Trail[]>([]);
  const maxTrails = 15;
  const trailLifespan = 100; // Controls how long each trail point lives
  const lastUpdateTimeRef = useRef<number>(0);
  const throttleInterval = 10; // Minimum ms between updates (adjust as needed)
  const rafRef = useRef<number | null>(null);

  const updateTrail = useCallback((e: MouseEvent) => {
    const currentTime = Date.now();

    // Throttle updates to reduce performance impact
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

      // Keep only trails within the lifespan and maintain maxTrails limit
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
      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Schedule the update on the next animation frame
      rafRef.current = requestAnimationFrame(() => {
        updateTrail(e);
        rafRef.current = null;
      });
    },
    [updateTrail]
  );

  useEffect(() => {
    // Pre-allocate DOM nodes to avoid layout thrashing
    const dummyTrails = Array(maxTrails)
      .fill(0)
      .map((_, i) => ({
        x: 0,
        y: 0,
        id: `dummy-${i}`,
      }));
    setTrails(dummyTrails);

    window.addEventListener("mousemove", smoothUpdateTrail, { passive: true });

    // Use a less frequent interval for cleanup
    const cleanup = setInterval(() => {
      const currentTime = Date.now();
      setTrails((prev) =>
        prev.filter((trail) => {
          // Keep dummy trails
          if (trail.id.startsWith("dummy-")) return true;

          const trailAge = currentTime - parseInt(trail.id.split("-")[0]);
          return trailAge < trailLifespan;
        })
      );
    }, 50);

    return () => {
      window.removeEventListener("mousemove", smoothUpdateTrail);
      clearInterval(cleanup);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [smoothUpdateTrail]);

  return (
    <>
      {trails.map((trail, index) => {
        // For dummy trails, make them invisible
        if (trail.id.startsWith("dummy-")) {
          return (
            <div
              key={trail.id}
              className="fixed rounded-full pointer-events-none opacity-0"
              style={{
                width: "8px",
                height: "8px",
                zIndex: 50,
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

        // Create a gradient color that changes based on index
        const hue = (220 + index * 10) % 360; // Blue to purple range
        const color = `hsl(${hue}, 70%, 60%)`;

        return (
          <div
            key={trail.id}
            className="fixed rounded-full pointer-events-none mix-blend-difference will-change-transform"
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
              zIndex: 50,
            }}
          />
        );
      })}
    </>
  );
};
