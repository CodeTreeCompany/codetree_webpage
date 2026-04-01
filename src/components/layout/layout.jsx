import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/layout/layout.css';

const Layout = () => {
  return (
    <div className="layout-wrapper">
      {/* Simple Building Message */}
      <Container className="building-container">
        <Row className="min-vh-100 align-items-center justify-content-center">
          <Col lg={8} xl={6} className="text-center">
            <div className="building-content">
              {/* Animated Icon */}
              <div className="building-icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L3 7L12 12L21 7L12 2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M3 12L12 17L21 12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M3 17L12 22L21 17" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <circle cx="12" cy="12" r="2" fill="currentColor"/>
                </svg>
              </div>

              {/* Main Message */}
              <h1 className="building-title">
                Estamos Construyendo
                <span className="gradient-text"> Algo Increíble</span>
              </h1>
              
              <p className="building-description">
                CodeTree está trabajando en una experiencia digital completamente nueva. 
                Pronto tendremos novedades para ti.
              </p>

              {/* Tech Tags - Using JetBrains Mono */}
              <div className="tech-stack">
                <span className="tech-stack-tag">SaaS</span>
                <span className="tech-stack-tag">React</span>
                <span className="tech-stack-tag">Node.js</span>
                <span className="tech-stack-tag">Python</span>
                <span className="tech-stack-tag">AI/ML</span>
                <span className="tech-stack-tag">Cloud</span>
              </div>

              {/* Status Indicator */}
              <div className="status-indicator">
                <span className="status-dot"></span>
                <span className="status-text">En desarrollo activo</span>
              </div>

              {/* Contact Info */}
              <div className="contact-info-simple">
                <p className="contact-email">📧 codetreecompany@gmail.com</p>
                <p className="contact-social">
                  <span className="social-link">GitHub</span>
                  <span className="social-separator">•</span>
                  <span className="social-link">LinkedIn</span>
                  <span className="social-separator">•</span>
                  <span className="social-link">Twitter</span>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Layout;