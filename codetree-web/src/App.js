import React, { useState, useEffect } from 'react';

function App() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      if (currentProgress <= 85) {
        currentProgress++;
        setProgress(currentProgress);
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: '🚀', name: 'Soluciones Innovadoras' },
    { icon: '💡', name: 'Tecnología de Punta' },
    { icon: '🎯', name: 'Resultados Garantizados' }
  ];

  return (
    <div className="construction-container">
      <div className="construction-content">
        {/* Logo */}
        <div className="construction-logo">
          <h1>Code<span>Tree</span></h1>
        </div>

        {/* Badge */}
        <div className="construction-badge">
          Próximamente
        </div>

        {/* Title */}
        <h2 className="construction-title">
          Estamos Construyendo Algo Increíble
        </h2>

        {/* Description */}
        <p className="construction-description">
          Nuestro sitio web está en desarrollo. Muy pronto tendremos una experiencia digital innovadora.
        </p>

        {/* Progress */}
        <div className="construction-progress">
          <div className="progress-bar-container">
            <div 
              className="progress-bar" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="progress-text">{progress}%</div>
        </div>

        {/* Features */}
        <div className="construction-features">
          {features.map((feature, index) => (
            <div key={index} className="feature">
              <div className="feature-icon">{feature.icon}</div>
              <h4>{feature.name}</h4>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="construction-contact">
          <p>¿Necesitas ayuda?</p>
          <div className="contact-emails">
            <a href="mailto:elmerurbina570@gmail.com">Elmer Urbina</a>
            <span>|</span>
            <a href="mailto:holmanrugama2006@gmail.com">Holman Rugama</a>
          </div>
        </div>

        {/* Footer */}
        <div className="construction-footer">
          <p>&copy; {new Date().getFullYear()} CodeTree. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
}

export default App;