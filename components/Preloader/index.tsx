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

  useEffect(() => {
    // Create stars initially
    if (moonRef.current) {
      createStars(moonRef.current);
    }

    // Moon and stars appear first
    const timer0 = setTimeout(
      () => setAnimationState((prev) => ({ ...prev, moonPhase: 1 })),
      200
    );

    // Words appear sequence
    const timer1 = setTimeout(
      () =>
        setAnimationState((prev) => ({
          ...prev,
          pioneering: true,
          moonPhase: 2,
        })),
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
      () =>
        setAnimationState((prev) => ({
          ...prev,
          showName: true,
          moonPhase: 3,
        })),
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
        timer0,
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

  // Function to create stars
  const createStars = (container: HTMLDivElement): void => {
    const starCount = 200;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      const size = Math.random() * 2;

      star.className = "absolute rounded-full";
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.backgroundColor = i % 20 === 0 ? "#E0E0FF" : "#FFFFFF";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.opacity = `${Math.random() * 0.8 + 0.2}`;
      star.style.animation = `twinkle ${
        Math.random() * 5 + 3
      }s infinite ease-in-out`;

      fragment.appendChild(star);
    }

    container.appendChild(fragment);
  };

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
      {/* Moon Background */}
      <div ref={moonRef} className="absolute inset-0 overflow-hidden">
        {/* Stars are added via JavaScript */}
        <div
          className={`absolute w-full h-full transition-all duration-1500 ease-out transform ${
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
        transition-all duration-700 transform z-10
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

      <div className="absolute w-64 h-16 flex items-center justify-center z-20">
        <div
          className={`absolute inset-0 transition-all duration-700 ease-out transform origin-left ${getBoxStyles()}`}
        >
          <div className="h-full w-full rounded backdrop-blur-sm bg-dark-800 border border-purple/30">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/40 to-secondary-900/40 rounded"></div>

            {/* Glowing accent */}
            <div
              className="absolute inset-0 rounded opacity-20"
              style={{
                boxShadow: "inset 0 0 15px #a972ff, 0 0 5px #43B9B9",
                animation: "pulse 3s infinite ease-in-out",
              }}
            ></div>
          </div>
        </div>

        <span
          className={`z-30 text-2xl md:text-3xl font-medium whitespace-nowrap transition-all duration-500 transform
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

        @keyframes slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
