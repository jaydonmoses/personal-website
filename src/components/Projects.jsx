import React, { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaStar, FaSpinner, FaCode, FaGamepad, FaLink } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchGithubProjects } from '../utils/github';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const githubProjects = await fetchGithubProjects();
        setProjects(githubProjects);
      } catch (err) {
        console.error('Error loading projects:', err);
        setError(err.message || 'Failed to load projects. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount(count => count + 1);
  };

  const focusAreas = [
    {
      title: 'Technical Focus',
      subtitle: 'Full-Stack Development',
      icon: <FaCode />,
      description: 'Specializing in web development, API integration, and responsive UI design. Experience with modern frontend frameworks and backend technologies.',
      color: '#4285f4',
      tags: ['React', 'Node.js', 'APIs', 'Full-Stack']
    },
    {
      title: 'Game Development',
      subtitle: 'Unity & C# Expertise',
      icon: <FaGamepad />,
      description: 'Experience building real-time multiplayer games with Unity engine, implementing physics-based controls and network programming.',
      color: '#34A853',
      tags: ['Unity', 'C#', 'UNet', 'Physics']
    }
  ];
  const featuredProjects = [];

  const renderProjectCard = (project, isFeatured = false) => (
    <motion.div
      key={project.id || project.title}
      className="project-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      layout
    >
      <div className="project-header">
        <FaGithub className="project-icon" />
        {project.stars && (
          <div className="project-stats">
            <span className="stars">
              <FaStar /> {project.stars}
            </span>
          </div>
        )}
      </div>

      <h3 className="project-title">
        {project.name || project.title}
      </h3>
      
      {project.mainLanguage && (
        <div className="project-tech">{project.mainLanguage}</div>
      )}
      
      <p className="project-description">
        {project.description}
      </p>
      
      <div className="project-tags">
        {project.languages && project.languages.map((lang, index) => (
          <motion.span
            key={index}
            className="tag tech-tag"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {lang}
          </motion.span>
        ))}
        {project.topics && project.topics.map((topic, index) => (
          <motion.span
            key={`topic-${index}`}
            className="tag topic-tag"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {topic}
          </motion.span>
        ))}
      </div>

      <div className="project-buttons">
        <motion.a
          href={project.url || project.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaGithub /> View Source
        </motion.a>
        {(project.homepage || project.liveUrl) && (
          <motion.a
            href={project.homepage || project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaExternalLinkAlt /> Live Demo
          </motion.a>
        )}
      </div>
    </motion.div>
  );

  if (isLoading) {
    return (
      <section id="projects" className="projects-section">
        <div className="loading-container">
          <FaSpinner className="loading-spinner" />
          <p>Loading projects...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="projects-section">
        <div className="error-container">
          <p>{error}</p>
          <motion.button
            className="btn btn-primary retry-button"
            onClick={handleRetry}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
          </motion.button>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="projects-section">
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">
          A selection of my recent development work
        </p>
      </motion.div>

      <div className="projects-grid">
        {/* Featured projects first */}
        {featuredProjects.map(project => renderProjectCard(project, true))}
        
        {/* GitHub projects */}
        {projects.map(project => renderProjectCard(project))}
      </div>

      <div className="focus-areas">
        {focusAreas.map((area, index) => (
          <motion.div
            key={index}
            className="focus-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="focus-icon" style={{ backgroundColor: area.color }}>
              {area.icon}
            </div>
            <div className="focus-content">
              <h3>{area.title}</h3>
              <h4>{area.subtitle}</h4>
              <p>{area.description}</p>
              <div className="focus-tags">
                {area.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
