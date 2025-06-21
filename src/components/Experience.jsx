import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCode } from 'react-icons/fa';

function Experience() {  const experiences = [
    {
      title: 'Front End Engineer Intern',
      company: 'Next Level Data',
      logoColor: '#4285f4',
      period: 'Summer 2024',
      description: 'Led development of responsive web applications using modern frontend technologies, optimizing performance and user experience.',
      skills: ['React', 'TypeScript', 'TailwindCSS', 'Redux', 'RESTful APIs', 'Git']
    },
    {
      title: 'Junior Engineer',
      company: 'UpgradeLLC',
      logoColor: '#34a853',
      period: '2024',
      description: 'Engineered backend services using FastAPI and SQL databases, contributing to core infrastructure and improving system efficiency.',
      skills: ['FastAPI', 'Python', 'PostgreSQL', 'Database Design', 'API Development', 'Docker']
    }
  ];

  return (
    <section id="experience" className="experience-section">
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">Professional Experience</h2>
        <p className="section-subtitle">My journey in software development</p>
      </motion.div>

      <div className="experience-timeline">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="experience-card"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
          >            <motion.div 
              className="company-logo"
              style={{ background: `linear-gradient(135deg, ${exp.logoColor}, ${exp.logoColor}cc)` }}
              whileHover={{ scale: 1.1, rotate: 10 }}
            >
              {exp.company.charAt(0)}
            </motion.div>
            <div className="experience-content">
              <motion.h3 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {exp.title}
              </motion.h3>
              <motion.h4 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {exp.company}
              </motion.h4>
              <motion.div 
                className="experience-period"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {exp.period}
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {exp.description}
              </motion.p>
              <div className="skills-used">
                {exp.skills.map((skill, skillIndex) => (
                  <motion.span 
                    key={skillIndex} 
                    className="skill-tag"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + skillIndex * 0.1 }}
                    whileHover={{ y: -2, scale: 1.05 }}
                  >
                    <FaCode /> {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Experience;
