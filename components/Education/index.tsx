import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, Award, Calendar, MapPin, BookOpen } from "lucide-react";

interface EducationItem {
  id: number;
  degree: string;
  institution: string;
  location: string;
  period: string;
  gpa: string;
  color: string;
  specialization: string;
  achievements: string[];
  courses: string[];
}

interface TimelineItemProps {
  data: EducationItem;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  position: "left" | "right";
}

const EducationSection: React.FC = () => {
  const [selected, setSelected] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const educationData: EducationItem[] = [
    {
      id: 1,
      degree: "Master of Computer Science",
      institution: "Tech University",
      location: "San Francisco, CA",
      period: "2018 - 2020",
      gpa: "3.92/4.0",
      color: "#6938EF", // primary-500
      specialization: "Artificial Intelligence & Machine Learning",
      achievements: [
        "Graduated with Highest Honors",
        "Published research paper on Deep Learning algorithms",
        "Teaching Assistant for Data Structures & Algorithms",
      ],
      courses: [
        "Advanced Machine Learning",
        "Neural Networks & Deep Learning",
        "Big Data Systems",
        "Cloud Computing Architecture",
      ],
    },
    {
      id: 2,
      degree: "Bachelor of Science in Computer Engineering",
      institution: "State University",
      location: "Boston, MA",
      period: "2014 - 2018",
      gpa: "3.85/4.0",
      color: "#00C2FF", // secondary-500
      specialization: "Software Systems & Web Technologies",
      achievements: [
        "Dean's List all semesters",
        "Recipient of Merit Scholarship",
        "Winner of Annual Hackathon (2017)",
      ],
      courses: [
        "Data Structures & Algorithms",
        "Web Application Development",
        "Database Management Systems",
        "Computer Networks",
      ],
    },
    {
      id: 3,
      degree: "Professional Certification",
      institution: "Cloud Computing Institute",
      location: "Online",
      period: "2021",
      gpa: "",
      color: "#00EDAD", // accent-500
      specialization: "AWS Solutions Architecture",
      achievements: [
        "Completed certification with perfect score",
        "Built serverless architecture solutions for real-world case studies",
        "Recognized for innovative approaches to cloud migration strategies",
      ],
      courses: [
        "Cloud Infrastructure Design",
        "Serverless Architecture",
        "Security & Compliance",
        "Cost Optimization Strategies",
      ],
    },
  ];

  // Animation for background gradient
  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.3, 1, 1, 0.3]
  );

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-screen py-20 text-white overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #080808, #121212)",
      }}
    >
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(105, 56, 239, 0.15), rgba(0, 194, 255, 0.15), rgba(0, 237, 173, 0.15), transparent 70%)`,
          opacity: backgroundOpacity,
          y: backgroundY,
        }}
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 inline-block">
              Educational Journey
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A timeline of my academic achievements and growth
          </p>
        </motion.div>

        {/* Timeline Design */}
        <div className="relative max-w-5xl mx-auto">
          {/* Center Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-800 z-0"></div>

          {educationData.map((item, index) => (
            <TimelineItem
              key={item.id}
              data={item}
              index={index}
              isSelected={selected === index}
              onSelect={() => setSelected(index)}
              position={index % 2 === 0 ? "right" : "left"}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Timeline Item Component
const TimelineItem: React.FC<TimelineItemProps> = ({
  data,
  isSelected,
  onSelect,
  position,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "center center", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.9, 1],
    [0.3, 1, 1, 0.3]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.9, 1],
    [0.8, 1, 1, 0.8]
  );

  const x = useTransform(
    scrollYProgress,
    [0, 0.2, 0.9, 1],
    position === "right" ? [50, 0, 0, 50] : [-50, 0, 0, -50]
  );

  return (
    <motion.div
      ref={itemRef}
      className={`relative mb-16 md:mb-24 ${
        position === "right"
          ? "md:ml-1/2 pl-12 md:pl-16"
          : "md:mr-1/2 md:pr-16 pr-4"
      } py-4`}
      style={{
        opacity,
        scale,
        x,
      }}
    >
      {/* Timeline Dot */}
      <div
        className="absolute left-1/2 md:left-auto md:right-auto transform -translate-x-1/2 w-8 h-8 rounded-full z-10 flex items-center justify-center shadow-lg"
        style={{
          backgroundColor: data.color,
          [position === "right" ? "md:left" : "md:right"]: "-19px",
        }}
      >
        <GraduationCap className="w-4 h-4 text-white" />
      </div>

      {/* Content Card */}
      <motion.div
        className="relative bg-dark-800/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-800"
        whileHover={{
          boxShadow: `0 0 20px ${data.color}30`,
          borderColor: `${data.color}50`,
          scale: 1.02,
        }}
        transition={{ duration: 0.3 }}
        onClick={onSelect}
      >
        <div
          className={`absolute top-0 left-0 right-0 h-1`}
          style={{ backgroundColor: data.color }}
        ></div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-300">{data.period}</span>
              </div>

              <h3 className="text-xl font-bold mb-2">{data.degree}</h3>
              <h4 className="text-lg text-gray-300 mb-3">{data.institution}</h4>

              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-300">{data.location}</span>
              </div>

              <div
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: `${data.color}20`,
                  color: data.color,
                }}
              >
                <BookOpen className="w-3 h-3 mr-1" /> {data.specialization}
              </div>
            </div>
          </div>

          {isSelected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 space-y-6 overflow-hidden"
            >
              <div>
                <h5 className="font-semibold mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4" style={{ color: data.color }} />
                  Key Achievements
                </h5>
                <ul className="space-y-2 pl-6">
                  {data.achievements.map((achievement, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                      className="text-sm text-gray-300 list-disc"
                    >
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" style={{ color: data.color }} />
                  Key Courses
                </h5>
                <ul className="space-y-2 pl-6">
                  {data.courses.map((course, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                      className="text-sm text-gray-300 list-disc"
                    >
                      {course}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {data.gpa && (
                <div className="pt-4 mt-4 border-t border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Overall GPA</span>
                    <span className="font-bold" style={{ color: data.color }}>
                      {data.gpa}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {!isSelected && (
            <div className="mt-4 text-center">
              <span className="text-sm text-gray-400">
                Click to view details
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EducationSection;
