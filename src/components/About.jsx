import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaUsers, FaLightbulb, FaGraduationCap, FaProjectDiagram, FaUniversity } from 'react-icons/fa';

function About() {
  return (
    <section id="about" className="about-section">
      <motion.div 
        className="section-content"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">About Me</h2>
        
        <div className="stats-grid">
          <motion.div 
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <FaGraduationCap className="stat-icon" />
            <h3>2028</h3>
            <p>Graduation Year</p>
          </motion.div>

          <motion.div 
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <FaProjectDiagram className="stat-icon" />
            <h3>5+</h3>
            <p>Projects</p>
          </motion.div>

          <motion.div 
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <FaUniversity className="stat-icon" />
            <h3>B.S.</h3>
            <p>Computer Science</p>
          </motion.div>
        </div>
        
        <motion.div 
          className="bio-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <p>
            I'm a Computer Science student at Northeastern University, passionate about building innovative software solutions. 
            With 5+ completed projects and experience in both frontend and backend development, I bring a strong foundation in 
            modern web technologies and software engineering practices.
          </p>
        </motion.div>

        <div className="focus-areas">
          <motion.div 
            className="focus-card technical"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >            <div className="focus-content">
              <div className="focus-icon">
                <FaCode />
              </div>
              <h3>Technical Passion</h3>
              <p className="focus-description">
                Dedicated to creating efficient, scalable solutions using modern technologies
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="focus-card community"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >            <div className="focus-content">
              <div className="focus-icon">
                <FaUsers />
              </div>
              <h3>Community Impact</h3>
              <p className="focus-description">
                Contributing to open-source projects and sharing knowledge with fellow developers
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="focus-card learning"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >            <div className="focus-content">
              <div className="focus-icon">
                <FaLightbulb />
              </div>
              <h3>Continuous Learning</h3>
              <p className="focus-description">
                Always exploring new technologies and best practices in software development
              </p>
            </div>
          </motion.div>        </div>
      </motion.div>
    </section>
  );
}

export default About;
