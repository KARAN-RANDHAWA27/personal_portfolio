"use client";
import React from "react";

interface LoaderProps {
  progress: number;
}

const Loader: React.FC<LoaderProps> = ({ progress }) => {
  // Format progress percentage
  const progressPercentage = Math.floor(progress * 100);

  // Determine phase based on progress
  const getPhase = (): number => {
    if (progress < 0.25) return 0;
    if (progress < 0.5) return 1;
    if (progress < 0.75) return 2;
    return 3;
  };

  // Static messages for each phase
  const messages = [
    "Initializing development environment...",
    "Compiling components...",
    "Connecting API endpoints...",
    "Finalizing optimization...",
  ];

  // Get current message based on phase
  const currentMessage = messages[getPhase()];

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-900 p-4">
      <div className="relative z-10 w-full max-w-md flex flex-col items-center justify-center">
        {/* Main loader circle */}
        <div className="relative mb-8">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full relative flex items-center justify-center">
            {/* Progress circle */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <defs>
                <linearGradient
                  id="loaderGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#a972ff" />
                  <stop offset="50%" stopColor="#43B9B9" />
                  <stop offset="100%" stopColor="#00EDAD" />
                </linearGradient>
              </defs>
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="#1C1C1C"
                strokeWidth="6"
              />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="url(#loaderGradient)"
                strokeWidth="6"
                strokeDasharray="calc(2 * 3.14159 * 45%)"
                strokeDashoffset={`calc(2 * 3.14159 * 45% * ${1 - progress})`}
                strokeLinecap="round"
                className="loader-glow"
              />
            </svg>

            {/* Inner content */}
            <div className="z-10 text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">
                {progressPercentage}
                <span className="text-lg md:text-xl">%</span>
              </div>
              <div className="text-xs text-teal-400 mt-1">LOADING</div>
            </div>
          </div>
        </div>

        {/* Loading status */}
        <div className="w-full px-4">
          <div className="flex justify-between mb-2">
            <div className="text-xs sm:text-sm text-gray-400">
              {currentMessage}
            </div>
            <div className="text-xs sm:text-sm text-teal-400">
              {progressPercentage}%
            </div>
          </div>

          <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${progressPercentage}%`,
                background:
                  "linear-gradient(to right, #a972ff, #43B9B9, #00EDAD)",
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Global styles for animations */}
      <style jsx>{`
        .loader-glow {
          filter: drop-shadow(0 0 4px rgba(67, 185, 185, 0.7));
        }
      `}</style>
    </div>
  );
};

export default Loader;
