"use client";

import React, { useState, useEffect, useRef, JSX, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Code,
  Target,
  Award,
  ExternalLink,
  Cpu,
} from "lucide-react";

// Define types
interface CareerItem {
  id: number;
  title: string;
  company: string;
  period: string;
  location: string;
  color: string;
  shadowColor: string;
  lightColor: string;
  iconBg: string;
  description: string;
  highlights: string[];
  technologies: string[];
  icon: JSX.Element;
  projectUrl: string;
}

interface AnimatedBgCircle {
  id: number;
  size: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  color: string;
}

const CareerSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number>(0);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [bgCircles, setBgCircles] = useState<AnimatedBgCircle[]>([]);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const animationRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const careerData = useMemo<CareerItem[]>(
    () => [
      {
        id: 0,
        title: "Frontend Developer",
        company: "BuidlerDao",
        period: "October, 2024 - Present",
        location: "Singapore",
        color: "#6938EF",
        shadowColor: "rgba(105, 56, 239, 0.5)",
        lightColor: "rgba(105, 56, 239, 0.15)",
        iconBg: "#6938EF",
        description:
          "Frontend software developer with experience working on 8 diverse projects. Proficient in multiple technologies, I specialize in creating intuitive and responsive user interfaces.",
        highlights: [
          "Developed and maintained frontend features for 8 diverse projects",
          "Utilized multiple technologies to deliver responsive, user-centric interfaces",
          "Collaborated with cross-functional teams to ensure seamless product delivery",
          "Optimized performance and user experience across various platforms",
        ],
        technologies: ["React", "TypeScript", "Node.js", "Next", "CI/CD", "JS"],
        icon: <Briefcase />,
        projectUrl: "#",
      },
      {
        id: 1,
        title: "Pandora Web Studios",
        company: "Full Stack Developer",
        period: "August, 2024 - October, 2024",
        location: "Kolkata, India",
        color: "#00C2FF",
        shadowColor: "rgba(0, 194, 255, 0.5)",
        lightColor: "rgba(0, 194, 255, 0.15)",
        iconBg: "#00C2FF",
        description:
          "Developed E-Commerce, service-based applications, and SaaS products, including CMS and E-Mail Marketing platforms. Implemented ML-based recommendation systems and optimized solutions using Next.js, Node.js, WordPress, and Django. Leveraged React Native to create cross-platform mobile applications.",
        highlights: [
          "Developed E-Commerce and service-based applications for diverse industries",
          "Built SaaS products, including CMS and E-Mail Marketing platforms",
          "Implemented ML-based recommendation systems to enhance user personalization",
          "Optimized web applications using Next.js, Node.js, WordPress, and Django",
          "Developed cross-platform mobile applications using React Native",
        ],
        technologies: [
          "Django",
          "JavaScript",
          "Python",
          "PostgreSQL",
          "My SQL",
          "Redis",
        ],
        icon: <Code />,
        projectUrl: "#",
      },
      {
        id: 2,
        title: "Full Stack Developer",
        company: "Web Idea Solutions LLP",
        period: "April, 2024 - July, 2024",
        location: "Kolkata, India",
        color: "#FF9800",
        shadowColor: "rgba(255, 140, 0, 0.6)",
        lightColor: "rgba(255, 165, 0, 0.1)",
        iconBg: "#00C2FF",
        description:
          "Developed and maintained web applications for educational, and travel sectors, focusing on security, performance optimization, and user experience.",
        highlights: [
          "Developed and maintained web applications for educational, and travel sectors",
          "Focused on security and performance optimization for sensitive client data",
          "Created user-friendly interfaces, ensuring seamless experiences across platforms",
          "Integrated third-party APIs and services to enhance functionality",
        ],
        technologies: [
          "Django",
          "JavaScript",
          "Python",
          "PostgreSQL",
          "My SQL",
          "Redis",
        ],
        icon: <Code />,
        projectUrl: "#",
      },
      {
        id: 3,
        title: "Full Stack Developer",
        company: "Raneso",
        period: "Feb, 2023 - March, 2024",
        location: "Ranchi, India",
        color: "#00EDAD",
        shadowColor: "rgba(0, 237, 173, 0.5)",
        lightColor: "rgba(0, 237, 173, 0.15)",
        iconBg: "#00EDAD",
        description:
          "Developed dynamic web applications by implementing Django authentication, RESTful APIs, and MySQL database management with custom SQL queries. Created WebSocket chat functionality, email notifications, and CSV data processing for enhanced user interaction and data handling.",
        highlights: [
          "Developed dynamic web applications using Django and custom SQL queries",
          "Implemented Django authentication and RESTful APIs for seamless user management",
          "Built WebSocket chat functionality for real-time communication",
          "Created email notifications to enhance user engagement",
          "Handled CSV data processing to manage large datasets efficiently",
        ],
        technologies: [
          "Django",
          "JavaScript",
          "Python",
          "PostgreSQL",
          "My SQL",
          "Web Socket",
        ],
        icon: <Target />,
        projectUrl: "#",
      },
      {
        id: 4,
        title: "Software Developer",
        company: "DND Furnaces",
        period: "July, 2020 - Aug, 2021",
        location: "Ranchi, India",
        color: "#F2416B",
        shadowColor: "rgba(242, 65, 107, 0.5)",
        lightColor: "rgba(242, 65, 107, 0.15)",
        iconBg: "#F2416B",
        description:
          "Developed dynamic web applications by implementing Django authentication, RESTful APIs, and MySQL database management with custom SQL queries. Created WebSocket chat functionality, email notifications, and CSV data processing for enhanced user interaction and data handling.",
        highlights: [
          "Developed dynamic web applications using Django and custom SQL queries",
          "Implemented Django authentication and RESTful APIs for seamless user management",
          "Built WebSocket chat functionality for real-time communication",
          "Created email notifications to enhance user engagement",
          "Handled CSV data processing to manage large datasets efficiently",
        ],
        technologies: [
          "Django",
          "JavaScript",
          "Python",
          "PostgreSQL",
          "My SQL",
          "Web Socket",
        ],
        icon: <Target />,
        projectUrl: "#",
      },
    ],
    []
  );

  // Initialize background animated circles
  useEffect(() => {
    const newCircles: AnimatedBgCircle[] = [];
    for (let i = 0; i < 8; i++) {
      newCircles.push({
        id: i,
        size: Math.random() * 300 + 200,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 15 + 20,
        color: careerData[i % careerData.length].color,
      });
    }
    setBgCircles(newCircles);
  }, []);

  // Auto-rotate through cards if not hovering
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % careerData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovering, careerData.length]);

  // Calculate the tallest content height and set it
  useEffect(() => {
    // Set initial min-height to avoid initial layout jump
    setContentHeight(600); // Default minimum height

    const calculateMaxHeight = () => {
      // Find tallest content
      let maxHeight = 0;
      careerData.forEach((_, index) => {
        // Create a dummy div with the content to measure its height
        const tempDiv = document.createElement("div");
        tempDiv.style.position = "absolute";
        tempDiv.style.visibility = "hidden";
        tempDiv.style.width = contentRef.current
          ? `${contentRef.current.clientWidth}px`
          : "100%";

        // Clone the content for this career item
        const content = document.createElement("div");
        content.innerHTML = `
          <h2>${careerData[index].title}</h2>
          <h3>${careerData[index].company}</h3>
          <p>${careerData[index].description}</p>
          <div>
            ${careerData[index].highlights
              .map((h) => `<div>${h}</div>`)
              .join("")}
          </div>
          <div>
            ${careerData[index].technologies
              .map((t) => `<span>${t}</span>`)
              .join("")}
          </div>
        `;

        tempDiv.appendChild(content);
        document.body.appendChild(tempDiv);

        // Measure and update max height if needed
        const height = tempDiv.clientHeight;
        if (height > maxHeight) maxHeight = height;

        // Clean up
        document.body.removeChild(tempDiv);
      });

      // Add some padding to the max height
      return Math.max(maxHeight + 50, 600); // Ensure minimum of 600px
    };

    // Update the content height after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setContentHeight(calculateMaxHeight());
    }, 500);

    return () => clearTimeout(timer);
  }, [careerData]);

  // Parallax effect on mouse move for background elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!animationRef.current) return;

      const { clientX, clientY } = e;
      const { width, height } = animationRef.current.getBoundingClientRect();

      // Calculate mouse position as percentage of container
      const x = (clientX / width - 0.5) * 2; // -1 to 1
      const y = (clientY / height - 0.5) * 2; // -1 to 1

      // Apply subtle movement to background elements
      const elements = document.querySelectorAll(".parallax-bg");
      elements.forEach((el, index) => {
        const depth = 0.05 + (index % 3) * 0.01;
        const moveX = x * depth * 40;
        const moveY = y * depth * 40;

        (
          el as HTMLElement
        ).style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div
      ref={animationRef}
      className="relative min-h-screen py-20 overflow-hidden bg-dark-900 text-white"
    >
      {/* Background Grid Effect */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="grid-background"></div>
      </div>

      {/* Animated flowing particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => {
          const size = Math.random() * 6 + 2;
          const speed = Math.random() * 30 + 30;
          const initialX = Math.random() * 100;
          const initialY = Math.random() * 100;
          const color = careerData[i % careerData.length].color;
          const opacity = Math.random() * 0.2 + 0.1;

          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                x: `${initialX}vw`,
                y: `${initialY}vh`,
                background: color,
                opacity: opacity,
                filter: `blur(${size / 3}px)`,
              }}
              animate={{
                y: [`${initialY}vh`, `${initialY - 50}vh`],
                opacity: [opacity, 0],
              }}
              transition={{
                duration: speed,
                repeat: Infinity,
                ease: "linear",
                delay: -speed * Math.random(),
              }}
            />
          );
        })}
      </div>

      {/* Animated Neon Circles - parallax effect */}
      {bgCircles.map((circle) => (
        <motion.div
          key={`circle-${circle.id}`}
          className="absolute rounded-full blur-3xl opacity-10 parallax-bg"
          style={{
            width: circle.size,
            height: circle.size,
            top: `${circle.y}%`,
            left: `${circle.x}%`,
            backgroundColor: circle.color,
          }}
          initial={{ scale: 0.9, opacity: 0.05 }}
          animate={{
            scale: [0.9, 1.1, 0.9],
            opacity: [0.05, 0.1, 0.05],
            x: [0, circle.id % 2 === 0 ? 30 : -30, 0],
            y: [0, circle.id % 3 === 0 ? -20 : 20, 0],
          }}
          transition={{
            duration: circle.duration,
            repeat: Infinity,
            delay: circle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 inline-block relative">
            <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 inline-block">
              Professional Journey
            </span>
            {/* <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-full"></span> */}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mt-4">
            Building digital experiences that transform ideas into reality
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Cards */}
          <motion.div
            className="lg:col-span-4 space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {careerData.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="relative cursor-pointer overflow-hidden"
                onClick={() => setActiveCard(index)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <motion.div
                  className={`p-5 rounded-xl border border-dark-700 relative z-10 transition-all duration-300 overflow-hidden ${
                    index === activeCard
                      ? "bg-dark-800 shadow-lg"
                      : "bg-dark-800/50 hover:bg-dark-800/80"
                  }`}
                  style={{
                    boxShadow:
                      index === activeCard
                        ? `0 0 25px ${item.shadowColor}`
                        : "none",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="p-3 rounded-lg"
                      style={{
                        backgroundColor: item.lightColor,
                        color: item.color,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-gray-400">{item.company}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.period}
                      </p>
                    </div>
                  </div>

                  {/* Highlight line when active */}
                  {index === activeCard && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 rounded-full"
                      style={{ backgroundColor: item.color }}
                      layoutId="activeIndicator"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                      }}
                    />
                  )}
                </motion.div>

                {/* Animated gradient border */}
                {index === activeCard && (
                  <div className="absolute inset-0 p-[1px] rounded-xl overflow-hidden z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-500 to-secondary-500 animate-spin-slow rounded-xl"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Content Panel with fixed height */}
          <div
            className="lg:col-span-8"
            ref={contentRef}
            style={{ height: `${contentHeight}px` }}
          >
            <AnimatedCareerCard data={careerData[activeCard]} />
          </div>
        </div>
      </div>

      {/* CSS for grid background */}
      <style jsx>{`
        .grid-background {
          width: 100%;
          height: 100%;
          background-size: 50px 50px;
          background-image: linear-gradient(
              to right,
              rgba(255, 255, 255, 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.05) 1px,
              transparent 1px
            );
          transform: perspective(1000px) rotateX(60deg) scale(2);
          transform-origin: center top;
        }

        .animate-spin-slow {
          animation: spin 15s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Custom Scrollbar Styles */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          border: 2px solid transparent;
          background-clip: padding-box;
          transition: background-color 0.2s ease;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
          border: 2px solid transparent;
          background-clip: padding-box;
        }

        /* Smooth scrolling for the entire card */
        .custom-scrollbar {
          scroll-behavior: smooth;
        }

        /* Hide scrollbar when not scrolling */
        .custom-scrollbar:not(:hover)::-webkit-scrollbar-thumb {
          background: transparent;
        }

        /* Show scrollbar on hover */
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
        }

        /* Optimize for touch devices */
        @media (hover: none) {
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
          }
        }
      `}</style>
    </div>
  );
};

interface AnimatedCareerCardProps {
  data: CareerItem;
}

const AnimatedCareerCard: React.FC<AnimatedCareerCardProps> = ({ data }) => {
  return (
    <motion.div
      key={data.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="relative rounded-2xl overflow-hidden h-full"
    >
      {/* Background elements */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: data.color }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-40 h-40 rounded-full blur-2xl opacity-10"
        style={{ backgroundColor: data.color }}
      ></div>

      {/* Card Content */}
      <div className="relative z-10 backdrop-blur-sm bg-dark-800/50 p-8 rounded-2xl border border-dark-700 h-full overflow-y-auto custom-scrollbar">
        <div className="space-y-6">
          <div className="mb-6">
            <div className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm mb-3">
              {data.period}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center">
              {data.title}
              {data.id === 0 && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="ml-3 text-sm px-2 py-1 rounded bg-primary-500/20 text-primary-300"
                >
                  Current
                </motion.span>
              )}
            </h2>
            <h3 className="text-xl text-gray-300 mb-2 flex items-center">
              {data.company}
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "auto" }}
                transition={{ delay: 0.5 }}
                className="overflow-hidden ml-3"
              >
                <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full border border-dark-600">
                  <Cpu className="w-3 h-3" /> Tech Company
                </span>
              </motion.span>
            </h3>
            <div className="flex items-center text-gray-400 text-sm mt-1">
              <svg
                className="w-3 h-3 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              {data.location}
            </div>
          </div>

          <p className="text-gray-300 mt-2 mb-6">{data.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-4"
            >
              <h4 className="font-semibold text-lg flex items-center gap-2">
                <Award className="w-5 h-5" style={{ color: data.color }} /> Key
                Achievements
              </h4>
              <ul className="space-y-3">
                {data.highlights.map((highlight, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                    className="flex items-start gap-2"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2"
                      style={{ backgroundColor: data.color }}
                    ></span>
                    <span className="text-gray-300">{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Code className="w-5 h-5" style={{ color: data.color }} /> Tech
                Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {data.technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: data.lightColor,
                      color: data.color,
                      boxShadow: `0 0 10px ${data.shadowColor}`,
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-auto pt-6 border-t border-dark-700"
          >
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                {[0, 1, 2].map((dot) => (
                  <div
                    key={dot}
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor:
                        data.id === dot
                          ? data.color
                          : "rgba(255, 255, 255, 0.2)",
                    }}
                  />
                ))}
              </div>

              <motion.a
                href={data.projectUrl}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-1 text-sm group"
                style={{ color: data.color }}
              >
                View Project Details
                <ExternalLink className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CareerSection;
