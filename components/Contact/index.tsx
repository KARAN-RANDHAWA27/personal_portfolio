"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import {
  Send,
  User,
  Mail,
  MessageSquare,
  Phone,
  Zap,
  Sparkles,
} from "lucide-react";

interface ContactFormProps {
  title?: string;
  subtitle?: string;
}

const ContactOptionsPopup: React.FC<{
  onClose: () => void;
  name: string;
  message: string;
}> = ({ onClose, name, message }) => {
  const handleContact = (platform: string) => {
    let url = "";
    const phoneNumber = "919661637558"; // Your phone number without any special characters
    const encodedMessage = encodeURIComponent(message);

    switch (platform) {
      case "telegram":
        url = `https://t.me/${phoneNumber}?text=${encodedMessage}`;
        break;
      case "whatsapp":
        url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        break;
      case "email":
        url = `mailto:richrandhawa03@gmail.com?subject=Message from ${name}&body=${encodedMessage}`;
        break;
    }

    if (url) {
      window.open(url, "_blank");
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 relative overflow-hidden border border-gray-800"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h3 className="text-2xl font-bold text-white mb-6">
          Choose how to send your message
        </h3>

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleContact("telegram")}
            className="w-full bg-gradient-to-r from-[#0088cc] to-[#00a2ff] text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.52.36-.99.53-1.41.52-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.4-.89.03-.25.37-.51 1.03-.78 4.04-1.76 6.74-2.92 8.09-3.48 3.85-1.6 4.64-1.88 5.17-1.89.11 0 .37.03.54.17.14.12.18.28.2.45-.02.14-.02.3-.03.42z" />
            </svg>
            Send via Telegram
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleContact("whatsapp")}
            className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.287.129.332.202.045.073.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z" />
            </svg>
            Send via WhatsApp
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleContact("email")}
            className="w-full bg-gradient-to-r from-[#EA4335] to-[#FF6B6B] text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2"
          >
            <Mail className="w-5 h-5" />
            Send via Email
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ContactForm: React.FC<ContactFormProps> = ({
  title = "Let's Connect",
  subtitle = "Have a project in mind or want to collaborate? Drop me a message!",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Form state
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [activeField, setActiveField] = useState<string | null>(null);
  const [showContactOptions, setShowContactOptions] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [1, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !message) {
      return;
    }

    setShowContactOptions(true);
  };

  // Auto-focus for form reset
  useEffect(() => {
    if (!name && !message) {
      const firstInput = formRef.current?.querySelector("input");
      if (firstInput) {
        firstInput.focus();
      }
    }
  }, [name, message]);

  return (
    <div className="relative">
      {/* Negative margin overlap to create seamless transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10"></div>

      <motion.div
        ref={containerRef}
        className="relative min-h-screen py-24 overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, #050510, #0A0A20)",
          opacity,
          scale,
        }}
        initial={{ opacity: 1 }}
        onMouseMove={handleMouseMove}
      >
        {/* Unique visual elements - Glowing lines radiating from center */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <RadiatingLines />
        </div>

        {/* Particle clouds */}
        <div className="absolute inset-0 z-0">
          <ParticleClouds />
        </div>

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

        {/* Digital circuit pattern overlay */}
        <div className="absolute inset-0 z-0 opacity-10">
          <CircuitPattern />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 inline-block">
                {title}
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {subtitle}
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Contact Info Cards */}
              <div className="lg:col-span-5 space-y-6">
                {/* Contact Card 1 - Email */}
                <ContactCard
                  icon={<Mail size={24} />}
                  title="Email Me"
                  content="richrandhawa03@gmail.com"
                  link="mailto:richrandhawa03@gmail.com"
                  color="#6938EF"
                  delay={0.2}
                />

                {/* Contact Card 2 - Phone */}
                <ContactCard
                  icon={<Phone size={24} />}
                  title="Call Me"
                  content="+919661637558"
                  link="tel:+919661637558"
                  color="#00C2FF"
                  delay={0.3}
                />

                {/* Contact Card 3 - Availability */}
                <ContactCard
                  icon={<Zap size={24} />}
                  title="Availability"
                  content="Open for new projects"
                  link="#"
                  color="#00EDAD"
                  delay={0.4}
                />

                {/* Unique digital planet illustration */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="relative mt-12 hidden lg:block"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 backdrop-blur-sm -z-10"></div>
                  <PlanetIllustration />
                </motion.div>
              </div>

              {/* Contact Form - Height adjusted to match left column */}
              <div className="lg:col-span-7 flex flex-col h-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative bg-gray-900/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 flex-grow h-full flex flex-col"
                >
                  {/* Animated border gradient */}
                  <AnimatedBorder />

                  <div className="p-8 md:p-10 relative z-10 flex-grow flex flex-col">
                    <form
                      ref={formRef}
                      onSubmit={handleSubmit}
                      className="flex flex-col h-full"
                    >
                      <div className="mb-6">
                        <FormField
                          label="Your Name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Elon Musk"
                          required
                          icon={<User size={16} />}
                          isActive={activeField === "name"}
                          onFocus={() => setActiveField("name")}
                          onBlur={() => setActiveField(null)}
                        />
                      </div>

                      {/* Message area takes remaining height */}
                      <div className="mb-8 flex-grow flex flex-col">
                        <div className="relative flex flex-col h-full">
                          <label className="block text-gray-300 text-sm mb-2 font-medium">
                            Your Message
                          </label>
                          <div
                            className={`relative rounded-lg overflow-hidden transition-all duration-300 flex-grow flex ${
                              activeField === "message"
                                ? "ring-2 ring-primary-500 border-primary-500"
                                : "border-gray-700"
                            }`}
                          >
                            <div
                              className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 opacity-0 transition-opacity duration-300"
                              style={{
                                opacity: activeField === "message" ? 0.1 : 0,
                              }}
                            />
                            <div className="relative flex-grow flex">
                              <div className="absolute top-3 left-3 text-gray-400">
                                <MessageSquare size={16} />
                              </div>
                              <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Tell me about your project..."
                                required
                                className="w-full h-full min-h-[180px] bg-gray-800/50 border border-gray-700 rounded-lg py-3 px-4 pl-10 text-gray-300 focus:outline-none resize-none flex-grow"
                                onFocus={() => setActiveField("message")}
                                onBlur={() => setActiveField(null)}
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>

                      <motion.button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20 relative overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Send size={16} />
                        <span>Send Message</span>

                        {/* Sparkle effect on hover */}
                        <motion.div
                          className="absolute inset-0 -z-10"
                          initial={false}
                          whileHover={{
                            background: [
                              "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
                              "linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)",
                              "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
                            ],
                            x: ["0%", "150%", "0%"],
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </motion.button>
                    </form>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Gradient to next section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10"></div>

      {/* Add the popup */}
      <AnimatePresence>
        {showContactOptions && (
          <ContactOptionsPopup
            onClose={() => setShowContactOptions(false)}
            name={name}
            message={message}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Digital circuits pattern
const CircuitPattern: React.FC = () => {
  return (
    <div className="h-full w-full opacity-20">
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
      >
        <g fill="none" stroke="rgba(105, 56, 239, 0.6)" strokeWidth="1">
          <motion.path
            d="M100,100 L200,100 L200,200 L300,200 L300,100 L400,100 L400,300 L500,300 L500,400 L600,400 L600,500 L700,500 L700,600 L800,600 L800,700 L900,700"
            initial={{ pathLength: 0, opacity: 0.2 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.path
            d="M100,200 L150,200 L150,300 L250,300 L250,400 L350,400 L350,500 L450,500 L450,600 L550,600 L550,700 L650,700 L650,800 L750,800 L750,900 L900,900"
            initial={{ pathLength: 0, opacity: 0.2 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1,
            }}
          />
          <motion.path
            d="M500,100 L500,200 L600,200 L600,300 L700,300 L700,400 L800,400 L800,500 L900,500"
            initial={{ pathLength: 0, opacity: 0.2 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 2,
            }}
          />
          <motion.path
            d="M200,600 L300,600 L300,700 L400,700 L400,800 L500,800 L500,900 L600,900"
            initial={{ pathLength: 0, opacity: 0.2 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1.5,
            }}
          />
        </g>

        {/* Circuit nodes */}
        {[...Array(15)].map((_, index) => {
          const x = 100 + (index % 5) * 200;
          const y = 100 + Math.floor(index / 5) * 200;
          return (
            <motion.circle
              key={index}
              cx={x}
              cy={y}
              r="4"
              fill="rgba(0, 194, 255, 0.6)"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1],
                r: [4, 5, 4],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};

// Radiating lines animation
const RadiatingLines: React.FC = () => {
  const lines = 24; // Number of lines
  const angleStep = 360 / lines;

  return (
    <div className="w-full h-full absolute inset-0">
      {[...Array(lines)].map((_, index) => {
        const angle = index * angleStep;
        const delay = index * (2 / lines);

        return (
          <motion.div
            key={index}
            className="absolute top-1/2 left-1/2 h-px bg-gradient-to-r from-primary-500/5 via-primary-500/30 to-transparent"
            style={{
              width: "100%",
              transformOrigin: "0 50%",
              rotate: `${angle}deg`,
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: delay,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

// Particle clouds
const ParticleClouds: React.FC = () => {
  const cloudClusters = [
    { x: "20%", y: "20%", scale: 1.2 },
    { x: "80%", y: "15%", scale: 0.8 },
    { x: "65%", y: "70%", scale: 1.5 },
    { x: "30%", y: "80%", scale: 1.1 },
    { x: "50%", y: "40%", scale: 0.7 },
  ];

  return (
    <div className="absolute inset-0">
      {cloudClusters.map((cluster, clusterIndex) => (
        <motion.div
          key={clusterIndex}
          className="absolute"
          style={{
            left: cluster.x,
            top: cluster.y,
            x: "-50%",
            y: "-50%",
          }}
          animate={{
            y: ["-50%", "-52%", "-50%", "-48%", "-50%"],
          }}
          transition={{
            duration: 10 + clusterIndex * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {[...Array(15)].map((_, i) => {
            const size = Math.random() * 5 + 1;
            const distance = Math.random() * 70 * cluster.scale;
            const angle = Math.random() * 360;
            const x = Math.cos((angle * Math.PI) / 180) * distance;
            const y = Math.sin((angle * Math.PI) / 180) * distance;
            const opacity = Math.random() * 0.5 + 0.1;

            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-blue-400"
                style={{
                  width: size,
                  height: size,
                  x,
                  y,
                  opacity,
                }}
                animate={{
                  opacity: [opacity, opacity * 2, opacity],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: Math.random() * 2,
                }}
              />
            );
          })}
        </motion.div>
      ))}
    </div>
  );
};

// Digital planet illustration
const PlanetIllustration: React.FC = () => {
  return (
    <div className="p-8 flex items-center justify-center">
      <div className="relative w-40 h-40">
        {/* Main planet */}
        <motion.div
          className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-indigo-900 to-purple-900 shadow-lg"
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        >
          {/* Surface details */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-purple-700/40"
              style={{
                width: Math.random() * 20 + 10,
                height: Math.random() * 20 + 10,
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`,
                transformOrigin: "center",
              }}
            />
          ))}
        </motion.div>

        {/* Planet ring */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-16">
          <motion.div
            className="absolute inset-0 rounded-full border-8 border-t-0 border-indigo-500/30"
            style={{ transform: "rotateX(75deg)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Orbiting moon */}
        <motion.div
          className="absolute top-1/2 left-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ width: 0, height: 0 }}
        >
          <motion.div
            className="absolute w-8 h-8 rounded-full bg-gray-300"
            style={{ left: 90, top: -4 }}
            animate={{
              boxShadow: ["0 0 5px #fff", "0 0 15px #fff", "0 0 5px #fff"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.div>

        {/* Floating space debris */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 200}%`,
              top: `${Math.random() * 200}%`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
            animate={{
              x: [0, Math.random() * 20 - 10],
              y: [0, Math.random() * 20 - 10],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Form field component with animations
interface FormFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  icon: React.ReactNode;
  isActive: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  icon,
  isActive,
  onFocus,
  onBlur,
}) => {
  return (
    <div className="relative">
      <label className="block text-gray-300 text-sm mb-2 font-medium">
        {label}
      </label>
      <div
        className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
          isActive
            ? "ring-2 ring-primary-500 border-primary-500"
            : "border-gray-700"
        }`}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 opacity-0 transition-opacity duration-300"
          style={{ opacity: isActive ? 0.1 : 0 }}
        ></div>
        <div className="relative">
          <div className="absolute top-3 left-3 text-gray-400">{icon}</div>
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg py-3 px-4 pl-10 text-gray-300 focus:outline-none"
            onFocus={onFocus}
            onBlur={onBlur}
          />

          {/* Active typing animation */}
          {isActive && value && (
            <motion.div
              className="absolute right-3 top-3 text-primary-500"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.3 }}
            >
              <Sparkles size={16} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

// Contact card component
interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  link: string;
  color: string;
  delay: number;
}

const ContactCard: React.FC<ContactCardProps> = ({
  icon,
  title,
  content,
  link,
  color,
  delay,
}) => {
  return (
    <motion.a
      href={link}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="block"
    >
      <div className="bg-gray-900/40 backdrop-blur-sm rounded-xl p-6 border border-gray-800 relative overflow-hidden group">
        {/* Highlight glow */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ boxShadow: `inset 0 0 20px ${color}50` }}
        />

        {/* Animated border */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r"
          style={{
            background: `linear-gradient(to right, transparent, ${color}, transparent)`,
          }}
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1, delay: delay + 0.3 }}
        />

        <div className="flex items-start gap-4">
          <div
            className="p-3 rounded-lg"
            style={{ backgroundColor: `${color}20`, color }}
          >
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-1">{title}</h3>
            <p className="text-gray-400">{content}</p>
          </div>
        </div>
      </div>
    </motion.a>
  );
};

// Animated border component
const AnimatedBorder: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-transparent via-primary-500 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-transparent via-secondary-500 to-transparent"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="absolute top-0 bottom-0 left-0 w-[1px] overflow-hidden">
        <motion.div
          className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-b from-transparent via-accent-500 to-transparent"
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="absolute top-0 bottom-0 right-0 w-[1px] overflow-hidden">
        <motion.div
          className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-b from-transparent via-primary-500 to-transparent"
          animate={{ y: ["100%", "-100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
};

export default ContactForm;
