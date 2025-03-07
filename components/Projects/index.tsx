/* eslint-disable react/jsx-key */
"use client";
import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  MotionValue,
} from "framer-motion";
import {
  ExternalLink,
  GitBranch,
  Code,
  Eye,
  Star,
  Layers,
  Briefcase,
} from "lucide-react";
import InteractiveWeb from "../InteractiveWeb";

interface ProjectImage {
  src: string;
  alt: string;
}

interface Technology {
  name: string;
  color: string;
}

interface ProjectData {
  id: number;
  title: string;
  description: string;
  image: ProjectImage;
  technologies: Technology[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

interface ProjectsSectionProps {
  projects?: ProjectData[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects = defaultProjects,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  const filteredProjects = activeProject
    ? projects.filter((project) => project.id === activeProject)
    : projects;

  return (
    <div className="relative">
      {/* Negative margin overlap to create seamless transition */}
      <div className="absolute inset-0">
        <InteractiveWeb zIndex={1} backgroundColor="black" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[rgba(3,7,15,1)] to-transparent z-10"></div>

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

        {/* Animated cursor gradient */}
        <motion.div
          className="absolute w-64 h-64 rounded-full filter blur-3xl opacity-10 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle, rgba(105, 56, 239, 0.6), rgba(0, 194, 255, 0.3), transparent 70%)",
            x: mouseX,
            y: mouseY,
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
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 inline-block">
                Featured Projects
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore some of my recent work and creative endeavors
            </p>
          </motion.div>

          {/* Back Button (When project is selected) */}
          {activeProject !== null && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8 px-4 py-2 flex items-center gap-2 text-gray-300 hover:text-white rounded-lg"
              onClick={() => setActiveProject(null)}
            >
              <motion.div
                animate={{ x: [0, -5, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                ←
              </motion.div>
              Back to all projects
            </motion.button>
          )}

          {/* Projects Grid */}
          <div
            className={`grid grid-cols-1 ${
              activeProject === null
                ? "md:grid-cols-2 lg:grid-cols-3"
                : "md:grid-cols-1"
            } gap-6 md:gap-8`}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isExpanded={activeProject === project.id}
                onExpand={() => setActiveProject(project.id)}
                onHover={() => setHoveredProject(project.id)}
                onLeave={() => setHoveredProject(null)}
                isHovered={hoveredProject === project.id}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        {/* Animated particles */}
        <ParticleEffect />
      </motion.div>

      {/* Gradient to next section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
    </div>
  );
};

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  isExpanded: boolean;
  onExpand: () => void;
  onHover: () => void;
  onLeave: () => void;
  isHovered: boolean;
  scrollYProgress: MotionValue<number>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  isExpanded,
  onExpand,
  onHover,
  onLeave,
  isHovered,
  scrollYProgress,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const y = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [100 + index * 20, 0, 0, -100 - index * 20]
  );

  // Compact card view
  if (!isExpanded) {
    return (
      <motion.div
        ref={cardRef}
        style={{ y }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 * index }}
        onClick={onExpand}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        className="group relative rounded-2xl overflow-hidden cursor-pointer"
        whileHover={{ y: -10 }}
      >
        {/* Project Image Background */}
        <div className="h-[280px] w-full relative">
          {/* For demo, using a gradient background instead of actual image */}
          <div
            className="absolute inset-0 bg-gradient-to-br"
            style={{
              backgroundImage: `linear-gradient(to bottom right, ${getGradientColors(
                index
              )})`,
              opacity: 0.8,
            }}
          ></div>

          {/* Overlay with increasing darkness on hover */}
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: isHovered ? 0.2 : 0.5 }}
            transition={{ duration: 0.3 }}
          />

          {/* Placeholder for actual project image */}
          <div className="absolute inset-0 flex items-center justify-center text-white opacity-10 text-6xl font-bold">
            <div className="relative">{getProjectIcon(index)}</div>
          </div>

          {/* Project info */}
          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            {/* Featured badge */}
            {project.featured && (
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-500/30 border border-primary-500/50 text-xs font-medium text-primary-300 mb-3">
                <Star size={12} />
                <span>Featured Project</span>
              </div>
            )}

            <h3 className="text-xl font-bold mb-2">{project.title}</h3>

            <p className="text-gray-300 text-sm line-clamp-2 mb-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: `${tech.color}20`,
                    color: tech.color,
                  }}
                >
                  {tech.name}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400">
                  +{project.technologies.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* View details button on hover */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-black/60 backdrop-blur-sm text-white px-5 py-2.5 rounded-full flex items-center gap-2 border border-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye size={16} />
              <span>View Details</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Expanded card view
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="col-span-full bg-gray-900/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Project Image - left side on desktop */}
        <div className="relative h-[300px] md:h-full">
          {/* For demo, using a gradient instead of real image */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to bottom right, ${getGradientColors(
                index
              )})`,
              opacity: 0.9,
            }}
          ></div>

          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-white opacity-30 text-8xl">
              {getProjectIcon(index)}
            </div>
          </div>

          {/* Technology badges at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                  className="text-sm px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: `${tech.color}20`,
                    color: tech.color,
                  }}
                >
                  {tech.name}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Project details - right side on desktop */}
        <div className="p-8 md:py-10 space-y-6">
          {/* Title and featured badge */}
          <div>
            {project.featured && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary-500/30 border border-primary-500/50 text-xs font-medium text-primary-300 mb-3 w-fit"
              >
                <Star size={12} />
                <span>Featured Project</span>
              </motion.div>
            )}

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-3xl font-bold mb-2 text-white"
            >
              {project.title}
            </motion.h2>
          </div>

          {/* Full description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-300 leading-relaxed"
          >
            {project.description}
            <br />
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            quas ab iure eum assumenda nostrum, sunt quos nulla voluptate,
            debitis reprehenderit dolorem, facilis atque doloribus! Explicabo
            laboriosam quam dolores perferendis.
          </motion.p>

          {/* Key features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-medium text-white">Key Features</h3>
            <ul className="space-y-2">
              {["Feature 1", "Feature 2", "Feature 3"].map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.3 }}
                  className="flex items-start gap-2"
                >
                  <div className="mt-1 text-primary-400">→</div>
                  <span className="text-gray-300">
                    {feature} with some additional explanation of what this
                    feature does and why it matters.
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-500 hover:bg-primary-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink size={16} />
                <span>View Live</span>
              </motion.a>
            )}

            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <GitBranch size={16} />
                <span>Source Code</span>
              </motion.a>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Star field effect
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

// Helper functions
const getGradientColors = (index: number): string => {
  const gradients = [
    "#6938EF, #3D25AA", // Purple
    "#00C2FF, #0080B3", // Blue
    "#00EDAD, #00AA87", // Teal
    "#FF6B6B, #B34F4F", // Red
    "#FFB800, #CC9600", // Yellow
    "#9C3FE4, #6D2B9E", // Violet
  ];

  return gradients[index % gradients.length];
};

const getProjectIcon = (index: number): React.ReactNode => {
  const icons = [
    <Code size={80} />,
    <Layers size={80} />,
    <Star size={80} />,
    <Briefcase size={80} />,
    <Eye size={80} />,
    <GitBranch size={80} />,
  ];

  return icons[index % icons.length];
};

// Sample project data
const defaultProjects: ProjectData[] = [
  {
    id: 1,
    title: "Neural Fusion Dashboard",
    description:
      "A powerful analytics dashboard for monitoring and visualizing neural network performance in real-time.",
    image: {
      src: "/project1.jpg",
      alt: "Neural Fusion Dashboard Screenshot",
    },
    technologies: [
      { name: "React", color: "#61DAFB" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "TensorFlow.js", color: "#FF6F00" },
      { name: "D3.js", color: "#F9A03C" },
    ],
    liveUrl: "https://example.com/project1",
    githubUrl: "https://github.com/example/project1",
    featured: true,
  },
  {
    id: 2,
    title: "Quantum Portfolio",
    description:
      "A responsive portfolio template with advanced animations and 3D effects for creative professionals.",
    image: {
      src: "/project2.jpg",
      alt: "Quantum Portfolio Screenshot",
    },
    technologies: [
      { name: "Next.js", color: "#0070F3" },
      { name: "Three.js", color: "#FFFFFF" },
      { name: "GSAP", color: "#88CE02" },
      { name: "Tailwind CSS", color: "#06B6D4" },
    ],
    liveUrl: "https://example.com/project2",
    githubUrl: "https://github.com/example/project2",
  },
  {
    id: 3,
    title: "EcoTrack Mobile",
    description:
      "A cross-platform mobile application for tracking personal carbon footprint and suggesting eco-friendly alternatives.",
    image: {
      src: "/project3.jpg",
      alt: "EcoTrack Mobile Screenshot",
    },
    technologies: [
      { name: "React Native", color: "#61DAFB" },
      { name: "Firebase", color: "#FFCA28" },
      { name: "Redux", color: "#764ABC" },
      { name: "Node.js", color: "#339933" },
    ],
    liveUrl: "https://example.com/project3",
    githubUrl: "https://github.com/example/project3",
  },
  {
    id: 4,
    title: "Harmonic AI Assistant",
    description:
      "An AI-powered virtual assistant with natural language processing capabilities for task automation and information retrieval.",
    image: {
      src: "/project4.jpg",
      alt: "Harmonic AI Assistant Screenshot",
    },
    technologies: [
      { name: "Python", color: "#3776AB" },
      { name: "PyTorch", color: "#EE4C2C" },
      { name: "FastAPI", color: "#009688" },
      { name: "Docker", color: "#2496ED" },
    ],
    liveUrl: "https://example.com/project4",
    githubUrl: "https://github.com/example/project4",
    featured: true,
  },
  {
    id: 5,
    title: "Blockchain Explorer",
    description:
      "A comprehensive blockchain explorer with real-time transaction monitoring and intuitive visualization tools.",
    image: {
      src: "/project5.jpg",
      alt: "Blockchain Explorer Screenshot",
    },
    technologies: [
      { name: "Vue.js", color: "#4FC08D" },
      { name: "Web3.js", color: "#F16822" },
      { name: "GraphQL", color: "#E10098" },
      { name: "Express", color: "#000000" },
    ],
    liveUrl: "https://example.com/project5",
    githubUrl: "https://github.com/example/project5",
  },
  {
    id: 6,
    title: "Nebula Design System",
    description:
      "A comprehensive UI component library and design system for streamlined development of consistent web applications.",
    image: {
      src: "/project6.jpg",
      alt: "Nebula Design System Screenshot",
    },
    technologies: [
      { name: "Storybook", color: "#FF4785" },
      { name: "Styled Components", color: "#DB7093" },
      { name: "Jest", color: "#C21325" },
      { name: "Rollup", color: "#FF3E00" },
    ],
    liveUrl: "https://example.com/project6",
    githubUrl: "https://github.com/example/project6",
  },
];

export default ProjectsSection;
