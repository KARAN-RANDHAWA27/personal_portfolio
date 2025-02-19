import React, { useEffect, useState } from "react";

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
  });

  useEffect(() => {
    // Words appear sequence
    const timer1 = setTimeout(
      () => setAnimationState((prev) => ({ ...prev, pioneering: true })),
      500
    );
    const timer2 = setTimeout(
      () => setAnimationState((prev) => ({ ...prev, creative: true })),
      1300
    );
    const timer3 = setTimeout(
      () => setAnimationState((prev) => ({ ...prev, excellence: true })),
      2000
    );

    // Words disappear
    const timer4 = setTimeout(
      () => setAnimationState((prev) => ({ ...prev, wordsExit: true })),
      2500
    );

    // Box sequence
    const timer5 = setTimeout(
      () => setAnimationState((prev) => ({ ...prev, boxPhase: 1 })),
      3000
    ); // start growing
    const timer6 = setTimeout(
      () => setAnimationState((prev) => ({ ...prev, boxPhase: 2 })),
      3300
    ); // full width
    const timer7 = setTimeout(
      () => setAnimationState((prev) => ({ ...prev, showName: true })),
      3800
    ); // show name
    const timer8 = setTimeout(
      () => setAnimationState((prev) => ({ ...prev, boxPhase: 3 })),
      5000
    ); // start shrinking

    // Complete loading
    const completeTimer = setTimeout(() => {
      if (onLoadingComplete) onLoadingComplete();
    }, 6000);

    return () => {
      [
        timer1,
        timer2,
        timer3,
        timer4,
        timer5,
        timer6,
        timer7,
        timer8,
        completeTimer,
      ].forEach(clearTimeout);
    };
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
      <div
        className={`absolute text-white text-4xl md:text-6xl flex flex-wrap justify-center items-center gap-x-4
        transition-all duration-700 transform
        ${
          animationState.wordsExit
            ? "opacity-0 -translate-y-full"
            : "opacity-100 translate-y-0"
        }`}
      >
        <span
          className={`transition-all duration-700 transform
            ${
              animationState.pioneering
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
        >
          Visualize
        </span>
        <span
          className={`font-bold transition-all duration-700 transform text-purple
            ${
              animationState.creative
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
        >
          Design
        </span>
        <span
          className={`transition-all duration-700 transform
            ${
              animationState.excellence
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
        >
          Develop
        </span>
      </div>

      {/* Box and Name Container */}
      <div className="absolute w-64 h-16 flex items-center justify-center">
        {/* Animated Box */}
        <div
          className={`absolute inset-0 transition-all duration-700 ease-out transform origin-left ${getBoxStyles()}`}
        >
          <div className="bg-ai-gradient h-full w-full rounded" />
        </div>

        {/* Name */}
        <span
          className={`z-10 text-black text-2xl md:text-3xl font-medium whitespace-nowrap transition-all duration-500 transform
            ${
              animationState.showName
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }
            ${animationState.boxPhase === 3 ? "text-teal" : "text-black"}`}
        >
          Karan Randhawa
        </span>
      </div>
    </div>
  );
};

export default Preloader;
