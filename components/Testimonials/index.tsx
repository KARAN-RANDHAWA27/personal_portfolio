"use client";
import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { Quote, ArrowLeft, ArrowRight, Star, User } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  image?: string;
  rating: number;
  featured?: boolean;
}

interface TestimonialSectionProps {
  testimonials?: Testimonial[];
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  testimonials = defaultTestimonials,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right, 0 for initial
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  //   const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [1, -1]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative">
      {/* Negative margin overlap to create seamless transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10"></div>

      <motion.div
        ref={containerRef}
        className="relative min-h-screen py-24 overflow-hidden"
        style={{
          background: "black",
        }}
        onMouseMove={handleMouseMove}
      >
        {/* Star field background */}
        <div className="absolute inset-0 z-0">
          <StarField />
        </div>

        {/* Constellation lines */}
        <div className="absolute inset-0 z-0">
          <ConstellationLines />
        </div>

        {/* Vibrant animated gradient background */}
        <motion.div
          className="absolute w-full h-full inset-0 z-0 opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(105, 56, 239, 0.3), rgba(0, 194, 255, 0.2), rgba(0, 237, 173, 0.1), transparent)",
            scale: 1.5,
            rotate,
          }}
        />

        {/* Enhanced cursor gradient */}
        <motion.div
          className="absolute w-96 h-96 rounded-full filter blur-3xl opacity-20 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle, rgba(105, 56, 239, 0.8), rgba(0, 194, 255, 0.4), transparent 70%)",
            x: mouseX,
            y: mouseY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />

        {/* Floating orbs */}
        <FloatingOrbs />

        {/* Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), 
                               linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 inline-block">
                Client Testimonials
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Hear what others have to say about my work and collaboration
            </p>
          </motion.div>

          {/* Testimonials Carousel */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Giant animated quote mark */}
              <motion.div
                className="absolute z-0 text-gray-800 opacity-20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 0.1,
                  scale: 1,
                  y: [0, -10, 0, 10, 0],
                }}
                transition={{
                  opacity: { duration: 0.8 },
                  scale: { duration: 0.8 },
                  y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                }}
                style={{
                  top: "-40px",
                  left: "-40px",
                  fontSize: "240px",
                }}
              >
                &quot;
              </motion.div>

              {/* Testimonial Card */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentTestimonial}
                  initial={{
                    opacity: 0,
                    x: direction === 0 ? 0 : direction === 1 ? 300 : -300,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{
                    opacity: 0,
                    x: direction === 1 ? -300 : 300,
                    transition: { duration: 0.3 },
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="relative backdrop-blur-sm bg-gray-900/40 rounded-2xl p-8 md:p-10 border border-gray-800 overflow-hidden shadow-xl"
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 -z-10 opacity-30"
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(105, 56, 239, 0)",
                        "0 0 20px rgba(105, 56, 239, 0.3)",
                        "0 0 0px rgba(105, 56, 239, 0)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  {/* Featured badge */}
                  {testimonials[currentTestimonial].featured && (
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-500/30 border border-primary-500/50 text-xs font-medium text-primary-300 mb-4">
                      <Star size={12} />
                      <span>Featured Testimonial</span>
                    </div>
                  )}

                  {/* Testimonial text */}
                  <div className="mb-6">
                    <div className="relative">
                      <Quote
                        size={24}
                        className="absolute -left-2 -top-2 text-primary-500 opacity-40"
                      />
                      <motion.p
                        className="text-white text-lg md:text-xl leading-relaxed pl-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {testimonials[currentTestimonial].content}
                      </motion.p>
                    </div>

                    {/* Star rating */}
                    <div className="flex mt-6 pl-6">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity:
                              i < testimonials[currentTestimonial].rating
                                ? 1
                                : 0.3,
                            scale: 1,
                            color:
                              i < testimonials[currentTestimonial].rating
                                ? "#FFD700"
                                : "#4B5563",
                          }}
                          transition={{ duration: 0.2, delay: 0.3 + i * 0.1 }}
                        >
                          <Star
                            size={18}
                            fill={
                              i < testimonials[currentTestimonial].rating
                                ? "#FFD700"
                                : "none"
                            }
                            color={
                              i < testimonials[currentTestimonial].rating
                                ? "#FFD700"
                                : "#4B5563"
                            }
                            className="mr-1"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Client info */}
                  <div className="flex items-center">
                    <div className="mr-4">
                      {testimonials[currentTestimonial].image ? (
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-500/30">
                          <img
                            src={testimonials[currentTestimonial].image}
                            alt={testimonials[currentTestimonial].name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500/30 to-secondary-500/30 flex items-center justify-center border-2 border-primary-500/30">
                          <User size={24} className="text-white opacity-70" />
                        </div>
                      )}
                    </div>

                    <div>
                      <motion.h4
                        className="text-lg font-semibold text-white"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                      >
                        {testimonials[currentTestimonial].name}
                      </motion.h4>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                      >
                        <p className="text-gray-400 text-sm">
                          {testimonials[currentTestimonial].role} at
                          <span className="text-primary-400 ml-1">
                            {testimonials[currentTestimonial].company}
                          </span>
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation buttons */}
              <div className="flex justify-between mt-8">
                <motion.button
                  className="w-12 h-12 rounded-full bg-gray-900/60 border border-gray-700 flex items-center justify-center text-gray-300 hover:text-white hover:border-primary-500 transition-colors"
                  onClick={prevTestimonial}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(105, 56, 239, 0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft size={20} />
                </motion.button>

                {/* Pagination indicators */}
                <div className="flex items-center gap-2">
                  {testimonials.map((_, index) => (
                    <motion.button
                      key={index}
                      className={`w-2.5 h-2.5 rounded-full ${
                        index === currentTestimonial
                          ? "bg-primary-500"
                          : "bg-gray-700 hover:bg-gray-600"
                      }`}
                      onClick={() => {
                        setDirection(index > currentTestimonial ? 1 : -1);
                        setCurrentTestimonial(index);
                      }}
                      whileHover={{ scale: 1.5 }}
                      whileTap={{ scale: 0.9 }}
                      animate={
                        index === currentTestimonial
                          ? {
                              scale: [1, 1.2, 1],
                            }
                          : {}
                      }
                      transition={
                        index === currentTestimonial
                          ? {
                              duration: 1.5,
                              repeat: Infinity,
                              repeatType: "reverse",
                            }
                          : {}
                      }
                    />
                  ))}
                </div>

                <motion.button
                  className="w-12 h-12 rounded-full bg-gray-900/60 border border-gray-700 flex items-center justify-center text-gray-300 hover:text-white hover:border-primary-500 transition-colors"
                  onClick={nextTestimonial}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(105, 56, 239, 0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowRight size={20} />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-20"
          >
            <p className="text-gray-300 mb-6">
              Would you like to share your experience working with me?
            </p>
            <motion.button
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full text-white font-medium shadow-lg shadow-primary-500/20"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(105, 56, 239, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Leave a Testimonial</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Enhanced animated particles */}
        <EnhancedParticleEffect />
      </motion.div>

      {/* Gradient to next section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
    </div>
  );
};

// Star field effect
const StarField: React.FC = () => {
  const stars = Array.from({ length: 150 }, (_, index) => ({
    id: index,
    size: Math.random() * 2.5 + 0.5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: Math.random() * 0.7 + 0.3,
    blinkDuration: Math.random() * 4 + 2,
  }));

  return (
    <div className="absolute inset-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
            boxShadow:
              star.size > 1.8
                ? `0 0 ${star.size * 3}px rgba(255, 255, 255, 0.7)`
                : "none",
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 1.5, star.opacity],
          }}
          transition={{
            duration: star.blinkDuration,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};

// Constellation lines
const ConstellationLines: React.FC = () => {
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
    <svg className="absolute inset-0 w-full h-full opacity-30">
      {constellations.map((constellation, idx) => (
        <g key={idx}>
          {/* Lines connecting stars */}
          <motion.path
            d={`M ${constellation
              .map((point) => `${point.x} ${point.y}`)
              .join(" L ")}`}
            stroke="white"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          {/* Star points */}
          {constellation.map((point, pointIdx) => (
            <motion.circle
              key={pointIdx}
              cx={point.x}
              cy={point.y}
              r="1.5"
              fill="white"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: [0.7, 1, 0.7], r: [1.5, 2, 1.5] }}
              transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
            />
          ))}
        </g>
      ))}
    </svg>
  );
};

// Enhanced animated particles
const EnhancedParticleEffect: React.FC = () => {
  const particles = Array.from({ length: 30 }, (_, index) => ({
    id: index,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 8,
    color:
      index % 5 === 0
        ? "#6938EF"
        : index % 5 === 1
        ? "#00C2FF"
        : index % 5 === 2
        ? "#00EDAD"
        : "white",
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
          }}
          animate={{
            y: [0, -150, 0],
            opacity: [0, 0.5, 0],
            boxShadow: [
              "0 0 0px rgba(255,255,255,0)",
              "0 0 8px rgba(255,255,255,0.5)",
              "0 0 0px rgba(255,255,255,0)",
            ],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

// Floating colorful orbs
const FloatingOrbs: React.FC = () => {
  const orbs = [
    { x: "15%", y: "20%", size: 180, color: "rgba(105, 56, 239, 0.1)" },
    { x: "80%", y: "65%", size: 220, color: "rgba(0, 194, 255, 0.08)" },
    { x: "45%", y: "30%", size: 200, color: "rgba(0, 237, 173, 0.07)" },
    { x: "75%", y: "15%", size: 150, color: "rgba(255, 184, 0, 0.06)" },
    { x: "30%", y: "80%", size: 170, color: "rgba(255, 107, 107, 0.05)" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-2xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            backgroundColor: orb.color,
          }}
          animate={{
            x: [0, 20, 0, -20, 0],
            y: [0, -20, 0, 20, 0],
            scale: [1, 1.1, 1, 0.9, 1],
          }}
          transition={{
            duration: 15 + index * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Sample testimonial data
const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechVision Inc.",
    content:
      "Working with this developer was a game-changer for our project. Their attention to detail and ability to translate our requirements into elegant solutions exceeded expectations. They didn't just build what we asked for – they improved upon our ideas with thoughtful suggestions that made the final product even better.",
    rating: 5,
    featured: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Startup Founder",
    company: "InnoLaunch",
    content:
      "I hired this developer to build our MVP, and they delivered far beyond what I expected. Not only was the code clean and well-structured, but they also took the time to explain their decisions and train our internal team. Their work directly contributed to securing our seed funding round.",
    rating: 5,
    featured: false,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Creative Director",
    company: "DesignForward",
    content:
      "As someone with an eye for design but limited technical knowledge, I was worried about finding a developer who could bring my vision to life. They bridged that gap perfectly, asking insightful questions and proposing technical solutions that enhanced the user experience while maintaining the creative integrity of the project.",
    rating: 4,
    featured: false,
  },
  {
    id: 4,
    name: "David Thompson",
    role: "CTO",
    company: "EnterpriseFlow",
    content:
      "We needed someone who could jump into our complex codebase and make meaningful contributions quickly. Not only did they adapt to our tech stack with impressive speed, but they also identified and fixed several performance bottlenecks that had been plaguing our application for months. Highly technical and a great communicator.",
    rating: 5,
    featured: false,
  },
  {
    id: 5,
    name: "Jessica Williams",
    role: "Marketing Director",
    company: "GrowthHackers",
    content:
      "The dashboard this developer created for our marketing team has transformed how we analyze and act on data. They took the time to understand our unique needs and created an intuitive interface that even our non-technical team members can use with ease. The automated reporting features alone have saved us countless hours each month.",
    rating: 5,
    featured: true,
  },
];

export default TestimonialSection;
