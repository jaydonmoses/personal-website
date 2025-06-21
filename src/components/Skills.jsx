import React from 'react';

function Skills() {
  const programmingLanguages = [
    { name: 'Python', level: 'Advanced' },
    { name: 'Java', level: 'Intermediate' },
    { name: 'C#', level: 'Intermediate' },
    { name: 'SQL', level: 'Intermediate' },
    { name: 'HTML', level: 'Advanced' },
    { name: 'CSS', level: 'Advanced' },
    { name: 'JavaScript', level: 'Advanced' },
    { name: 'React', level: 'Advanced' },
    { name: 'Tailwind CSS', level: 'Intermediate' }
  ];

  const technologies = [
    { name: 'Git', level: 'Advanced' },
    { name: 'GitHub', level: 'Advanced' },
    { name: 'VS Code', level: 'Advanced' },
    { name: 'Unity', level: 'Intermediate' },
    { name: 'Flask', level: 'Intermediate' },
    { name: 'MySQL', level: 'Intermediate' },
    { name: 'PostgreSQL', level: 'Intermediate' }
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="section-header">
        <h2 className="section-title">Technical Skills</h2>
        <p className="section-subtitle">Programming languages and technologies I work with</p>
      </div>

      <div className="skills-container">
        <div className="skills-category">
          <h3>Programming Languages</h3>
          <div className="skills-grid">
            {programmingLanguages.map((skill, index) => (
              <div key={index} className="skill-item">
                <span className="skill-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="skills-category">
          <h3>Technologies & Tools</h3>
          <div className="skills-grid">
            {technologies.map((tech, index) => (
              <div key={index} className="skill-item">
                <span className="skill-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
