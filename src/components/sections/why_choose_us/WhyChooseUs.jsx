// src/components/sections/why_choose_us/WhyChooseUs.jsx
import React, { useEffect, useState, useRef } from 'react';
import { 
  FaCheckCircle,
  FaRocket,
  FaShieldAlt,
  FaHeadset,
  FaChartLine,
  FaCode,
  FaUsers,
  FaClock,
  FaHandshake,
  FaLightbulb,
  FaTrophy,
  FaGlobe
} from 'react-icons/fa';
import styles from './WhyChooseUs.module.css';
import Button from '../../common/button/Button';
import Modal from '../../common/ui/Modal';
import ContactForm from '../contact/ContactForm';

const WhyChooseUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('technology');
  const sectionRef = useRef(null);

  const advantages = {
    technology: {
      title: "Tecnología de Vanguardia",
      icon: FaCode,
      color: "#10B981",
      points: [
        "Arquitecturas modernas y escalables (Microservicios, Serverless)",
        "Tecnologías actualizadas (React, Node.js, Python, Go)",
        "Prácticas DevOps y CI/CD automatizados",
        "Infraestructura cloud-native (AWS, Azure, GCP)",
        "Seguridad implementada desde el diseño (DevSecOps)"
      ]
    },
    process: {
      title: "Metodología Probada",
      icon: FaChartLine,
      color: "#2563EB",
      points: [
        "Entregas incrementales con valor tangible",
        "Revisiones de código y QA riguroso",
        "Documentación técnica completa",
        "Pruebas automatizadas (Unitarias, Integración, E2E)",
        "Sprints semanales con entregas demostrables"
      ]
    },
    support: {
      title: "Soporte y Confianza",
      icon: FaHeadset,
      color: "#7C3AED",
      points: [
        "Acompañamiento post-lanzamiento garantizado",
        "SLA claros y tiempos de respuesta definidos",
        "Capacitación a tu equipo incluida",
        "Disponibilidad 24/7 para emergencias",
        "Mejora continua y optimización post-entrega"
      ]
    },
    team: {
      title: "Equipo Especializado",
      icon: FaUsers,
      color: "#F59E0B",
      points: [
        "Profesionales certificados y con experiencia",
        "Equipo multidisciplinario (Desarrollo, QA, UX, DevOps)",
        "Formación continua en últimas tecnologías",
        "Comunicación clara y transparente",
        "Dedicación exclusiva a tu proyecto"
      ]
    },
    value: {
      title: "Valor por tu Inversión",
      icon: FaTrophy,
      color: "#EC4899",
      points: [
        "Precios competitivos sin sacrificar calidad",
        "Modelos flexibles de pago (por módulo, suscripción)",
        "ROI medible desde las primeras entregas",
        "Sin costos ocultos ni sorpresas",
        "Garantía de satisfacción"
      ]
    },
    innovation: {
      title: "Innovación Constante",
      icon: FaLightbulb,
      color: "#06B6D4",
      points: [
        "Investigación continua en nuevas tecnologías",
        "Implementación de IA y automatización inteligente",
        "Soluciones preparadas para el futuro",
        "Adaptación rápida a cambios del mercado",
        "Propiedad intelectual totalmente tuya"
      ]
    }
  };

  const comparisons = [
    {
      aspect: "Tecnologías utilizadas",
      codetree: "Modernas y actualizadas (React, Node, Python, Go)",
      others: "Tecnologías obsoletas o desactualizadas"
    },
    {
      aspect: "Metodología de trabajo",
      codetree: "Ágil con entregas semanales demostrables",
      others: "Cascada o ágil sin entregas regulares"
    },
    {
      aspect: "Calidad de código",
      codetree: "Pruebas automatizadas + revisiones de código",
      others: "Testing mínimo o nulo"
    },
    {
      aspect: "Documentación",
      codetree: "Completa y actualizada (técnica + funcional)",
      others: "Inexistente o desactualizada"
    },
    {
      aspect: "Soporte post-entrega",
      codetree: "Acompañamiento garantizado + SLA claro",
      others: "Soporte limitado o nulo"
    },
    {
      aspect: "Seguridad",
      codetree: "DevSecOps + auditorías regulares",
      others: "Seguridad como añadido, no como base"
    },
    {
      aspect: "Escalabilidad",
      codetree: "Arquitectura cloud-native desde el inicio",
      others: "Escalamiento reactivo y costoso"
    },
    {
      aspect: "Plazos de entrega",
      codetree: "Cumplimiento garantizado con buffer realista",
      others: "Plazos irreales y entregas tardías"
    }
  ];

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


  const openContactModal = () => {
        setIsContactModalOpen(true);
    };

  const closeContactModal = () => {
        setIsContactModalOpen(false);
    };

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const currentAdvantage = advantages[activeTab];
  const AdvantageIcon = currentAdvantage.icon;

    return (
  <>
            <section ref={sectionRef} className={styles.whyChooseUs}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.animateIn : ''}`}>
          <span className={styles.badge}>¿Por qué elegirnos?</span>
          <h2 className={styles.title}>
            Marcamos la <span className={styles.gradientText}>diferencia</span>
          </h2>
          <p className={styles.subtitle}>
            No solo desarrollamos software, creamos soluciones que impulsan tu negocio al siguiente nivel
          </p>
        </div>

        {/* Advantages Tabs */}
        <div className={`${styles.tabsContainer} ${isVisible ? styles.animateIn : ''}`}>
          {Object.entries(advantages).map(([key, value]) => {
            const TabIcon = value.icon;
            return (
              <button
                key={key}
                className={`${styles.tab} ${activeTab === key ? styles.active : ''}`}
                onClick={() => setActiveTab(key)}
              >
                <TabIcon className={styles.tabIcon} style={{ color: activeTab === key ? value.color : 'var(--text-secondary)' }} />
                <span>{value.title}</span>
                <div className={styles.tabIndicator} style={{ background: value.color }}></div>
              </button>
            );
          })}
        </div>

        {/* Active Advantage Content */}
        <div className={`${styles.advantageContent} ${isVisible ? styles.animateIn : ''}`}>
          <div className={styles.advantageHeader}>
            <div className={styles.advantageIcon} style={{ background: currentAdvantage.color }}>
              <AdvantageIcon />
            </div>
            <h3>{currentAdvantage.title}</h3>
          </div>
          <div className={styles.advantagePoints}>
            {currentAdvantage.points.map((point, idx) => (
              <div key={idx} className={styles.advantagePoint}>
                <FaCheckCircle className={styles.checkIcon} style={{ color: currentAdvantage.color }} />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className={`${styles.comparisonSection} ${isVisible ? styles.animateIn : ''}`}>
          <h3 className={styles.comparisonTitle}>
            <FaChartLine className={styles.comparisonIcon} />
            CodeTree vs. Otras opciones
          </h3>
          <div className={styles.comparisonTable}>
            <div className={styles.tableHeader}>
              <div className={styles.tableAspect}>Aspecto</div>
              <div className={styles.tableCodeTree}>
                <span className={styles.codeTreeBadge}>CodeTree</span>
              </div>
              <div className={styles.tableOthers}>
                <span className={styles.othersBadge}>Otras opciones</span>
              </div>
            </div>
            {comparisons.map((item, idx) => (
              <div key={idx} className={styles.tableRow}>
                <div className={styles.tableAspect}>{item.aspect}</div>
                <div className={styles.tableCodeTree}>
                  <FaCheckCircle className={styles.checkIconGreen} />
                  <span>{item.codetree}</span>
                </div>
                <div className={styles.tableOthers}>
                  <span className={styles.othersText}>{item.others}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className={`${styles.statsSection} ${isVisible ? styles.animateIn : ''}`}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>50+</div>
            <div className={styles.statLabel}>Proyectos entregados</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>Clientes satisfechos</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>5+</div>
            <div className={styles.statLabel}>Años de experiencia</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>24/7</div>
            <div className={styles.statLabel}>Soporte disponible</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`${styles.ctaSection} ${isVisible ? styles.animateIn : ''}`}>
          <div className={styles.ctaContent}>
            <h4>¿Listo para trabajar con el mejor equipo?</h4>
            <p>Contáctanos hoy y descubre por qué somos la mejor opción para tu proyecto</p>
                      <Button
                          variant="primary"
                          size="lg"
                          onClick={openContactModal}
                      >
                          Comenzar hoy
                      </Button>
          </div>
        </div>
      </div>
            </section>

            <Modal
                isOpen={isContactModalOpen}
                onClose={closeContactModal}
                title="Contáctanos"
            >
                <ContactForm
                    isModal={true}
                    onSuccess={closeContactModal}
                />
            </Modal>
        </>
    );
};

export default WhyChooseUs;