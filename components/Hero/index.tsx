"use client";

import React, { useEffect, useState, useRef } from "react";
import InteractiveWeb from "../InteractiveWeb";

const Hero = () => {
  const [rotation, setRotation] = useState(0);
  const [isInHeroSection, setIsInHeroSection] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

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
      className="relative min-h-screen bg-black text-white lg:px-36"
    >
      {/* Web animation layer */}
      <div className="absolute inset-0">
        <InteractiveWeb zIndex={1} backgroundColor="black" />
      </div>

      {/* Content layer */}
      <div className="relative z-10">
        <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>

        <div className="relative container mx-auto px-6 pt-48">
          <div className="max-w-2xl pointer-events-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 space-y-2">
              <span className="block">Designing</span>
              <span className="block">a Better</span>
              <span className="block">World Today</span>
            </h1>
            <p className="text-gray-400 mb-8 max-w-lg">
              Welcome to our world of endless imagination and boundless
              creativity. Together, let&apos;s embark on a remarkable journey
              where dreams become tangible realities.
            </p>
            <div className="flex space-x-6">
              <button className="bg-orange-500 hover:bg-orange-600 text-black px-6 py-3 rounded-full flex items-center transition-colors duration-300">
                WHAT WE DO
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
              </button>
              <button className="text-white hover:text-orange-500 px-6 py-3 rounded-full flex items-center transition-colors duration-300">
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
              </button>
            </div>
          </div>
        </div>
      </div>

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

            {/* Orange circle and arrow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 lg:w-24 lg:h-24 bg-orange-500 rounded-full flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                <svg
                  className="w-5 h-5 text-black transform transition-transform group-hover:translate-y-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
