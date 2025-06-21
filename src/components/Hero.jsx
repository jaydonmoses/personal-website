import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Background3D from './Background3D';

function Hero() {
  const [profileUrl, setProfileUrl] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/users/jaydonmoses')
      .then(response => response.json())
      .then(data => {
        setProfileUrl(data.avatar_url);
      })
      .catch(error => console.error('Error fetching GitHub profile:', error));
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-background">
        <Background3D />
      </div>
      
      <div className="hero-content">
        <motion.div 
          className="hero-text"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 variants={fadeInUp}>
            Hi, I'm <span className="highlight">Jaydon Moses</span>
          </motion.h1>
          
          <motion.div 
            className="role-container"
            variants={fadeInUp}
          >
            <div className="role-title">Front End Engineer @ Next Level Data</div>
            <div className="role-subtitle">Computer Science @ Northeastern University</div>
          </motion.div>

          <motion.div 
            className="hero-actions"
            variants={fadeInUp}
          >
            <div className="cta-buttons">
              <a href="#projects" className="cta-primary">View Projects</a>
              <a href="#contact" className="cta-secondary">Contact Me</a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {profileUrl && (            <div className="profile-wrapper">
              <motion.img 
                src={profileUrl} 
                alt="Jaydon Moses"
                className="profile-image"
                animate={{ 
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          )}

          <motion.div 
            className="social-links"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <a 
              href="https://github.com/jaydonmoses" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              <FaGithub />
            </a>
            <a 
              href="https://linkedin.com/in/jaydonmoses" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              <FaLinkedin />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
