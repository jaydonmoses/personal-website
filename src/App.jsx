import React, { useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import FadeInSection from './components/FadeInSection';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Activities from './components/Activities';
import Contact from './components/Contact';

// Separate AppContent component to use the theme context
import { motion } from 'framer-motion';
gith
function AppContent() {
  const { isDark } = useTheme();
  
  useEffect(() => {
    console.log('App mounted, theme:', isDark ? 'dark' : 'light');
  }, []);

  return (
    <div className={`app ${isDark ? 'dark' : ''}`}>
      <Navbar />      <main className="main-content">
        <div className="hero-wrapper">
          <Hero />
        </div>
        <FadeInSection>
          <About />
        </FadeInSection>
        <FadeInSection delay={0.2}>
          <Education />
        </FadeInSection>
        <FadeInSection delay={0.3}>
          <Experience />
        </FadeInSection>
        <FadeInSection delay={0.4}>
          <Projects />
        </FadeInSection>
        <FadeInSection delay={0.5}>
          <Skills />
        </FadeInSection>
        <FadeInSection delay={0.6}>
          <Activities />
        </FadeInSection>
        <FadeInSection delay={0.7}>
          <Contact />
        </FadeInSection>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
