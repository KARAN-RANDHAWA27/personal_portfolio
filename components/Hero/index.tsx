"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import InteractiveWeb from "../InteractiveWeb";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const [rotation, setRotation] = useState(0);
  const [isInHeroSection, setIsInHeroSection] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Set loaded state on component mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroRect = heroRef.current.getBoundingClientRect();
        const isInHero = heroRect.bottom > 0;
        setIsInHeroSection(isInHero);

        // Only rotate if we're still in hero section
        if (isInHero) {
          const scrollPercentage = Math.min(
            (Math.abs(heroRect.top) / (heroRect.height - window.innerHeight)) *
              4,
            1
          );
          setRotation(scrollPercentage * 360);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen bg-dark-900 text-white overflow-hidden"
    >
      {/* Background container with all background elements grouped */}
      <div
        className="absolute inset-0"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.3s ease-in",
        }}
      >
        {/* Star field background - matching AboutMe */}
        <div className="absolute inset-0">
          <StaticStarField />
        </div>

        {/* Constellation lines - matching AboutMe */}
        <div className="absolute inset-0">
          <StaticConstellationLines />
        </div>

        {/* Gradient background - simplified to avoid initial flashing */}
        <div
          className="absolute w-full h-full inset-0 opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(105, 56, 239, 0.2), rgba(0, 194, 255, 0.1), rgba(0, 237, 173, 0.05), rgba(255, 152, 0, 0.03), transparent)",
            transform: "scale(1.5)",
          }}
        />

        {/* Grid Pattern - matching AboutMe */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), 
                               linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        {/* Web animation layer - only animate after loaded */}
        <div className="absolute inset-0 opacity-60">
          <InteractiveWeb zIndex={1} backgroundColor="transparent" />
        </div>
      </div>

      {/* Content layer - no initial animation delays */}
      <div className="relative z-10">
        <div className="container mx-auto px-6 pt-48 lg:px-36">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 space-y-2">
              <span className="block text-secondary-400">Designing</span>
              <span className="block bg-clip-text text-transparent bg-ai-gradient">
                a Better
              </span>
              <span className="block text-accent-400">World Today</span>
            </h1>
            <p className="text-gray-400 mb-8 max-w-lg">
              Welcome to the world of endless imagination and boundless
              creativity. Together, let&apos;s embark on a remarkable journey
              where dreams become tangible realities.
            </p>
            <div className="flex flex-wrap md:flex-nowrap gap-4 md:space-x-6">
              <motion.a
                href="/Karan.pdf"
                download
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-full flex items-center transition-all duration-300 shadow-lg shadow-primary-500/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Download CV
                <svg
                  className="ml-2 w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </motion.a>
              <motion.button
                className="border border-gray-800 text-gray-300 hover:text-white hover:border-blue px-6 py-3 rounded-full flex items-center transition-colors duration-300"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(41, 151, 255, 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/projects")}
              >
                VIEW WORKS
                <svg
                  className="ml-2 w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Static particles instead of animated */}
      <StaticParticleEffect />

      {/* Scroll indicator */}
      {isInHeroSection && (
        <div
          className="absolute bottom-8 right-8 z-10 lg:px-32"
          onClick={scrollToAbout}
        >
          <div className="relative h-16 w-16 lg:w-40 lg:h-40 cursor-pointer group">
            {/* Rotating text */}
            <div
              className="absolute inset-0"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  id="textPath"
                  d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                  stroke="none"
                />
                <text className="text-[10px] fill-white">
                  <textPath href="#textPath" textLength="230">
                    SCROLL DOWN - SCROLL DOWN -
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Button circle and arrow */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              whileHover="hover"
            >
              <motion.div
                className="w-10 h-10 lg:w-24 lg:h-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  variants={{
                    hover: {
                      y: [0, 3, 0],
                      transition: {
                        duration: 1.5,
                        repeat: Infinity,
                      },
                    },
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </motion.svg>
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

// Static star field (no animations on initial load)
const StaticStarField: React.FC = () => {
  const stars = Array.from({ length: 100 }, (_, index) => ({
    id: index,
    size: Math.random() * 2 + 0.5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: Math.random() * 0.5 + 0.2,
  }));

  return (
    <div className="absolute inset-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
};

// Static constellation lines (no animations on initial load)
const StaticConstellationLines: React.FC = () => {
  // Generate some random constellation patterns
  const constellations = [
    // Triangle
    [
      { x: 15, y: 20 },
      { x: 25, y: 35 },
      { x: 5, y: 35 },
      { x: 15, y: 20 },
    ],
    // Square
    [
      { x: 70, y: 15 },
      { x: 85, y: 15 },
      { x: 85, y: 30 },
      { x: 70, y: 30 },
      { x: 70, y: 15 },
    ],
    // Custom shape 1
    [
      { x: 40, y: 60 },
      { x: 50, y: 50 },
      { x: 60, y: 65 },
      { x: 45, y: 75 },
      { x: 40, y: 60 },
    ],
    // Custom shape 2
    [
      { x: 80, y: 70 },
      { x: 90, y: 75 },
      { x: 85, y: 85 },
      { x: 75, y: 80 },
      { x: 80, y: 70 },
    ],
  ];

  return (
    <svg className="absolute inset-0 w-full h-full opacity-20">
      {constellations.map((constellation, idx) => (
        <g key={idx}>
          {/* Lines connecting stars */}
          <path
            d={`M ${constellation
              .map((point) => `${point.x} ${point.y}`)
              .join(" L ")}`}
            stroke="white"
            strokeWidth="0.5"
            fill="none"
            opacity="0.5"
          />

          {/* Star points */}
          {constellation.map((point, pointIdx) => (
            <circle
              key={pointIdx}
              cx={point.x}
              cy={point.y}
              r="1"
              fill="white"
              opacity="0.7"
            />
          ))}
        </g>
      ))}
    </svg>
  );
};

// Static particles (no animations on initial load)
const StaticParticleEffect: React.FC = () => {
  const particles = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white opacity-10"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
        />
      ))}
    </div>
  );
};

export default Hero;
