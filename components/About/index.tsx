import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  Code,
  Briefcase,
  User,
  Star,
  Heart,
  Coffee,
  Zap,
  Link,
  ExternalLink,
} from "lucide-react";

interface Skill {
  name: string;
  level: number;
  color: string;
  icon: React.ReactNode;
}

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface AboutMeProps {
  name?: string;
  title?: string;
  bio?: string;
}

const AboutMe: React.FC<AboutMeProps> = ({
  name = "Alex Johnson",
  title = "Full Stack Developer & AI Enthusiast",
  bio = "Passionate developer with 6+ years of experience creating beautiful, functional applications. I specialize in React, TypeScript, and Node.js with a strong interest in AI and machine learning technologies.",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.9, 1],
    [0.8, 1, 1, 0.9]
  );
  const rotate = useTransform(scrollYProgress, [0, 1], [1, -1]);

  const springConfig = { stiffness: 100, damping: 30, bounce: 0 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleScroll = () => {
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        setIsInView(isVisible);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Skills data with progress bars
  const skills: Skill[] = [
    {
      name: "Frontend Development",
      level: 90,
      color: "#6938EF",
      icon: <Code size={18} />,
    },
    {
      name: "Backend Systems",
      level: 85,
      color: "#00C2FF",
      icon: <Briefcase size={18} />,
    },
    {
      name: "UI/UX Design",
      level: 75,
      color: "#00EDAD",
      icon: <User size={18} />,
    },
    {
      name: "AI & Machine Learning",
      level: 70,
      color: "#FFB800",
      icon: <Star size={18} />,
    },
  ];

  // Social media links
  const socialLinks: SocialLink[] = [
    { name: "GitHub", url: "https://github.com", icon: <Code size={16} /> },
    {
      name: "LinkedIn",
      url: "https://linkedin.com",
      icon: <Briefcase size={16} />,
    },
    {
      name: "Portfolio",
      url: "https://portfolio.com",
      icon: <Link size={16} />,
    },
    {
      name: "Twitter",
      url: "https://twitter.com",
      icon: <ExternalLink size={16} />,
    },
  ];

  // Fun facts
  const facts = [
    {
      icon: <Coffee size={16} className="text-yellow" />,
      text: "Fueled by 965 cups of coffee",
      color: "#FFA500",
    },
    {
      icon: <Zap size={16} className="text-green-400" />,
      text: "Shipped 42 projects",
      color: "#00EDAD",
    },
    {
      icon: <Heart size={16} className="text-red-400" />,
      text: "Open-source contributor",
      color: "#FF6B6B",
    },
  ];

  // Character animation for bio text
  const bioVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div id="about" className="relative">
      {/* Negative margin overlap to create seamless transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10"></div>

      <motion.div
        ref={containerRef}
        className="relative min-h-screen py-20 overflow-hidden"
        style={{
          background: "black",
        }}
      >
        {/* Star field background - similar to hero */}
        <div className="absolute inset-0 z-0">
          <StarField />
        </div>

        {/* Constellation lines - similar to hero */}
        <div className="absolute inset-0 z-0">
          <ConstellationLines />
        </div>

        {/* Animated blurred gradient background */}
        <motion.div
          className="absolute w-full h-full inset-0 z-0 opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(105, 56, 239, 0.2), rgba(0, 194, 255, 0.1), rgba(0, 237, 173, 0.05), transparent)",
            scale: 1.5,
            rotate,
          }}
        />

        {/* Animated cursor gradient */}
        <motion.div
          className="absolute w-64 h-64 rounded-full filter blur-3xl opacity-10 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle, rgba(105, 56, 239, 0.6), rgba(0, 194, 255, 0.3), transparent 70%)",
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), 
                               linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left column with profile picture and animated orbs */}
            <motion.div
              className="lg:col-span-5 relative"
              style={{ y, opacity, scale }}
            >
              <div className="relative">
                {/* Animated border */}
                <motion.div
                  className="absolute -inset-1 rounded-full opacity-70 z-0"
                  animate={{
                    background: [
                      "linear-gradient(0deg, #6938EF, #00C2FF)",
                      "linear-gradient(90deg, #00C2FF, #00EDAD)",
                      "linear-gradient(180deg, #00EDAD, #6938EF)",
                      "linear-gradient(270deg, #6938EF, #00C2FF)",
                    ],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Profile container */}
                <div className="relative bg-black rounded-full p-1 z-10 bg-opacity-80 backdrop-blur-sm">
                  <div className="relative rounded-full overflow-hidden aspect-square">
                    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 relative">
                      <div className="absolute inset-0 flex items-center justify-center text-7xl text-gray-700 font-bold">
                        <User size={120} className="opacity-30" />
                      </div>
                    </div>

                    {/* Hover overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary-500/40 to-secondary-500/40 opacity-0 flex items-center justify-center transition-opacity duration-300"
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.span
                        className="text-white font-medium px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm"
                        initial={{ y: 10, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        That&apos;s me!
                      </motion.span>
                    </motion.div>
                  </div>
                </div>

                {/* Floating badges */}
                {facts.map((fact, index) => (
                  <motion.div
                    key={index}
                    className="absolute bg-black/80 border border-gray-800 rounded-full py-1 px-3 text-xs  items-center gap-1 shadow-lg backdrop-blur-sm hidden md:flex" // Added hidden for mobile, flex for md and up
                    style={{
                      top: `${20 + index * 30}%`,
                      [index % 2 === 0 ? "left" : "right"]: "-35%",
                    }}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      y: [0, -5, 0, 5, 0],
                    }}
                    transition={{
                      opacity: { delay: 0.2 * index, duration: 0.5 },
                      x: { delay: 0.2 * index, duration: 0.5 },
                      y: {
                        delay: 0.2 * index,
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                      },
                    }}
                  >
                    <span className="text-gray-400">{fact.icon}</span>
                    <span className="text-gray-300">{fact.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right column with text content */}
            <motion.div
              className="lg:col-span-7"
              ref={textRef}
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
            >
              {/* Greeting */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-3"
              >
                <span className="text-gray-400 text-lg">Hello, I&apos;m</span>
              </motion.div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-6xl font-bold mb-3"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 inline-block">
                  {name}
                </span>
              </motion.h1>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-2xl md:text-3xl text-gray-300 mb-6"
              >
                {title}
              </motion.h2>

              {/* Bio text with character animation */}
              <motion.p
                variants={bioVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="text-lg text-gray-400 mb-8 leading-relaxed"
              >
                {bio.split("").map((char, index) => (
                  <motion.span key={index} variants={letterVariants}>
                    {char}
                  </motion.span>
                ))}
              </motion.p>

              {/* Social links */}
              <motion.div
                className="flex flex-wrap gap-3 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black/60 border border-gray-800 rounded-full py-2 px-4 text-sm flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(105, 56, 239, 0.2)",
                      borderColor: "rgba(105, 56, 239, 0.5)",
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      opacity: { delay: 0.5 + index * 0.1, duration: 0.3 },
                      y: { delay: 0.5 + index * 0.1, duration: 0.3 },
                    }}
                  >
                    {link.icon}
                    {link.name}
                  </motion.a>
                ))}
              </motion.div>

              {/* Skills */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="space-y-5"
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  Expertise
                </h3>
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span style={{ color: skill.color }}>{skill.icon}</span>
                        <span className="text-gray-300">{skill.name}</span>
                      </div>
                      <span className="text-gray-400 text-sm">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-900/50 rounded-full overflow-hidden border border-gray-800/30">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{
                          duration: 1,
                          delay: 0.8 + index * 0.2,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="mt-8"
              >
                <motion.button
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium py-3 px-6 rounded-full flex items-center gap-2 shadow-lg shadow-primary-500/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>View My Work</span>
                  <ExternalLink size={16} />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Animated particles */}
        <ParticleEffect />
      </motion.div>

      {/* Gradient to next section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[rgba(3,7,15,1)] to-transparent z-10"></div>
    </div>
  );
};

// Star field effect matching hero
const StarField: React.FC = () => {
  const stars = Array.from({ length: 100 }, (_, index) => ({
    id: index,
    size: Math.random() * 2 + 0.5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: Math.random() * 0.5 + 0.2,
    blinkDuration: Math.random() * 4 + 3,
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

// Constellation lines matching hero
const ConstellationLines: React.FC = () => {
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
          <motion.path
            d={`M ${constellation
              .map((point) => `${point.x} ${point.y}`)
              .join(" L ")}`}
            stroke="white"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
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
              r="1"
              fill="white"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
            />
          ))}
        </g>
      ))}
    </svg>
  );
};

// Animated particles component
const ParticleEffect: React.FC = () => {
  const particles = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white opacity-20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default AboutMe;
