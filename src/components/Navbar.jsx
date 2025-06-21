import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-left">
          <span className="nav-name">Jaydon Moses</span>
        </div>
        <div className="nav-links">
          <button 
            onClick={toggleTheme} 
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {isDark ? <FiSun className="theme-icon" /> : <FiMoon className="theme-icon" />}
          </button>
          <button 
            className="menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            Menu {isMenuOpen ? '▴' : '▾'}
          </button>
          <div className={`dropdown-content ${isMenuOpen ? 'show' : ''}`}>
            <a href="#about">About</a>
            <a href="#education">Education</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#activities">Activities</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
