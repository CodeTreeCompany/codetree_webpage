import React from 'react';
import '../styles/components/main_content.css';

const MainContent = () => {
  return (
    <div className="main-content">
      {/* Animated background elements */}
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>
      
      <div className="content-wrapper">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="logo-tree">
            <div className="tree-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L3 7L12 12L21 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 12L12 17L21 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 17L12 22L21 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="2" fill="currentColor"/>
              </svg>
            </div>
          </div>
          
          <h1 className="main-title">
            <span className="title-text">Bienvenido a</span>
            <span className="brand-name">CodeTree</span>
          </h1>
          
          <p className="slogan">Innovación digital que hace crecer tu negocio</p>
          
          <div className="cta-buttons">
            <button className="cta-primary">Conoce Nuestros Servicios</button>
            <button className="cta-secondary">Contáctanos</button>
          </div>
        </div>

        {/* Services Section */}
        <div className="services-section">
          <h2 className="section-title">Nuestros Servicios</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🚀</div>
              <h3>SaaS</h3>
              <p>Soluciones escalables en la nube para tu negocio</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📱</div>
              <h3>Aplicaciones Móviles</h3>
              <p>Apps nativas y multiplataforma para iOS y Android</p>
            </div>
            <div className="service-card">
              <div className="service-icon">💻</div>
              <h3>Apps de Escritorio</h3>
              <p>Software profesional para Windows, Mac y Linux</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🤖</div>
              <h3>Inteligencia Artificial</h3>
              <p>Soluciones con machine learning y IA generativa</p>
            </div>
            <div className="service-card">
              <div className="service-icon">⚙️</div>
              <h3>Automatización</h3>
              <p>Optimización de procesos con RPA y workflows</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📊</div>
              <h3>Análisis de Datos</h3>
              <p>Business intelligence y visualización de datos</p>
            </div>
          </div>
        </div>

    
      </div>
    </div>
  );
};

export default MainContent;