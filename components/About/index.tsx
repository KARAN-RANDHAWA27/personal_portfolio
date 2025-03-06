import React, { useEffect, useRef, useState } from "react";

const AboutMe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState({
    intro: false,
    technical: false,
    professional: false,
    outro: false,
    buttons: false,
  });

  // Set up Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetId = entry.target.id;
          setIsVisible((prev) => ({ ...prev, [targetId]: true }));
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe each section that needs to be animated
    const sections = contentRef.current?.querySelectorAll("[id]");
    if (sections) {
      sections.forEach((section) => {
        observer.observe(section);
      });
    }

    return () => {
      if (sections) {
        sections.forEach((section) => {
          observer.unobserve(section);
        });
      }
    };
  }, []);

  // Canvas animation setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient using your custom colors
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      gradient.addColorStop(0, "rgba(0, 150, 255, 0.3)"); // #0096FF (blue) with transparency
      gradient.addColorStop(0.5, "rgba(187, 100, 255, 0.2)"); // #BB64FF (purple) with transparency
      gradient.addColorStop(1, "rgba(67, 185, 185, 0.3)"); // #43B9B9 (teal) with transparency

      ctx.fillStyle = gradient;

      // Draw blob
      ctx.beginPath();

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.25;

      for (let angle = 0; angle < Math.PI * 2; angle += 0.01) {
        const xOffset = Math.cos(angle * 3 + time) * 50;
        const yOffset = Math.sin(angle * 2 + time) * 50;
        const x = cx + Math.cos(angle) * (radius + xOffset);
        const y = cy + Math.sin(angle) * (radius + yOffset);

        if (angle === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.closePath();
      ctx.fill();

      // Add constellation-like dots with your specific colors
      const dotCount = Math.min(100, Math.max(30, canvas.width / 10));
      const dotColors = [
        "rgba(41, 151, 255, 0.6)", // #2997ff (blue)
        "rgba(169, 114, 255, 0.6)", // #a972ff (purple)
        "rgba(67, 185, 185, 0.6)", // #43B9B9 (teal)
      ];

      for (let i = 0; i < dotCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * (canvas.width > 768 ? 1.5 : 1);
        const colorIndex = Math.floor(Math.random() * dotColors.length);

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = dotColors[colorIndex];
        ctx.fill();
      }

      time += 0.005;
      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black py-16 md:py-20 lg:py-28">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-white">
            <span
              style={{
                background:
                  "linear-gradient(97deg, #0096FF, #BB64FF 42%, #F2416B 74%, #EB7500)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Karan Randhawa
            </span>
          </h1>

          <h2
            className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8"
            style={{ color: "#a972ff" }}
          >
            Full-Stack Developer & Technology Consultant
          </h2>
        </div>

        <div
          ref={contentRef}
          className="backdrop-blur-md bg-white/5 rounded-xl p-5 sm:p-6 md:p-8 shadow-2xl border max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto text-left"
          style={{ borderColor: "rgba(41, 151, 255, 0.2)" }}
        >
          <div
            id="intro"
            className={`transition-all duration-1000 ease-in-out transform ${
              isVisible.intro
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-6">
              I specialize in developing innovative software solutions across
              multiple domains, with expertise in Full-Stack Development,
              Machine Learning, Data Science, and Blockchain technologies. With
              a proven track record in cloud architecture using AWS and
              extensive experience in mobile application development, I deliver
              scalable, efficient, and future-ready solutions that drive
              business value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div
              id="technical"
              className={`transition-all duration-1000 ease-in-out transform ${
                isVisible.technical
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <h3
                className="text-lg font-medium mb-3"
                style={{ color: "#2997ff" }}
              >
                Technical Expertise
              </h3>
              <ul className="space-y-1 text-white/80">
                <li>• Full-Stack Web Development with React & Node.js</li>
                <li>• Machine Learning & Data Science Implementation</li>
                <li>• Blockchain Smart Contract Development</li>
                <li>• Cloud Architecture & AWS Infrastructure</li>
                <li>• Native & Cross-Platform Mobile Applications</li>
              </ul>
            </div>

            <div
              id="professional"
              className={`transition-all duration-1000 ease-in-out transform ${
                isVisible.professional
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <h3
                className="text-lg font-medium mb-3"
                style={{ color: "#43B9B9" }}
              >
                Professional Approach
              </h3>
              <ul className="space-y-1 text-white/80">
                <li>• Solution-driven methodology with focus on ROI</li>
                <li>• Agile development with regular deliverables</li>
                <li>• Emphasis on clean, maintainable code</li>
                <li>• Clear communication throughout project lifecycle</li>
                <li>
                  • Continuous learning and implementation of best practices
                </li>
              </ul>
            </div>
          </div>

          <div
            id="outro"
            className={`transition-all duration-1000 ease-in-out transform ${
              isVisible.outro
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-6">
              Beyond my full-time role, I take on select freelance projects and
              consulting engagements where I can make a significant impact.
              I&apos;m passionate about leveraging emerging technologies to
              solve complex business challenges and create exceptional digital
              experiences.
            </p>
          </div>

          <div
            id="buttons"
            className={`flex flex-col sm:flex-row justify-center mt-8 sm:space-x-4 space-y-4 sm:space-y-0 transition-all duration-1000 ease-in-out transform ${
              isVisible.buttons
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            <button
              className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
              style={{ background: "#2997ff" }}
            >
              VIEW PORTFOLIO
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
            <button
              className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3 bg-transparent rounded-lg font-medium hover:bg-opacity-10 transition-colors flex items-center justify-center"
              style={{
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "#43B9B9",
                color: "#43B9B9",
              }}
            >
              CONTACT ME
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
