// src/pages/Projects/index.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaChevronLeft, FaChevronRight, FaVideo, FaPlay, FaPause, FaWhatsapp } from 'react-icons/fa';
import { projectsData, categories } from './projectsData';
import styles from './Projects.module.css';


const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const carouselIntervalRef = useRef(null);
  const videoRef = useRef(null);

  const filteredProjects = selectedCategory === "all" 
    ? projectsData 
    : projectsData.filter(project => project.category === selectedCategory);

  // Get the first media (image or video) for card display
  const getCardMedia = (project) => {
    if (project.images && project.images.length > 0 && project.images[0]) {
      return { type: 'image', src: project.images[0] };
    } else if (project.videos && project.videos.length > 0 && project.videos[0]) {
      return { type: 'video', src: project.videos[0] };
    }
    return { type: 'image', src: '/assets/placeholder.jpg' };
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setCurrentMediaIndex(0);
    setIsPlaying(true);
    setIsVideoPlaying(false);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (carouselIntervalRef.current) {
      clearInterval(carouselIntervalRef.current);
    }
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setSelectedProject(null);
    setIsPlaying(true);
    setIsVideoPlaying(false);
    document.body.style.overflow = 'unset';
  };

  const handleRequestProject = (projectName) => {
    const message = `Hola! 👋 Me interesa el proyecto "${projectName}" que vi en CodeTree. ¿Podrían darme más información sobre cómo puedo obtener un proyecto similar?`;
    window.open(`https://wa.me/50557893565?text=${encodeURIComponent(message)}`, '_blank');
  };

  const nextMedia = useCallback(() => {
    if (!selectedProject) return;
    const totalMedia = (selectedProject.images?.length || 0) + (selectedProject.videos?.length || 0);
    if (totalMedia === 0) return;
    setCurrentMediaIndex((prev) => (prev + 1) % totalMedia);
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [selectedProject]);

  const prevMedia = () => {
    if (!selectedProject) return;
    const totalMedia = (selectedProject.images?.length || 0) + (selectedProject.videos?.length || 0);
    if (totalMedia === 0) return;
    setCurrentMediaIndex((prev) => (prev - 1 + totalMedia) % totalMedia);
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const startAutoPlay = useCallback(() => {
    if (carouselIntervalRef.current) {
      clearInterval(carouselIntervalRef.current);
    }
    const totalMedia = (selectedProject?.images?.length || 0) + (selectedProject?.videos?.length || 0);
    if (isPlaying && selectedProject && !isVideoPlaying && totalMedia > 1) {
      carouselIntervalRef.current = setInterval(() => {
        setCurrentMediaIndex((prev) => {
          const total = (selectedProject.images?.length || 0) + (selectedProject.videos?.length || 0);
          return (prev + 1) % total;
        });
      }, 8000);
    }
  }, [isPlaying, selectedProject, isVideoPlaying]);

  useEffect(() => {
    const totalMedia = (selectedProject?.images?.length || 0) + (selectedProject?.videos?.length || 0);
    if (selectedProject && isPlaying && !isVideoPlaying && totalMedia > 1) {
      startAutoPlay();
    }
    return () => {
      if (carouselIntervalRef.current) {
        clearInterval(carouselIntervalRef.current);
      }
    };
  }, [selectedProject, isPlaying, isVideoPlaying, startAutoPlay]);

  useEffect(() => {
    if (selectedProject && videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVideoPlaying, selectedProject, currentMediaIndex]);

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  const getMediaAtCurrentIndex = () => {
    if (!selectedProject) return null;
    const totalImages = selectedProject.images?.length || 0;
    const totalVideos = selectedProject.videos?.length || 0;
    
    if (currentMediaIndex < totalImages) {
      return { type: 'image', src: selectedProject.images[currentMediaIndex] };
    } else if (currentMediaIndex < totalImages + totalVideos) {
      const videoIndex = currentMediaIndex - totalImages;
      return { type: 'video', src: selectedProject.videos[videoIndex] };
    }
    return { type: 'image', src: '/assets/placeholder.jpg' };
  };

  const currentMedia = getMediaAtCurrentIndex();
  const totalMediaCount = (selectedProject?.images?.length || 0) + (selectedProject?.videos?.length || 0);

  const handleVideoEnded = () => {
    nextMedia();
  };

  return (
    <div className={styles.projectsPage}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Nuestros <span className={styles.gradientText}>Proyectos</span></h1>
          <p className={styles.heroSubtitle}>
            Descubre las soluciones innovadoras que hemos desarrollado para nuestros clientes
          </p>
        </div>
      </div>

      <div className={styles.container}>
        {/* Category Filters */}
        <div className={styles.categories}>
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`${styles.categoryBtn} ${selectedCategory === cat.id ? styles.active : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span className={styles.categoryIcon}>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className={styles.projectsGrid}>
          {filteredProjects.map((project, index) => {
            const cardMedia = getCardMedia(project);
            return (
              <div 
                key={project.id} 
                className={styles.projectCard}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.cardImage}>
                  {cardMedia.type === 'image' ? (
                    <img src={cardMedia.src} alt={project.name} />
                  ) : (
                    <div className={styles.videoPlaceholder}>
                      <FaVideo className={styles.videoIcon} />
                    </div>
                  )}
                  <div className={styles.cardCategory}>{project.category}</div>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{project.name}</h3>
                  <p className={styles.cardDescription}>{project.shortDescription}</p>
                  <div className={styles.cardStatus}>
                    <span className={`${styles.statusBadge} ${project.status === 'Completado' ? styles.completed : styles.development}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className={styles.cardButtons}>
                    <button className={styles.seeMoreBtn} onClick={() => openModal(project)}>
                      Ver más <span className={styles.btnArrow}>→</span>
                    </button>
                    <button 
                      className={styles.requestBtn} 
                      onClick={() => handleRequestProject(project.name)}
                    >
                      <FaWhatsapp /> Quiero uno así
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeModal}>
              <FaTimes />
            </button>

            {/* Carousel */}
            {totalMediaCount > 0 && (
              <div className={styles.carouselContainer}>
                <div className={styles.carousel}>
                  {currentMedia?.type === 'image' ? (
                    <img src={currentMedia.src} alt={selectedProject.name} className={styles.carouselImage} />
                  ) : currentMedia?.type === 'video' ? (
                    <video
                      ref={videoRef}
                      src={currentMedia.src}
                      className={styles.carouselVideo}
                      onEnded={handleVideoEnded}
                      onPlay={() => setIsVideoPlaying(true)}
                      onPause={() => setIsVideoPlaying(false)}
                      controls
                    />
                  ) : (
                    <div className={styles.noMedia}>No media available</div>
                  )}
                </div>
                
                {totalMediaCount > 1 && (
                  <>
                    <button className={styles.carouselBtnPrev} onClick={prevMedia}>
                      <FaChevronLeft />
                    </button>
                    <button className={styles.carouselBtnNext} onClick={nextMedia}>
                      <FaChevronRight />
                    </button>
                  </>
                )}
                
                {totalMediaCount > 1 && (
                  <div className={styles.carouselControls}>
                    <button className={styles.playPauseBtn} onClick={toggleAutoPlay}>
                      {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    <div className={styles.carouselDots}>
                      {[...Array(totalMediaCount)].map((_, idx) => (
                        <button
                          key={idx}
                          className={`${styles.dot} ${currentMediaIndex === idx ? styles.active : ''}`}
                          onClick={() => {
                            setCurrentMediaIndex(idx);
                            setIsVideoPlaying(false);
                            if (videoRef.current) videoRef.current.pause();
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Project Info */}
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>{selectedProject.name}</h2>
                <span className={styles.modalCategory}>{selectedProject.category}</span>
              </div>
              
              <p className={styles.modalDescription}>{selectedProject.longDescription}</p>
              
              <div className={styles.modalDetails}>
                <div className={styles.detailSection}>
                  <h4>Tecnologías utilizadas</h4>
                  <div className={styles.techList}>
                    {selectedProject.technologies.map((tech, idx) => (
                      <span key={idx} className={styles.techBadge}>{tech}</span>
                    ))}
                  </div>
                </div>
                
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Estado:</span>
                    <span className={`${styles.detailValue} ${selectedProject.status === 'Completado' ? styles.completedText : styles.developmentText}`}>
                      {selectedProject.status}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Fecha:</span>
                    <span className={styles.detailValue}>{selectedProject.completionDate}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Cliente:</span>
                    <span className={styles.detailValue}>{selectedProject.client}</span>
                  </div>
                </div>
                
                <div className={styles.detailSection}>
                  <h4>Desafío</h4>
                  <p>{selectedProject.challenge}</p>
                </div>
                
                <div className={styles.detailSection}>
                  <h4>Solución</h4>
                  <p>{selectedProject.solution}</p>
                </div>
                
                <div className={styles.impactSection}>
                  <h4>Impacto</h4>
                  <p>{selectedProject.impact}</p>
                </div>
              </div>
              
              <div className={styles.modalFooter}>
                <button 
                  className={styles.requestNowBtn}
                  onClick={() => handleRequestProject(selectedProject.name)}
                >
                  <FaWhatsapp /> Quiero un proyecto así
                </button>
                {selectedProject.demoUrl && (
                  <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer" className={styles.demoLink}>
                    <FaExternalLinkAlt /> Ver Demo
                  </a>
                )}
                {selectedProject.repoUrl && (
                  <a href={selectedProject.repoUrl} target="_blank" rel="noopener noreferrer" className={styles.repoLink}>
                    <FaGithub /> Ver Repositorio
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;