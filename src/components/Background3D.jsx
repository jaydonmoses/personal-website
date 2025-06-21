import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

export default function Background3D() {
  const containerRef = useRef(null);
  const { isDark } = useTheme();
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const particlesRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    // Scene setup
    sceneRef.current = new THREE.Scene();
    
    // Camera setup with dynamic perspective
    const aspect = window.innerWidth / window.innerHeight;
    cameraRef.current = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    cameraRef.current.position.z = 30;

    // Renderer setup with transparency and anti-aliasing
    rendererRef.current = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(rendererRef.current.domElement);

    // Particle system setup
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Initialize particles with dynamic colors based on theme
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 100;
      positions[i3 + 1] = (Math.random() - 0.5) * 100;
      positions[i3 + 2] = (Math.random() - 0.5) * 100;

      velocities[i3] = (Math.random() - 0.5) * 0.05;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.05;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.05;

      const color = isDark ? 
        new THREE.Color(0.7 + Math.random() * 0.3, 0.7 + Math.random() * 0.3, 1) :
        new THREE.Color(0, 0.5 + Math.random() * 0.5, 1);
      
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    particlesRef.current = new THREE.Points(particlesGeometry, particlesMaterial);
    sceneRef.current.add(particlesRef.current);

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const positions = particlesRef.current.geometry.attributes.position.array;
      const colors = particlesRef.current.geometry.attributes.color.array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Update positions with velocities
        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];

        // Boundary check and wrap-around
        for (let j = 0; j < 3; j++) {
          if (Math.abs(positions[i3 + j]) > 50) {
            positions[i3 + j] *= -0.9;
            velocities[i3 + j] *= -1;
          }
        }

        // Color animation
        const time = Date.now() * 0.001;
        const pulseIntensity = 0.1;
        const initialColor = isDark ? 0.7 : 0.5;
        
        colors[i3] = initialColor + Math.sin(time + i) * pulseIntensity;
        colors[i3 + 1] = initialColor + Math.sin(time + i + 2) * pulseIntensity;
        colors[i3 + 2] = initialColor + Math.sin(time + i + 4) * pulseIntensity;
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.geometry.attributes.color.needsUpdate = true;

      // Gentle rotation
      particlesRef.current.rotation.y += 0.001;
      particlesRef.current.rotation.x += 0.0005;

      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (rendererRef.current && rendererRef.current.domElement && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      if (particlesRef.current) {
        if (particlesRef.current.geometry) particlesRef.current.geometry.dispose();
        if (particlesRef.current.material) particlesRef.current.material.dispose();
      }
    };
  }, [isDark]);

  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        opacity: 0.6,
        transition: 'opacity 0.5s ease'
      }}
    />
  );
}
