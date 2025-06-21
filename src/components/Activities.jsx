import React from 'react';

function Activities() {
  const activities = [
    {
      title: 'DraftKings Early Risers Program',
      role: 'Participant | May 2025',
      description: 'Selected for competitive early talent program focused on career exploration in tech, product, and data at DraftKings.',
      tags: ['Career Development', 'Mentorship', 'Tech Industry'],
      color: '#4285f4'
    },
    {
      title: 'NU-SAGE',
      role: 'Society of Asian Scientists and Engineers',
      description: 'Participated in workshops, networking events, and cultural programs to support Asian representation in STEM fields.',
      tags: ['STEM Advocacy', 'Networking', 'Community'],
      color: '#34A853'
    }
  ];

  return (
    <section id="activities" className="activities-section">
      <div className="section-header">
        <h2 className="section-title">Extracurricular Activities</h2>
        <p className="section-subtitle">Involvement in professional development and community engagement</p>
      </div>

      <div className="activities-grid">
        {activities.map((activity, index) => (
          <div 
            key={index} 
            className="activity-card"
            style={{ '--activity-color': activity.color }}
          >
            <div className="activity-content">
              <h3>{activity.title}</h3>
              <p className="activity-role">{activity.role}</p>
              <p className="activity-description">{activity.description}</p>
              <div className="activity-tags">
                {activity.tags.map((tag, i) => (
                  <span key={i} className="activity-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Activities;
