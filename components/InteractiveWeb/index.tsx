import React, { useEffect, useRef } from "react";

interface InteractiveWebProps {
  zIndex?: number;
  backgroundColor?: string;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  originalX: number;
  originalY: number;
}

interface Mouse {
  x: number;
  y: number;
  radius: number;
}

const InteractiveWeb: React.FC<InteractiveWebProps> = ({
  zIndex = -10,
  backgroundColor = "black",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<Mouse>({ x: 0, y: 0, radius: 100 });
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    // Calculate particle count based on screen size
    const getParticleCount = () => {
      const area = window.innerWidth * window.innerHeight;
      const baseCount = Math.floor(area / 10000); // One particle per 10000 pixels
      return Math.min(Math.max(baseCount, 50), 150); // Min 50, Max 150 particles
    };

    // Set canvas size with device pixel ratio
    const setCanvasSize = () => {
      if (!canvas) return;

      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.scale(pixelRatio, pixelRatio);

      // Reinitialize particles when resizing
      initParticles();
    };

    // Initialize particles
    const initParticles = () => {
      const particleCount = getParticleCount();
      const particles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          radius: Math.random() * 1.5 + 0.5, // Smaller particles for better performance
          vx: Math.random() * 1 - 0.5, // Reduced speed
          vy: Math.random() * 1 - 0.5, // Reduced speed
          originalX: Math.random() * window.innerWidth,
          originalY: Math.random() * window.innerHeight,
        });
      }

      particlesRef.current = particles;
    };

    // Calculate connection distance based on screen size
    const getConnectionDistance = () => {
      const minDimension = Math.min(window.innerWidth, window.innerHeight);
      return Math.min(minDimension * 0.15, 150); // 15% of screen size, max 150px
    };

    // Draw lines between nearby particles
    const connectParticles = (
      particles: Particle[],
      ctx: CanvasRenderingContext2D
    ) => {
      const connectionDistance = getConnectionDistance();

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${
              1 - distance / connectionDistance
            })`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop with performance optimization
    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particlesRef.current.forEach((particle) => {
        // Move particles
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off walls
        if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
        if (particle.y < 0 || particle.y > window.innerHeight)
          particle.vy *= -1;

        // Mouse interaction
        if (isDraggingRef.current) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseRef.current.radius) {
            const angle = Math.atan2(dy, dx);
            const force =
              (mouseRef.current.radius - distance) / mouseRef.current.radius;
            particle.x -= Math.cos(angle) * force * 2;
            particle.y -= Math.sin(angle) * force * 2;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.fill();
      });

      connectParticles(particlesRef.current, ctx);
      animationFrameId = requestAnimationFrame(animate);
    };

    // Event handlers with throttling
    let isThrottled = false;
    const throttleTime = 16; // ~60fps

    const handleInteraction = (x: number, y: number) => {
      if (!isThrottled) {
        mouseRef.current = {
          ...mouseRef.current,
          x,
          y,
        };
        isThrottled = true;
        setTimeout(() => {
          isThrottled = false;
        }, throttleTime);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleInteraction(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleInteraction(touch.clientX, touch.clientY);
    };

    const handleStart = () => {
      isDraggingRef.current = true;
    };

    const handleEnd = () => {
      isDraggingRef.current = false;
    };

    // Initialize
    setCanvasSize();
    animate();

    // Event listeners
    window.addEventListener("resize", setCanvasSize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleStart);
    canvas.addEventListener("mouseup", handleEnd);
    canvas.addEventListener("mouseleave", handleEnd);
    canvas.addEventListener("touchstart", handleStart);
    canvas.addEventListener("touchend", handleEnd);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasSize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleStart);
      canvas.removeEventListener("mouseup", handleEnd);
      canvas.removeEventListener("mouseleave", handleEnd);
      canvas.removeEventListener("touchstart", handleStart);
      canvas.removeEventListener("touchend", handleEnd);
      canvas.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          zIndex,
          backgroundColor,
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default InteractiveWeb;
