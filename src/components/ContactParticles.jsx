import React, { useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ContactParticles() {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const createParticles = () => {
      particles.current = [];
      const numberOfParticles = 50;
      
      for (let i = 0; i < numberOfParticles; i++) {
        particles.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2 + 1,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          originalRadius: Math.random() * 2 + 1
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw connecting lines first
      for (let i = 0; i < particles.current.length; i++) {
        const p1 = particles.current[i];
        for (let j = i + 1; j < particles.current.length; j++) {
          const p2 = particles.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark ?
              `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})` :
              `rgba(0, 123, 255, ${0.1 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        }
      }
      
      // Draw and update particles
      particles.current.forEach(particle => {
        const dx = mouse.current.x - particle.x;
        const dy = mouse.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;
        
        // Interactive radius and color based on mouse proximity
        if (distance < maxDistance) {
          const scale = (maxDistance - distance) / maxDistance;
          particle.radius = particle.originalRadius * (1 + scale * 2);
          ctx.fillStyle = isDark ? 
            `rgba(255, 255, 255, ${0.3 + scale * 0.7})` : 
            `rgba(0, 123, 255, ${0.3 + scale * 0.7})`;
        } else {
          particle.radius = particle.originalRadius;
          ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 123, 255, 0.3)';
        }
        
        // Apply subtle attraction to mouse
        if (distance < maxDistance) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (maxDistance - distance) / maxDistance;
          particle.vx += forceDirectionX * force * 0.2;
          particle.vy += forceDirectionY * force * 0.2;
        }

        // Update position with momentum
        particle.vx *= 0.95; // Add friction
        particle.vy *= 0.95;
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(width, particle.x));
        particle.y = Math.max(0, Math.min(height, particle.y));

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const animate = () => {
      drawParticles();
      animationFrameId.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createParticles();
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };

    createParticles();
    animate();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="contact-particles"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
}
