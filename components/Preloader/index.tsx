import React, { useEffect, useState, useRef } from "react";

interface PreloaderProps {
  onLoadingComplete?: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onLoadingComplete }) => {
  const [animationState, setAnimationState] = useState({
    pioneering: false,
    creative: false,
    excellence: false,
    wordsExit: false,
    boxPhase: 0, // 0: hidden, 1: growing, 2: full, 3: shrinking
    showName: false,
    moonPhase: 0, // 0: hidden, 1: appearing, 2: full, 3: subtle
  });

  const moonRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create stars with reduced count and optimized DOM operations
    if (moonRef.current && !starsRef.current) {
      const starCount = 150; // Reduced from 200
      const fragment = document.createDocumentFragment();
      const starsContainer = document.createElement("div");
      starsContainer.className = "absolute inset-0";
      starsContainer.style.willChange = "transform";

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        const size = Math.random() * 1.5; // Reduced from 2

        star.className = "absolute rounded-full";
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.backgroundColor = i % 20 === 0 ? "#E0E0FF" : "#FFFFFF";
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.opacity = `${Math.random() * 0.6 + 0.2}`; // Reduced opacity range
        star.style.animation = `twinkle ${
          Math.random() * 4 + 3
        }s infinite ease-in-out`;
        star.style.willChange = "opacity";

        fragment.appendChild(star);
      }

      starsContainer.appendChild(fragment);
      moonRef.current.appendChild(starsContainer);
      starsRef.current = starsContainer;
    }

    // Optimized animation sequence
    const timers = [
      setTimeout(
        () => setAnimationState((prev) => ({ ...prev, moonPhase: 1 })),
        300
      ),
      setTimeout(
        () =>
          setAnimationState((prev) => ({
            ...prev,
            pioneering: true,
            moonPhase: 2,
          })),
        500
      ),
      setTimeout(
        () => setAnimationState((prev) => ({ ...prev, creative: true })),
        900
      ),
      setTimeout(
        () => setAnimationState((prev) => ({ ...prev, excellence: true })),
        1300
      ),
      setTimeout(
        () => setAnimationState((prev) => ({ ...prev, wordsExit: true })),
        1800
      ),
      setTimeout(
        () => setAnimationState((prev) => ({ ...prev, boxPhase: 1 })),
        2200
      ),
      setTimeout(
        () => setAnimationState((prev) => ({ ...prev, boxPhase: 2 })),
        2600
      ),
      setTimeout(
        () =>
          setAnimationState((prev) => ({
            ...prev,
            showName: true,
            moonPhase: 3,
          })),
        3000
      ),
      setTimeout(
        () => setAnimationState((prev) => ({ ...prev, boxPhase: 3 })),
        4500
      ),
      setTimeout(() => onLoadingComplete?.(), 5100),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onLoadingComplete]);

  const getBoxStyles = () => {
    switch (animationState.boxPhase) {
      case 0:
        return "w-0 opacity-0";
      case 1:
        return "w-64 opacity-100";
      case 2:
        return "w-64 opacity-100";
      case 3:
        return "w-0 opacity-0 transition-all duration-700 ease-out transform origin-left";
      default:
        return "w-0 opacity-0";
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      <div ref={moonRef} className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute w-full h-full transition-all duration-1500 ease-out transform will-change-opacity ${
            animationState.moonPhase > 0 ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,0,20,0.2) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.9) 100%)",
          }}
        />
      </div>

      <div
        className={`absolute text-white text-4xl md:text-6xl flex flex-wrap justify-center items-center gap-x-4
        transition-all duration-700 transform z-10 will-change-transform,opacity
        ${
          animationState.wordsExit
            ? "opacity-0 -translate-y-full"
            : "opacity-100 translate-y-0"
        }`}
      >
        <span
          className={`transition-all duration-700 transform will-change-transform,opacity
            ${
              animationState.pioneering
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
        >
          Visualize
        </span>
        <span
          className={`font-bold transition-all duration-700 transform text-purple will-change-transform,opacity
            ${
              animationState.creative
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
        >
          Design
        </span>
        <span
          className={`transition-all duration-700 transform will-change-transform,opacity
            ${
              animationState.excellence
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
        >
          Develop
        </span>
      </div>

      <div className="absolute w-64 h-16 flex items-center justify-center z-20">
        <div
          className={`absolute inset-0 transition-all duration-700 ease-out transform origin-left will-change-transform,opacity ${getBoxStyles()}`}
        >
          <div className="h-full w-full rounded backdrop-blur-sm bg-dark-800 border border-purple/30">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/40 to-secondary-900/40 rounded"></div>
            <div
              className="absolute inset-0 rounded opacity-20"
              style={{
                boxShadow: "inset 0 0 15px #a972ff, 0 0 5px #43B9B9",
                animation: "pulse 3s infinite ease-in-out",
                willChange: "opacity",
              }}
            ></div>
          </div>
        </div>

        <span
          className={`z-30 text-2xl md:text-3xl font-medium whitespace-nowrap transition-all duration-500 transform will-change-transform,opacity
            ${
              animationState.showName
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }
            ${animationState.boxPhase === 3 ? "text-teal" : "text-white"}`}
        >
          Karan Randhawa
        </span>
      </div>

      <style jsx global>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
