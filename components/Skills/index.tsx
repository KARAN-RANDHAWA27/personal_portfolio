import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  Code,
  Server,
  Database,
  Globe,
  Layers,
  Cloud,
  Smartphone,
  Terminal,
  GitBranch,
} from "lucide-react";

interface Skill {
  name: string;
  type: "frontend" | "backend" | "database" | "devops" | "mobile" | "other";
  icon: React.ReactNode;
  level: number; // 1-10
  color: string;
  libraries?: string[];
}

// Dynamic particle component for background
const ParticleBackground = () => {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 25 + 15,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.3 + 0.1,
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
            backgroundColor: `rgba(${Math.random() * 100 + 100}, ${
              Math.random() * 100 + 100
            }, ${Math.random() * 255}, ${particle.opacity})`,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.size}px rgba(${
              Math.random() * 100 + 100
            }, ${Math.random() * 100 + 100}, ${Math.random() * 255}, ${
              particle.opacity / 2
            })`,
          }}
          animate={{
            y: [0, -300],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [0, particle.opacity, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Animated gradient orb component
const GradientOrbs = () => {
  const orbs = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    size: Math.random() * 300 + 200,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 60 + 30,
    colors: [
      [105, 56, 239], // Purple
      [0, 194, 255], // Blue
      [0, 237, 173], // Teal
      [255, 184, 0], // Yellow
      [255, 107, 107], // Red
    ][i % 5],
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full filter blur-3xl opacity-10"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            backgroundColor: `rgba(${orb.colors[0]}, ${orb.colors[1]}, ${orb.colors[2]}, 0.3)`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Animated code lines component
const CodeLines = () => {
  const lines = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    width: Math.random() * 150 + 50,
    y: Math.random() * 100,
    x: Math.random() * 100,
    duration: Math.random() * 10 + 5,
    delay: Math.random() * 5,
  }));

  const codeSnippets = [
    "const render = () => {}",
    "import React from 'react'",
    "function App() {",
    "return (",
    "<div className=''>",
    "useState([]);",
    "useEffect(() => {})",
    "export default",
    "npm install",
    "git commit -m",
    "@tailwind base;",
    ".map((item) =>",
    "async/await",
    "try { } catch { }",
    "</div>",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lines.map((line, idx) => (
        <motion.div
          key={line.id}
          className="absolute h-5 rounded opacity-10 font-mono text-xs whitespace-nowrap overflow-hidden"
          style={{
            left: `${line.x}%`,
            top: `${line.y}%`,
            width: line.width,
            color: "#ffffff",
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.1, 0.15, 0.1, 0],
            x: [0, 30],
          }}
          transition={{
            duration: line.duration,
            delay: line.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 10 + 5,
          }}
        >
          {codeSnippets[idx % codeSnippets.length]}
        </motion.div>
      ))}
    </div>
  );
};

// Matrix rain effect
const MatrixEffect = () => {
  const columns = 20;
  const characters = Array.from({ length: columns }, () => ({
    chars: Array.from({ length: Math.floor(Math.random() * 20) + 10 }, () =>
      String.fromCharCode(Math.floor(Math.random() * 93) + 33)
    ),
    x: Math.random() * 100,
    speed: Math.random() * 3 + 1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {characters.map((column, colIdx) => (
        <div
          key={colIdx}
          className="absolute text-primary-500 text-xs font-mono"
          style={{
            left: `${column.x}%`,
            top: "-20px",
            opacity: 0.15,
            writingMode: "vertical-rl",
          }}
        >
          {column.chars.map((char, charIdx) => (
            <motion.span
              key={charIdx}
              animate={{
                opacity: [0, 0.8, 0],
                y: [-20, window.innerHeight],
              }}
              transition={{
                duration: column.speed * 10,
                delay: charIdx * 0.15,
                repeat: Infinity,
                repeatDelay: Math.random() * 5,
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
};

const SkillsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const [selectedType, setSelectedType] = useState<string>("all");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Animation for scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // Define skill data
  const skills: Skill[] = [
    {
      name: "React",
      type: "frontend",
      icon: <Code size={24} />,
      level: 9,
      color: "#61DAFB",
      libraries: ["Redux", "Next.js", "React Query", "Styled Components"],
    },
    {
      name: "JavaScript/TypeScript",
      type: "frontend",
      icon: <Code size={24} />,
      level: 9,
      color: "#3178C6",
      libraries: ["ES6+", "TypeScript", "Babel", "Webpack"],
    },
    {
      name: "CSS & Frameworks",
      type: "frontend",
      icon: <Layers size={24} />,
      level: 8,
      color: "#38B2AC",
      libraries: ["Tailwind CSS", "SASS/SCSS", "Material UI", "Bootstrap"],
    },
    {
      name: "Node.js",
      type: "backend",
      icon: <Server size={24} />,
      level: 8,
      color: "#339933",
      libraries: ["Express", "NestJS", "Fastify", "Socket.io"],
    },
    {
      name: "Python",
      type: "backend",
      icon: <Terminal size={24} />,
      level: 7,
      color: "#3776AB",
      libraries: ["Django", "Flask", "FastAPI", "Celery"],
    },
    {
      name: "Databases",
      type: "database",
      icon: <Database size={24} />,
      level: 8,
      color: "#4479A1",
      libraries: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
    },
    {
      name: "DevOps",
      type: "devops",
      icon: <Cloud size={24} />,
      level: 7,
      color: "#2396ED",
      libraries: ["Docker", "Kubernetes", "CI/CD", "AWS/Azure"],
    },
    {
      name: "Mobile Development",
      type: "mobile",
      icon: <Smartphone size={24} />,
      level: 6,
      color: "#61DBFB",
      libraries: ["React Native", "Flutter", "Progressive Web Apps"],
    },
    {
      name: "Version Control",
      type: "other",
      icon: <GitBranch size={24} />,
      level: 9,
      color: "#F05032",
      libraries: ["Git", "GitHub", "GitLab", "Bitbucket"],
    },
    {
      name: "API Design",
      type: "backend",
      icon: <Globe size={24} />,
      level: 8,
      color: "#6236FF",
      libraries: ["REST", "GraphQL", "OpenAPI", "gRPC"],
    },
  ];

  // Filter skills based on selectedType
  const filteredSkills =
    selectedType === "all"
      ? skills
      : skills.filter((skill) => skill.type === selectedType);

  // Skill category tabs
  const categories = [
    { id: "all", label: "All Skills" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "database", label: "Databases" },
    { id: "devops", label: "DevOps" },
    { id: "mobile", label: "Mobile" },
    { id: "other", label: "Other" },
  ];

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen py-20 relative bg-gradient-to-b from-black to-gray-900 overflow-hidden"
    >
      {/* Enhanced backgrounds */}
      <div className="absolute inset-0 opacity-70">
        {/* Create an animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
          animate={{
            background: [
              "radial-gradient(circle at 30% 30%, rgba(3, 7, 18, 0.8) 0%, rgba(0, 0, 0, 1) 70%)",
              "radial-gradient(circle at 70% 70%, rgba(3, 7, 18, 0.8) 0%, rgba(0, 0, 0, 1) 70%)",
              "radial-gradient(circle at 30% 70%, rgba(3, 7, 18, 0.8) 0%, rgba(0, 0, 0, 1) 70%)",
              "radial-gradient(circle at 70% 30%, rgba(3, 7, 18, 0.8) 0%, rgba(0, 0, 0, 1) 70%)",
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), 
                             linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* More dynamic backgrounds */}
        <ParticleBackground />
        <GradientOrbs />
        <CodeLines />
        <MatrixEffect />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Technical Skills
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            A comprehensive overview of my technical expertise and proficiency
            in various technologies.
          </motion.p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-sm
                ${
                  selectedType === category.id
                    ? "bg-primary-500/80 text-white shadow-lg shadow-primary-500/20"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/60"
                }`}
              onClick={() => setSelectedType(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="relative bg-gray-900/70 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 group"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{
                  y: -5,
                  boxShadow: `0 10px 30px -10px ${skill.color}40`,
                }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Animated gradient border on hover */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, ${skill.color}00, ${skill.color}70, ${skill.color}00)`,
                    backgroundSize: "200% 100%",
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "200% 0%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Skill header */}
                <div className="p-6 relative z-10 backdrop-blur-sm bg-gray-900/40">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="p-2 rounded-lg"
                        style={{
                          backgroundColor: `${skill.color}20`,
                          color: skill.color,
                        }}
                        whileHover={{ rotate: [0, 10, -10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {skill.icon}
                      </motion.div>
                      <h3 className="text-xl font-semibold text-white">
                        {skill.name}
                      </h3>
                    </div>
                    <div
                      className="text-xs font-bold rounded-full py-1 px-3"
                      style={{
                        backgroundColor: `${skill.color}20`,
                        color: skill.color,
                      }}
                    >
                      {skill.level}/10
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden mb-4">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)`,
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level * 10}%` }}
                      transition={{
                        duration: 1,
                        delay: 0.5 + index * 0.1,
                        ease: "easeOut",
                      }}
                    />
                  </div>

                  {/* Related libraries with animation */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {skill.libraries?.map((lib, libIndex) => (
                      <motion.span
                        key={lib}
                        className="text-xs rounded-full px-2 py-1 text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.7 + index * 0.1 + libIndex * 0.05,
                          duration: 0.3,
                        }}
                        whileHover={{
                          y: -2,
                          backgroundColor: `${skill.color}20`,
                        }}
                      >
                        {lib}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Particles on hover */}
                <AnimatePresence>
                  {hoveredSkill === skill.name && (
                    <>
                      {[...Array(10)].map((_, i) => (
                        <motion.div
                          key={`particle-${i}`}
                          className="absolute w-1 h-1 rounded-full"
                          style={{
                            backgroundColor: skill.color,
                            top: "50%",
                            left: "50%",
                            boxShadow: `0 0 6px 2px ${skill.color}80`,
                          }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                            x: [0, (Math.random() - 0.5) * 100],
                            y: [0, (Math.random() - 0.5) * 100],
                          }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ duration: 1 + Math.random() }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Interactive 3D skill web visualization */}
        <motion.div
          className="mt-20 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative w-64 h-64 lg:w-80 lg:h-80">
            {/* Interactive skill web */}
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Center circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="8"
                fill="rgba(105, 56, 239, 0.3)"
                stroke="#6938EF"
                strokeWidth="1"
                animate={{
                  r: [8, 10, 8],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              {/* Skill rays and nodes */}
              {skills.map((skill, i) => {
                const angle = (i / skills.length) * 2 * Math.PI;
                const nodeRadius = 40 * (skill.level / 10);
                const x = 50 + nodeRadius * Math.cos(angle);
                const y = 50 + nodeRadius * Math.sin(angle);

                return (
                  <g key={`web-${skill.name}`}>
                    {/* Ray line from center */}
                    <motion.line
                      x1="50"
                      y1="50"
                      x2={x}
                      y2={y}
                      stroke={skill.color}
                      strokeWidth="0.5"
                      strokeOpacity="0.3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: i * 0.1 }}
                    />

                    {/* Concentric circles */}
                    {[2, 4, 6, 8, 10].map((level) => {
                      const circleRadius = 4 * level;
                      return (
                        <circle
                          key={`level-${level}`}
                          cx="50"
                          cy="50"
                          r={circleRadius}
                          fill="none"
                          stroke="#333"
                          strokeWidth="0.2"
                          strokeDasharray="1 1"
                        />
                      );
                    })}

                    {/* Skill node */}
                    <motion.circle
                      cx={x}
                      cy={y}
                      r="3"
                      fill={skill.color}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                      whileHover={{ r: 4, opacity: 0.9 }}
                    />

                    {/* Pulsing animation for nodes */}
                    <motion.circle
                      cx={x}
                      cy={y}
                      r="3"
                      fill="transparent"
                      stroke={skill.color}
                      strokeWidth="1"
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.2,
                        repeat: Infinity,
                      }}
                    />

                    {/* Skill label */}
                    <motion.text
                      x={x > 50 ? x + 5 : x - 5}
                      y={y}
                      textAnchor={x > 50 ? "start" : "end"}
                      fill="white"
                      fontSize="3"
                      opacity="0.7"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.7 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                    >
                      {skill.name}
                    </motion.text>
                  </g>
                );
              })}

              {/* Center text */}
              <text
                x="50"
                y="50"
                textAnchor="middle"
                fill="white"
                fontSize="4"
                fontWeight="bold"
                dominantBaseline="middle"
              >
                Skills
              </text>
            </svg>
          </div>
        </motion.div>

        {/* Bottom decorative element */}
        <div className="mt-20 w-full h-px bg-gradient-to-r from-transparent via-gray-500/20 to-transparent" />
      </div>
    </motion.div>
  );
};

export default SkillsSection;
