"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  GitBranch,
  Linkedin,
  Mail,
  ArrowUp,
  Phone,
  MapPin,
  Send,
  Heart,
  InstagramIcon,
  ExternalLinkIcon,
} from "lucide-react";
import Image from "next/image";

interface FooterProps {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
}

const Footer: React.FC<FooterProps> = ({
  name = "Karan Randhawa",
  email = "karandeeprandhawa27@gmail.com",
  phone = "+91 9661637558",
  location = "Jamshedpur, India",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Only apply opacity to content, not the entire footer
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      ref={containerRef}
      className="relative bg-black text-white overflow-hidden md:px-8"
    >
      {/* Fixed solid background to prevent white overlay */}
      <div className="absolute inset-0 bg-black z-0"></div>

      {/* Background effects */}
      <div className="absolute inset-0 z-1">
        <StarryBackground />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 z-1 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), 
                             linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <motion.div
        className="relative z-10 container mx-auto px-4 py-16"
        style={{ opacity: contentOpacity }}
      >
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          {/* Profile Section */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-6">
                {/* Logo/Name */}
                <div className="mr-4">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center"
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      boxShadow: "0 0 20px rgba(105, 56, 239, 0.5)",
                    }}
                  >
                    <span className="text-white font-bold text-lg">KR</span>
                  </motion.div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400">
                    {name}
                  </h3>
                  <p className="text-gray-400">Full Stack Developer</p>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Creating innovative web solutions with a focus on user
                experience, performance, and cutting-edge technologies.
              </p>

              {/* Social Links - Updated with current platforms */}
              <div className="flex space-x-4 mb-8">
                {[
                  {
                    icon: <GitBranch size={20} />,
                    url: "https://github.com",
                    color: "#6938EF",
                  },
                  {
                    icon: <Linkedin size={20} />,
                    url: "https://linkedin.com",
                    color: "#00C2FF",
                  },
                  {
                    icon: <InstagramIcon size={20} />,
                    url: "https://instagram.com",
                    color: "#E1306C",
                  },
                  {
                    icon: <Mail size={20} />,
                    url: `mailto:${email}`,
                    color: "#FFB800",
                  },
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-700 text-gray-300 hover:text-white"
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: `${item.color}20`,
                      borderColor: item.color,
                      color: "white",
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {item.icon}
                  </motion.a>
                ))}
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                {[
                  {
                    icon: <Mail size={16} />,
                    text: email,
                    href: `mailto:${email}`,
                  },
                  {
                    icon: <Phone size={16} />,
                    text: phone,
                    href: `tel:${phone.replace(/\D/g, "")}`,
                  },
                  {
                    icon: <MapPin size={16} />,
                    text: location,
                    href: `https://maps.google.com/?q=${encodeURIComponent(
                      location
                    )}`,
                  },
                  {
                    icon: (
                      <Image
                        src={"/telegram.png"}
                        alt="telegram"
                        height={16}
                        width={16}
                      />
                    ),
                    text: "Telegram",
                    href: `https://t.me/${phone.replace(/\D/g, "")}`,
                    redirectIcon: <ExternalLinkIcon size={12} />,
                  },
                  {
                    icon: (
                      <Image
                        src={"/whatsapp.png"}
                        alt="whatsapp"
                        height={16}
                        width={16}
                      />
                    ),
                    text: "Whatsapp",
                    href: `https://wa.me/${phone.replace(/\D/g, "")}`,
                    redirectIcon: <ExternalLinkIcon size={12} />,
                  },
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    target={item.redirectIcon ? "_blank" : undefined}
                    rel={item.redirectIcon ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <span className="text-primary-400 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <span>{item.text}</span>
                    {item.redirectIcon && (
                      <span className="text-gray-500 group-hover:text-white transition-colors">
                        {item.redirectIcon}
                      </span>
                    )}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { text: "About", href: "/about" },
                  { text: "Career", href: "/career" },
                  { text: "Education", href: "/education" },
                  { text: "Projects", href: "/projects" },
                  { text: "Testimonials", href: "/testimonials" },
                ].map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.07 }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white hover:pl-2 transition-all flex items-center"
                    >
                      <motion.span
                        className="mr-2 opacity-0"
                        animate={{ opacity: 0 }}
                        whileHover={{ opacity: 1, x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                      {link.text}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Newsletter Signup */}
          <div className="md:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h4 className="text-lg font-semibold mb-6">Stay Updated</h4>
              <p className="text-gray-400 mb-6">
                Subscribe to my newsletter for the latest updates on projects,
                tech insights, and availability.
              </p>

              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-gray-900 border border-gray-700 rounded-full py-3 px-4 pr-12 text-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                />
                <motion.button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-primary-500"
                  whileHover={{ scale: 1.1, backgroundColor: "#8352FF" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={14} className="text-white" />
                </motion.button>
              </div>

              <p className="text-gray-500 text-xs mt-3">
                I respect your privacy. Unsubscribe at any time.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-8"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        ></motion.div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p
            className="text-gray-500 text-sm mb-4 md:mb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            © {new Date().getFullYear()} {name}. All rights reserved.
            <span className="hidden md:inline mx-2">|</span>
            <span className="block md:inline mt-1 md:mt-0">
              Made with <Heart size={12} className="inline text-red-500 mx-1" />{" "}
              and Next
            </span>
          </motion.p>

          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white group bg-gray-900 border border-gray-800 px-4 py-2 rounded-full transition-colors"
            whileHover={{ scale: 1.05, borderColor: "#6938EF" }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <span>Back to Top</span>
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowUp size={14} className="text-primary-400" />
            </motion.div>
          </motion.button>
        </div>
      </motion.div>
    </footer>
  );
};

// Starry background effect for footer
const StarryBackground = () => {
  // Generate fewer stars for a more subtle effect
  const stars = Array.from({ length: 50 }, (_, index) => ({
    id: index,
    size: Math.random() * 1.5 + 0.5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    opacity: Math.random() * 0.5 + 0.1,
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

export default Footer;
