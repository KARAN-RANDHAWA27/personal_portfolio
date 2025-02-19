// components/CustomScrollbar.tsx
"use client";

import React, { useEffect, useState } from "react";

const CustomScrollbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(Math.min(scrolled, 100)); // Ensure it never exceeds 100%
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed right-0 top-0 bottom-0 w-0.5"
      style={{ zIndex: 1000 }}
    >
      {/* Background track */}
      <div className="absolute h-full w-full bg-neutral-900" />

      {/* Progress line */}
      <div
        className="absolute top-0 w-full bg-orange-500 origin-top"
        style={{
          height: `${scrollProgress}%`,
          transition: "height 50ms linear",
        }}
      />
    </div>
  );
};

export default CustomScrollbar;
