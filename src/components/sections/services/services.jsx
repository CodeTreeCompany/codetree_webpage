// src/components/sections/Services/Services.jsx
import React, { useEffect, useState, useRef } from 'react';
import { 
  FaArrowRight,
  FaEye
} from 'react-icons/fa';
import Button from '../../common/button/Button';
import styles from './Services.module.css';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const sectionRef = useRef(null);

  const services = [
    {
      id: 1,
      title: "Desarrollo de Software",
      description: "Creamos soluciones personalizadas adaptadas a las necesidades específicas de tu negocio.",
      fullDescription: "Nuestro equipo de desarrolladores expertos crea aplicaciones web y de escritorio robustas, escalables y seguras. Utilizamos tecnologías modernas como React, Node.js, Python y Java para ofrecer soluciones que impulsan tu negocio.",
      color: "#10B981",
      gradient: "linear-gradient(135deg, #10B981, #059669)"
    },
    {
      id: 2,
      title: "Automatización e IA",
      description: "Optimiza tus procesos con soluciones inteligentes que reducen costos y aumentan la eficiencia.",
      fullDescription: "Implementamos sistemas de automatización de procesos robóticos (RPA) y soluciones de inteligencia artificial que aprenden y se adaptan a tu negocio. Desde chatbots hasta sistemas de predicción, transformamos datos en decisiones inteligentes.",
      color: "#2563EB",
      gradient: "linear-gradient(135deg, #2563EB, #1D4ED8)"
    },
    {
      id: 3,
      title: "Soluciones SaaS",
      description: "Ofrecemos plataformas en la nube escalables que se adaptan al crecimiento de tu empresa.",
      fullDescription: "Desarrollamos productos SaaS (Software as a Service) con arquitectura multi-tenant, facturación integrada y escalabilidad automática. Tus clientes acceden desde cualquier lugar con total seguridad y disponibilidad 24/7.",
      color: "#7C3AED",
      gradient: "linear-gradient(135deg, #7C3AED, #6D28D9)"
    },
    {
      id: 4,
      title: "Ciberseguridad",
      description: "Protegemos tu infraestructura y datos con soluciones avanzadas de seguridad informática.",
      fullDescription: "Implementamos auditorías de seguridad, pruebas de penetración, cifrado de datos y monitoreo continuo. Aseguramos el cumplimiento de normativas para proteger tu activo más valioso: la información.",
      color: "#EF4444",
      gradient: "linear-gradient(135deg, #EF4444, #DC2626)"
    },
    {
      id: 5,
      title: "Apps Móviles",
      description: "Desarrollamos aplicaciones nativas e híbridas para iOS y Android con experiencias excepcionales.",
      fullDescription: "Creamos apps móviles con React Native, Flutter o desarrollo nativo según tus necesidades. Desde e-commerce hasta aplicaciones empresariales, entregamos experiencias fluidas, rápidas y atractivas.",
      color: "#F59E0B",
      gradient: "linear-gradient(135deg, #F59E0B, #D97706)"
    },
    {
      id: 6,
      title: "Transformación Digital",
      description: "Acompañamos a tu empresa en el proceso de transformación digital con consultoría especializada.",
      fullDescription: "Analizamos tus procesos actuales, identificamos oportunidades de mejora y diseñamos una hoja de ruta para tu transformación digital. Capacitamos a tu equipo y te acompañamos en cada paso.",
      color: "#EC4899",
      gradient: "linear-gradient(135deg, #EC4899, #DB2777)"
    },
    {
      id: 7,
      title: "DevOps",
      description: "Automatizamos la entrega y mantenimiento de servidores con prácticas DevOps de clase mundial.",
      fullDescription: "Implementamos pipelines CI/CD, contenedores Docker, orquestación Kubernetes y monitoreo continuo. Optimizamos la infraestructura en la nube (AWS, Azure, GCP) para garantizar alta disponibilidad, escalabilidad automática y despliegues sin downtime.",
      color: "#06B6D4",
      gradient: "linear-gradient(135deg, #06B6D4, #0891B2)"
    },
    {
      id: 8,
      title: "Data Analysis",
      description: "Transformamos tus datos en insights accionables con dashboards interactivos y visualizaciones avanzadas.",
      fullDescription: "Desarrollamos dashboards personalizados con Power BI, Tableau y Looker Studio. Implementamos ETL pipelines, análisis predictivo con machine learning y reporting automatizado. Convierte datos complejos en decisiones estratégicas con visualizaciones claras y en tiempo real.",
      color: "#8B5CF6",
      gradient: "linear-gradient(135deg, #8B5CF6, #7C3AED)"
    },
    {
      id: 9,
      title: "Software Contable",
      description: "Desarrollamos sistemas contables robustos que cumplen con las normativas fiscales vigentes.",
      fullDescription: "Creamos software de contabilidad personalizado con módulos de facturación electrónica, libros contables, conciliaciones bancarias, reportes fiscales y gestión de inventarios. Cumplimos con las normativas tributarias de cada país y garantizamos la integridad de los datos financieros.",
      color: "#14B8A6",
      gradient: "linear-gradient(135deg, #14B8A6, #0D9488)"
    }
  ];

  // SVG Components for each service
  const SoftwareDevSVG = () => (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="240" rx="16" fill="url(#grad1)"/>
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#059669" stopOpacity="0.9"/>
        </linearGradient>
      </defs>
      <g opacity="0.15">
        <circle cx="200" cy="120" r="80" fill="white"/>
      </g>
      <g opacity="0.3">
        <rect x="100" y="80" width="200" height="20" rx="4" fill="white"/>
        <rect x="120" y="110" width="160" height="4" rx="2" fill="white"/>
        <rect x="120" y="122" width="140" height="4" rx="2" fill="white"/>
        <rect x="120" y="134" width="180" height="4" rx="2" fill="white"/>
        <rect x="120" y="146" width="150" height="4" rx="2" fill="white"/>
      </g>
      <g opacity="0.4">
        <path d="M160 170 L180 185 L160 200" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M240 170 L220 185 L240 200" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );

  const AutomationSVG = () => (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="240" rx="16" fill="url(#grad2)"/>
      <defs>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.9"/>
        </linearGradient>
      </defs>
      <g opacity="0.15">
        <circle cx="200" cy="120" r="80" fill="white"/>
      </g>
      <g opacity="0.3">
        <circle cx="160" cy="120" r="30" stroke="white" strokeWidth="3" fill="none"/>
        <circle cx="240" cy="120" r="30" stroke="white" strokeWidth="3" fill="none"/>
        <circle cx="200" cy="160" r="30" stroke="white" strokeWidth="3" fill="none"/>
        <line x1="160" y1="120" x2="200" y2="145" stroke="white" strokeWidth="2"/>
        <line x1="240" y1="120" x2="200" y2="145" stroke="white" strokeWidth="2"/>
      </g>
    </svg>
  );

  const SaasSVG = () => (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="240" rx="16" fill="url(#grad3)"/>
      <defs>
        <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#6D28D9" stopOpacity="0.9"/>
        </linearGradient>
      </defs>
      <g opacity="0.15">
        <circle cx="200" cy="120" r="80" fill="white"/>
      </g>
      <g opacity="0.3">
        <rect x="140" y="80" width="120" height="80" rx="8" fill="white" fillOpacity="0.3"/>
        <rect x="150" y="90" width="100" height="15" rx="4" fill="white" fillOpacity="0.5"/>
        <rect x="150" y="115" width="80" height="4" rx="2" fill="white"/>
        <rect x="150" y="125" width="90" height="4" rx="2" fill="white"/>
        <rect x="150" y="135" width="70" height="4" rx="2" fill="white"/>
        <rect x="160" y="170" width="80" height="20" rx="4" fill="white" fillOpacity="0.4"/>
      </g>
    </svg>
  );

  const CybersecuritySVG = () => (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="240" rx="16" fill="url(#grad4)"/>
      <defs>
        <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#DC2626" stopOpacity="0.9"/>
        </linearGradient>
      </defs>
      <g opacity="0.15">
        <circle cx="200" cy="120" r="80" fill="white"/>
      </g>
      <g opacity="0.3">
        <path d="M200 70 L250 90 L250 140 C250 170 200 190 200 190 C200 190 150 170 150 140 L150 90 L200 70Z" stroke="white" strokeWidth="3" fill="none"/>
        <circle cx="200" cy="130" r="15" stroke="white" strokeWidth="2" fill="none"/>
        <line x1="200" y1="145" x2="200" y2="155" stroke="white" strokeWidth="3" strokeLinecap="round"/>
      </g>
    </svg>
  );

  const MobileAppsSVG = () => (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="240" rx="16" fill="url(#grad5)"/>
      <defs>
        <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#D97706" stopOpacity="0.9"/>
        </linearGradient>
      </defs>
      <g opacity="0.15">
        <circle cx="200" cy="120" r="80" fill="white"/>
      </g>
      <g opacity="0.3">
        <rect x="170" y="60" width="60" height="120" rx="10" fill="white" fillOpacity="0.3"/>
        <rect x="180" y="70" width="40" height="80" rx="5" fill="white" fillOpacity="0.5"/>
        <circle cx="200" cy="165" r="5" fill="white"/>
        <rect x="175" y="55" width="50" height="8" rx="4" fill="white" fillOpacity="0.4"/>
      </g>
    </svg>
  );

  const DigitalTransformationSVG = () => (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="240" rx="16" fill="url(#grad6)"/>
      <defs>
        <linearGradient id="grad6" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EC4899" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#DB2777" stopOpacity="0.9"/>
        </linearGradient>
      </defs>
      <g opacity="0.15">
        <circle cx="200" cy="120" r="80" fill="white"/>
      </g>
      <g opacity="0.3">
        <path d="M120 180 L160 100 L200 140 L240 90 L280 160" stroke="white" strokeWidth="3" fill="none"/>
        <circle cx="160" cy="100" r="8" fill="white"/>
        <circle cx="200" cy="140" r="8" fill="white"/>
        <circle cx="240" cy="90" r="8" fill="white"/>
        <circle cx="120" cy="180" r="8" fill="white"/>
        <circle cx="280" cy="160" r="8" fill="white"/>
      </g>
    </svg>
  );

  const DevOpsSVG = () => (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="240" rx="16" fill="url(#grad7)"/>
      <defs>
        <linearGradient id="grad7" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#0891B2" stopOpacity="0.9"/>
        </linearGradient>
      </defs>
      <g opacity="0.15">
        <circle cx="200" cy="120" r="80" fill="white"/>
      </g>
      <g opacity="0.3">
        <rect x="100" y="80" width="200" height="15" rx="4" fill="white" fillOpacity="0.3"/>
        <rect x="100" y="105" width="200" height="15" rx="4" fill="white" fillOpacity="0.3"/>
        <rect x="100" y="130" width="200" height="15" rx="4" fill="white" fillOpacity="0.3"/>
        <path d="M130 95 L150 87.5 L150 102.5 Z" fill="white" fillOpacity="0.5"/>
        <path d="M130 120 L150 112.5 L150 127.5 Z" fill="white" fillOpacity="0.5"/>
        <path d="M130 145 L150 137.5 L150 152.5 Z" fill="white" fillOpacity="0.5"/>
        <circle cx="250" cy="87" r="8" fill="white" fillOpacity="0.4"/>
        <circle cx="250" cy="112" r="8" fill="white" fillOpacity="0.4"/>
        <circle cx="250" cy="137" r="8" fill="white" fillOpacity="0.4"/>
        <path d="M258 87 L280 95 M258 112 L280 120 M258 137 L280 145" stroke="white" strokeWidth="2" fill="none"/>
      </g>
    </svg>
  );

  const DataAnalysisSVG = () => (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="240" rx="16" fill="url(#grad8)"/>
      <defs>
        <linearGradient id="grad8" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.9"/>
        </linearGradient>
      </defs>
      <g opacity="0.15">
        <circle cx="200" cy="120" r="80" fill="white"/>
      </g>
      <g opacity="0.3">
        <rect x="100" y="100" width="40" height="80" rx="4" fill="white" fillOpacity="0.4"/>
        <rect x="150" y="130" width="40" height="50" rx="4" fill="white" fillOpacity="0.4"/>
        <rect x="200" y="80" width="40" height="100" rx="4" fill="white" fillOpacity="0.4"/>
        <rect x="250" y="110" width="40" height="70" rx="4" fill="white" fillOpacity="0.4"/>
        <path d="M120 180 L120 100 M170 180 L170 130 M220 180 L220 80 M270 180 L270 110" stroke="white" strokeWidth="2" fill="none"/>
        <circle cx="120" cy="100" r="4" fill="white"/>
        <circle cx="170" cy="130" r="4" fill="white"/>
        <circle cx="220" cy="80" r="4" fill="white"/>
        <circle cx="270" cy="110" r="4" fill="white"/>
      </g>
    </svg>
  );

  const AccountingSVG = () => (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="240" rx="16" fill="url(#grad9)"/>
      <defs>
        <linearGradient id="grad9" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#0D9488" stopOpacity="0.9"/>
        </linearGradient>
      </defs>
      <g opacity="0.15">
        <circle cx="200" cy="120" r="80" fill="white"/>
      </g>
      <g opacity="0.3">
        <rect x="120" y="70" width="160" height="100" rx="8" fill="white" fillOpacity="0.3"/>
        <rect x="135" y="85" width="130" height="15" rx="4" fill="white" fillOpacity="0.5"/>
        <rect x="135" y="110" width="130" height="4" rx="2" fill="white"/>
        <rect x="135" y="120" width="100" height="4" rx="2" fill="white"/>
        <rect x="135" y="130" width="110" height="4" rx="2" fill="white"/>
        <rect x="135" y="140" width="80" height="4" rx="2" fill="white"/>
        <line x1="160" y1="180" x2="240" y2="180" stroke="white" strokeWidth="2"/>
        <circle cx="200" cy="180" r="15" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2"/>
        <text x="196" y="185" fill="white" fontSize="12" fontWeight="bold">$</text>
      </g>
    </svg>
  );

  const serviceSVGs = {
    1: SoftwareDevSVG,
    2: AutomationSVG,
    3: SaasSVG,
    4: CybersecuritySVG,
    5: MobileAppsSVG,
    6: DigitalTransformationSVG,
    7: DevOpsSVG,
    8: DataAnalysisSVG,
    9: AccountingSVG
  };

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

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <section ref={sectionRef} className={styles.services}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.animateIn : ''}`}>
          <span className={styles.badge}>Nuestros Servicios</span>
          <h2 className={styles.title}>
            Soluciones tecnológicas para 
            <span className={styles.gradientText}> impulsar tu negocio</span>
          </h2>
          <p className={styles.subtitle}>
            Ofrecemos servicios de alta calidad adaptados a las necesidades específicas de cada cliente
          </p>
        </div>

        <div className={styles.servicesGrid}>
          {services.map((service, index) => {
            const isExpanded = expandedCard === service.id;
            const ServiceSVG = serviceSVGs[service.id];
            
            return (
              <div 
                key={service.id}
                className={`${styles.serviceCard} ${isVisible ? styles.animateIn : ''} ${isExpanded ? styles.expanded : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.cardImageWrapper}>
                  <ServiceSVG />
                  <div className={styles.imageOverlay}></div>
                  <div className={styles.cardBadge} style={{ background: service.color }}>
                    {service.title.split(' ')[0]}
                  </div>
                </div>
                
                <div className={styles.cardContent}>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDescription}>
                    {isExpanded ? service.fullDescription : service.description}
                  </p>
                  
                  <div className={styles.cardActions}>
                    <button 
                      className={styles.seeMoreBtn}
                      onClick={() => toggleExpand(service.id)}
                      style={{ color: service.color }}
                    >
                      {isExpanded ? 'Ver menos' : 'Ver más'}
                      <FaArrowRight className={`${styles.arrowIcon} ${isExpanded ? styles.rotated : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={`${styles.footerActions} ${isVisible ? styles.animateIn : ''}`}>
          <Button variant="outline" size="lg">
            Ver Todos los Servicios
            <FaEye style={{ marginLeft: '0.5rem' }} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;