import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaPhone, 
  FaLinkedin, 
  FaGithub, 
  FaDownload, 
  FaCheck 
} from 'react-icons/fa';
function Contact() {
  const { isDark } = useTheme();
  const email = 'jaydon.10.moses@gmail.com';
  const controls = useAnimation();
  const sectionRef = useRef(null);

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  const handleDownloadCV = () => {
    window.open('/resume.pdf', '_blank');
  };

  const availabilityItems = [
    'Full-time positions (Post-graduation 2028)',
    'Internship opportunities',
    'Research collaborations',
    'Freelance projects'
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    }
  };

  return (    <section id="contact" className="contact-section" ref={sectionRef}>
      
      <motion.div 
        className="section-header"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.h2 className="section-title" variants={itemVariants}>
          Let's Connect
        </motion.h2>
        <motion.p className="section-subtitle" variants={itemVariants}>
          I'm always interested in new opportunities and collaborations. Feel free to reach 
          out if you'd like to discuss projects, research, or potential opportunities.
        </motion.p>
      </motion.div>

      <motion.div 
        className="contact-grid"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div 
          className="contact-card info-card"
          variants={cardVariants}
          whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
        >
          <h3>Contact Information</h3>
          
          <div className="contact-details">
            <motion.div 
              className="contact-item"
              whileHover={{ x: 10 }}
            >
              <motion.div 
                className="icon-wrapper"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ type: "spring" }}
              >
                <FaMapMarkerAlt />
              </motion.div>
              <div className="contact-text">
                <span className="label">Location</span>
                <span className="value">Boston, MA</span>
              </div>
            </motion.div>

            <motion.div 
              className="contact-item"
              whileHover={{ x: 10 }}
            >
              <motion.div 
                className="icon-wrapper"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ type: "spring" }}
              >
                <FaEnvelope />
              </motion.div>
              <div className="contact-text">
                <span className="label">Email</span>
                <span className="value">{email}</span>
              </div>
            </motion.div>

            <motion.div 
              className="contact-item"
              whileHover={{ x: 10 }}
            >
              <motion.div 
                className="icon-wrapper"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ type: "spring" }}
              >
                <FaPhone />
              </motion.div>
              <div className="contact-text">
                <span className="label">Phone</span>
                <span className="value">+1 (978) 594-7083</span>
              </div>
            </motion.div>
          </div>

          <div className="connect-section">
            <h4>Connect with me</h4>
            <div className="social-buttons">
              <motion.a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-button"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaLinkedin />
              </motion.a>
              <motion.a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-button"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaGithub />
              </motion.a>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="contact-card action-card"
          variants={cardVariants}
          whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
        >
          <h3>Interested in Collaborating?</h3>
          <p>
            Whether you're looking for a dedicated team member, a research collaborator, 
            or someone passionate about full-stack development and innovative solutions, 
            I'd love to hear from you.
          </p>
          
          <div className="action-buttons">
            <motion.button 
              className="btn-primary" 
              onClick={handleEmailClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEnvelope /> Send Me an Email
            </motion.button>
            <motion.button 
              className="btn-secondary" 
              onClick={handleDownloadCV}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload /> Download My CV
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          className="contact-card availability-card"
          variants={cardVariants}
          whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
        >
          <h3>Available For</h3>
          <ul className="availability-list">
            {availabilityItems.map((item, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10 }}
              >
                <motion.span
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaCheck className="check-icon" />
                </motion.span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .contact-section {
          position: relative;
          overflow: hidden;
          padding: 4rem 2rem;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 2rem auto;
          position: relative;
          z-index: 1;
        }        .contact-card {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 12px;
          padding: 2rem;
          transition: all var(--transition-medium);
        }

        .contact-item {
          display: flex;
          align-items: center;
          margin: 1rem 0;
          padding: 0.5rem;
          border-radius: 0.5rem;
          transition: background-color 0.3s ease;
        }

        .contact-item:hover {
          background: var(--bg-primary);
        }

        .icon-wrapper {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-primary);
          border: 1px solid var(--card-border);
          margin-right: 1rem;
          transition: all var(--transition-medium);
        }

        .social-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }        .social-button {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-primary);
          border: 1px solid var(--card-border);
          color: var(--text-primary);
          text-decoration: none;
          transition: all var(--transition-medium);
        }

        .btn-primary,
        .btn-secondary {
          padding: 0.8rem 1.5rem;
          border-radius: 0.5rem;
          border: none;
          cursor: pointer;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }        .btn-primary {
          background: var(--accent-color);
          color: white;
          border: 1px solid var(--accent-color);
        }.btn-secondary {
          background: var(--bg-primary);
          color: var(--text-primary);
          border: 1px solid var(--card-border);
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          flex-wrap: wrap;
        }

        .availability-list li {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1rem 0;
          padding: 0.5rem;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
        }

        .check-icon {
          color: var(--primary-color);
        }

        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }

          .action-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
}

export default Contact;
