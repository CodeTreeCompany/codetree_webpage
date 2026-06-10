import React, { useEffect, useState, useRef } from 'react';
import Button from '../../common/button/Button';
import Modal from '../../common/ui/Modal';
import ContactForm from '../contact/ContactForm';
import styles from './Hero.module.css'; 

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Trigger animations when component mounts
    setIsVisible(true);
  }, []);

  // Force video to play once
  useEffect(() => {
    if (videoRef.current) {
      const playVideo = async () => {
        try {
          // Play the video
          await videoRef.current.play();
          
          // Stop the video after it plays once
          videoRef.current.addEventListener('ended', () => {
            videoRef.current.pause();
            videoRef.current.currentTime = 0; // Reset to beginning
          });
        } catch (error) {
          console.log('Video autoplay failed:', error);
        }
      };
      playVideo();
    }
  }, []);

  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  const handleViewServices = () => {
    window.location.href = '/servicios';
  };

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          {/* Left Content */}
          <div className={`${styles.heroContent} ${isVisible ? styles.animateIn : ''}`}>
            
            <h1 className={styles.title}>
              Transformamos tus ideas en 
              <span className={styles.gradientText}> soluciones tecnológicas</span>
            </h1>
            
            <p className={styles.description}>
              En CodeTree desarrollamos software a medida, aplicaciones web y móviles 
              con las últimas tecnologías. Impulsamos tu negocio hacia la transformación digital.
            </p>
            
            <div className={styles.ctaButtons}>
              <Button variant="primary" size="lg" onClick={openContactModal}>
                Comenzar Proyecto
              </Button>
              <Button variant="outline" size="lg" onClick={handleViewServices}>
                Ver Servicios
              </Button>
            </div>
            
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>50+</span>
                <span className={styles.statLabel}>Proyectos Exitosos</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>30+</span>
                <span className={styles.statLabel}>Clientes Satisfechos</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>5+</span>
                <span className={styles.statLabel}>Años de Experiencia</span>
              </div>
            </div>
          </div>
          
          {/* Right Content - Video */}
          <div className={`${styles.heroMedia} ${isVisible ? styles.animateIn : ''}`}>
            <div className={styles.videoWrapper}>
              {!isVideoLoaded && (
                <div className={styles.videoPlaceholder}>
                  <div className={styles.placeholderShimmer}></div>
                </div>
              )}
              <video 
                ref={videoRef}
                className={styles.video}
                autoPlay
                muted
                playsInline
                onLoadedData={() => setIsVideoLoaded(true)}
                onError={(e) => console.log('Video error:', e)}
              >
                <source src="/assets/hero-video.mp4" type="video/mp4" />
                <source src="/assets/hero-video.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
              
              {/* Floating elements for visual interest */}
              <div className={styles.floatingElement1}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="2"/>
                  <path d="M12 8V12L14 14" stroke="#10B981" strokeWidth="2"/>
                </svg>
              </div>
              <div className={styles.floatingElement2}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" fill="#4FD1A5"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className={styles.scrollIndicator}>
          <span className={styles.scrollText}>Desplázate</span>
          <div className={styles.scrollMouse}>
            <div className={styles.scrollWheel}></div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <Modal isOpen={isContactModalOpen} onClose={closeContactModal} title="Contáctanos">
        <ContactForm isModal={true} onSuccess={closeContactModal} />
      </Modal>
    </>
  );
};

export default Hero;