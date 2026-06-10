import React, { useEffect, useState, useRef } from 'react';
import { 
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar,
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaUserCircle
} from 'react-icons/fa';
import styles from './ClientSay.module.css';

const ClientSay = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const sectionRef = useRef(null);
  const autoPlayRef = useRef(null);


  // Testimonial messages (fallback if API fails)
  const testimonialMessages = [
    "Excelente servicio, el equipo de CodeTree superó nuestras expectativas. La plataforma que desarrollaron transformó completamente nuestra operación.",
    "Increíble la calidad del trabajo. Muy profesionales y siempre atentos a nuestras necesidades. 100% recomendados.",
    "El mejor equipo de desarrollo con el que hemos trabajado. Cumplieron todos los plazos y el resultado fue espectacular.",
    "Gracias a CodeTree, nuestra empresa logró la transformación digital que necesitábamos. El soporte post-venta es excepcional.",
    "Profesionales comprometidos con la calidad. La app móvil que desarrollaron es intuitiva y nuestros usuarios están encantados.",
    "La implementación del sistema IoT revolucionó nuestro monitoreo ambiental. Los dashboards en tiempo real son increíbles.",
    "Excelente comunicación y entregas a tiempo. El software de gestión contable nos ha ahorrado horas de trabajo manual.",
    "El equipo de CodeTree entendió perfectamente nuestras necesidades y nos entregó una solución escalable y segura."
  ];

  const ratings = [5, 5, 4.5, 5, 4.5, 5, 4, 5];
  const roles = [
    "CEO, AgroTech Solutions",
    "Director de Tecnología, Innovación Corp",
    "Gerente General, PYME Group",
    "CTO, Digital Factory",
    "Product Manager, StartupHub",
    "Operations Director, SmartFarm",
    "Contador General, Contal SA",
    "Gerente de TI, Logística Plus"
  ];

  // Fallback data in case API fails
  const getFallbackTestimonials = () => {
    console.log('📋 Using fallback testimonial data');
    const fallbackNames = [
      "María González", "Carlos Rodríguez", "Ana Martínez", 
      "José Pérez", "Laura Sánchez", "Pedro Gómez", 
      "Carmen López", "David Ruiz"
    ];
    const fallbackCompanies = [
      "AgroTech Solutions", "Innovación Corp", "PYME Group",
      "Digital Factory", "StartupHub", "SmartFarm",
      "Contal SA", "Logística Plus"
    ];
    
    return fallbackNames.slice(0, 8).map((name, index) => ({
      id: index + 1,
      name: name,
      username: name.toLowerCase().replace(' ', '.'),
      email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
      company: fallbackCompanies[index % fallbackCompanies.length],
      role: roles[index % roles.length],
      message: testimonialMessages[index % testimonialMessages.length],
      rating: ratings[index % ratings.length],
      avatar: `https://ui-avatars.com/api/?background=10B981&color=fff&name=${encodeURIComponent(name)}`,
      website: `www.${name.toLowerCase().replace(' ', '')}.com`,
      phone: '+505 1234 5678'
    }));
  };

  useEffect(() => {
   
    const fetchUsers = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const users = await response.json();
        
        // Combine user data with custom testimonial messages
        const combinedTestimonials = users.slice(0, 8).map((user, index) => {
          return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            company: user.company?.name || 'Empresa',
            role: roles[index % roles.length],
            message: testimonialMessages[index % testimonialMessages.length],
            rating: ratings[index % ratings.length],
            avatar: `https://ui-avatars.com/api/?background=10B981&color=fff&name=${encodeURIComponent(user.name)}`,
            website: user.website,
            phone: user.phone
          };
        });
        
        setTestimonials(combinedTestimonials);
        setLoading(false);
        
      } catch (err) {
        
        // Use fallback data
        const fallbackData = getFallbackTestimonials();
        setTestimonials(fallbackData);
        setError(null); // Clear error since we have fallback
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (autoPlay && testimonials.length > 0) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const next = (prev + 1) % testimonials.length;
          return next;
        });
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, testimonials.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    resetAutoPlay();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    if (autoPlay) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
  };

  const toggleAutoPlay = () => {
    setAutoPlay(!autoPlay);
    if (!autoPlay) {
      resetAutoPlay();
    } else if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half-star" />);
    }
    while (stars.length < 5) {
      stars.push(<FaRegStar key={`empty-star-${stars.length}`} />);
    }
    return stars;
  };


  if (loading) {
    return (
      <section className={styles.clientSay}>
        <div className={styles.container}>
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Cargando testimonios...</p>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    console.log('⚠️ No testimonials available');
    return (
      <section className={styles.clientSay}>
        <div className={styles.container}>
          <div className={styles.error}>
            <p>No hay testimonios disponibles en este momento.</p>
          </div>
        </div>
      </section>
    );
  }

  const currentTestimonial = testimonials[currentIndex];
  console.log('✨ Rendering testimonial:', currentTestimonial?.name);

  return (
    <section ref={sectionRef} className={styles.clientSay}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.animateIn : ''}`}>
          <span className={styles.badge}>Testimonios</span>
          <h2 className={styles.title}>
            Lo que dicen 
            <span className={styles.gradientText}> nuestros clientes</span>
          </h2>
          <p className={styles.subtitle}>
            Historias de éxito y experiencias reales de quienes confiaron en CodeTree
          </p>
        </div>

        <div className={`${styles.carouselContainer} ${isVisible ? styles.animateIn : ''}`}>
          <button 
            className={`${styles.navBtn} ${styles.prevBtn}`} 
            onClick={handlePrev}
            aria-label="Anterior testimonio"
          >
            <FaChevronLeft />
          </button>
          
          <div className={styles.testimonialCard}>
            <div className={styles.quoteIcon}>
              <FaQuoteLeft />
            </div>
            
            <div className={styles.testimonialContent}>
              <p className={styles.testimonialText}>"{currentTestimonial.message}"</p>
              
              <div className={styles.rating}>
                {renderStars(currentTestimonial.rating)}
                <span className={styles.ratingValue}>{currentTestimonial.rating}</span>
              </div>
            </div>
            
            <div className={styles.clientInfo}>
              <div className={styles.clientAvatar}>
                {currentTestimonial.avatar ? (
                  <img src={currentTestimonial.avatar} alt={currentTestimonial.name} />
                ) : (
                  <FaUserCircle />
                )}
              </div>
              <div className={styles.clientDetails}>
                <h4>{currentTestimonial.name}</h4>
                <p className={styles.clientRole}>{currentTestimonial.role}</p>
                <p className={styles.clientCompany}>{currentTestimonial.company}</p>
              </div>
            </div>
          </div>
          
          <button 
            className={`${styles.navBtn} ${styles.nextBtn}`} 
            onClick={handleNext}
            aria-label="Siguiente testimonio"
          >
            <FaChevronRight />
          </button>
        </div>

        <div className={`${styles.dotsContainer} ${isVisible ? styles.animateIn : ''}`}>
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${currentIndex === idx ? styles.active : ''}`}
              onClick={() => {
                console.log(`🎯 Dot clicked: moving to index ${idx}`);
                setCurrentIndex(idx);
                resetAutoPlay();
              }}
              aria-label={`Ir al testimonio ${idx + 1}`}
            />
          ))}
          <button 
            className={`${styles.autoPlayBtn} ${autoPlay ? styles.active : ''}`}
            onClick={toggleAutoPlay}
            aria-label={autoPlay ? 'Pausar auto-reproducción' : 'Iniciar auto-reproducción'}
          >
            {autoPlay ? '⏸' : '▶'}
          </button>
        </div>

        <div className={`${styles.statsContainer} ${isVisible ? styles.animateIn : ''}`}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>50+</span>
            <span className={styles.statLabel}>Clientes satisfechos</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statLabel}>Recomendación</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>4.9</span>
            <span className={styles.statLabel}>Calificación promedio</span>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default ClientSay;