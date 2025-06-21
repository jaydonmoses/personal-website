import React from 'react';

function Education() {
  return (
    <section id="education" className="education-section">
      <div className="section-header">
        <h2 className="section-title">Education</h2>
        <p className="section-subtitle">Academic foundation and achievements</p>
      </div>

      <div className="education-card">
        <div className="education-header">
          <div className="school-logo">
            <div className="logo-placeholder">NU</div>
          </div>
          <div className="school-info">
            <h3>Northeastern University</h3>
            <p className="degree">Bachelor of Science in Computer Science</p>
          </div>
          <div className="education-meta">
            <span className="location">Boston, MA</span>
            <span className="duration">Expected May 2028</span>
          </div>
        </div>

        <div className="coursework">
          <h4>Relevant Coursework</h4>
          <div className="course-tags">
            <span className="course-tag">Fundamentals of Computer Science 1 & 2</span>
            <span className="course-tag">Discrete Structures</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
