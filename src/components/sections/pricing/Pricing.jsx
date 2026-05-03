// src/components/sections/Pricing/Pricing.jsx
import React, { useEffect, useState, useRef } from 'react';
import { 
  FaCheckCircle, 
  FaTimesCircle,
  FaBuilding,
  FaTractor,
  FaUsers,
  FaDollarSign,
  FaRocket,
  FaCrown,
  FaStar,
  FaArrowRight,
  FaEnvelope,
  FaWhatsapp,
  FaCalendarAlt,
  FaChartLine,
  FaShieldAlt,
  FaCloudUploadAlt,
  FaHeadset,
  FaSync,
  FaDatabase,
  FaCode,
  FaMobile,
  FaPaintBrush,
  FaLayerGroup
} from 'react-icons/fa';
import styles from './Pricing.module.css';

const Pricing = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('saas');
  const [cowCount, setCowCount] = useState(500);
  const [selectedPlan, setSelectedPlan] = useState('standard');
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'website',
    budget: '5000-10000',
    message: ''
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef(null);

  const saasPlans = [
    {
      id: 'basic',
      name: 'Básico',
      icon: FaBuilding,
      price: 8,
      period: 'mes',
      description: 'Perfecto para pequeños productores',
      farms: 2,
      employees: 2,
      cows: 'Hasta 100',
      features: [
        'Gestión de inventario',
        'Control de producción',
        'Reportes básicos',
        'Soporte por email',
        'Actualizaciones incluidas'
      ],
      color: '#10B981',
      gradient: 'linear-gradient(135deg, #10B981, #059669)',
      recommended: false
    },
    {
      id: 'standard',
      name: 'Estándar',
      icon: FaTractor,
      price: 18,
      period: 'mes',
      description: 'Ideal para medianas empresas',
      farms: 5,
      employees: 12,
      cows: '100 - 400',
      features: [
        'Todo lo de Básico',
        'Estadísticas avanzadas',
        'Múltiples usuarios',
        'Soporte prioritario',
        'API de integración',
        'Dashboard personalizable'
      ],
      color: '#2563EB',
      gradient: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
      recommended: true
    },
    {
      id: 'premium',
      name: 'Premium',
      icon: FaCrown,
      price: 35,
      period: 'mes',
      description: 'Para grandes operaciones',
      farms: 'Ilimitadas',
      employees: 'Ilimitados',
      cows: '400 - 1000',
      features: [
        'Todo lo de Estándar',
        'Análisis predictivo',
        'Integración IoT',
        'Soporte 24/7',
        'Capacitación personalizada',
        'Módulos personalizados'
      ],
      color: '#7C3AED',
      gradient: 'linear-gradient(135deg, #7C3AED, #6D28D9)',
      recommended: false
    }
  ];

  const licensePlans = [
    {
      id: 'negocio',
      name: 'Negocio+',
      icon: FaBuilding,
      price: 150,
      period: 'único',
      description: 'Licencia perpetua para una instalación',
      includes: ['3 días de asistencia técnica', 'Actualizaciones por 1 año', 'Instalación incluida'],
      features: [
        'Licencia de por vida',
        'Soporte técnico 3 días',
        'Instalación gratuita',
        'Actualizaciones 1 año',
        'Base de datos local',
        'Sin límite de usuarios'
      ],
      color: '#F59E0B',
      gradient: 'linear-gradient(135deg, #F59E0B, #D97706)',
      recommended: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      icon: FaRocket,
      price: 'Personalizado',
      period: '',
      description: 'Para grandes corporaciones',
      includes: ['Soporte dedicado', 'Implementación completa', 'Servicio personalizado'],
      features: [
        'Todo lo de Negocio+',
        'Soporte prioritario 24/7',
        'Implementación personalizada',
        'Capacitación incluida',
        'Personalización total',
        'SLA garantizado'
      ],
      color: '#EC4899',
      gradient: 'linear-gradient(135deg, #EC4899, #DB2777)',
      recommended: false
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

  const calculateDynamicPrice = () => {
    if (cowCount <= 400) return 18;
    if (cowCount <= 1000) return 35;
    return (cowCount * 0.01).toFixed(2);
  };

  const getPlanByCowCount = () => {
    if (cowCount <= 100) return 'basic';
    if (cowCount <= 400) return 'standard';
    if (cowCount <= 1000) return 'premium';
    return 'custom';
  };

  const handleCowCountChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setCowCount(value);
    setSelectedPlan(getPlanByCowCount());
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setShowQuoteForm(false);
      alert('¡Gracias por tu interés! Te contactaremos en menos de 24 horas.');
    }, 1000);
  };

  const getPriceDisplay = () => {
    if (selectedPlan === 'custom') {
      return `$${(cowCount * 0.01).toFixed(2)}`;
    }
    const plan = saasPlans.find(p => p.id === selectedPlan);
    return plan ? `$${plan.price}` : '$18';
  };

  return (
    <section ref={sectionRef} className={styles.pricing}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.animateIn : ''}`}>
          <span className={styles.badge}>Planes y Precios</span>
          <h2 className={styles.title}>
            Soluciones que se adaptan a 
            <span className={styles.gradientText}> tu negocio</span>
          </h2>
          <p className={styles.subtitle}>
            Elige el plan perfecto para tu operación o solicita una cotización personalizada
          </p>
        </div>

       
       
        {/* Custom Quote Form Modal */}
        {showQuoteForm && (
          <div className={styles.modalOverlay} onClick={() => setShowQuoteForm(false)}>
            <div className={`${styles.modal} ${isAnimating ? styles.animateOut : ''}`} onClick={(e) => e.stopPropagation()}>
              <button className={styles.modalClose} onClick={() => setShowQuoteForm(false)}>×</button>
              <div className={styles.modalHeader}>
                <div className={styles.modalIcon}>
                  <FaRocket />
                </div>
                <h2>Cotización Personalizada</h2>
                <p>Cuéntanos sobre tu proyecto y te daremos la mejor solución</p>
              </div>
              <form onSubmit={handleSubmit} className={styles.quoteForm}>
                <div className={styles.formGroup}>
                  <label>Nombre completo *</label>
                  <input 
                    type="text" 
                    name="name" 
                    required
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Juan Pérez"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Correo electrónico *</label>
                  <input 
                    type="email" 
                    name="email" 
                    required
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="juan@ejemplo.com"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Teléfono *</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    required
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="+505 1234 5678"
                  />
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Tipo de proyecto</label>
                    <select name="projectType" value={formData.projectType} onChange={handleFormChange}>
                      <option value="website">Sitio Web</option>
                      <option value="app">Aplicación Móvil</option>
                      <option value="software">Software a Medida</option>
                      <option value="saas">Plataforma SaaS</option>
                      <option value="automation">Automatización</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Presupuesto estimado</label>
                    <select name="budget" value={formData.budget} onChange={handleFormChange}>
                      <option value="<5000">Menos de $5,000</option>
                      <option value="5000-10000">$5,000 - $10,000</option>
                      <option value="10000-25000">$10,000 - $25,000</option>
                      <option value="25000-50000">$25,000 - $50,000</option>
                      <option value=">50000">Más de $50,000</option>
                    </select>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Mensaje adicional</label>
                  <textarea 
                    name="message" 
                    rows="4"
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Cuéntanos más sobre tu proyecto..."
                  />
                </div>
                <div className={styles.formActions}>
                  <button type="button" className={styles.cancelBtn} onClick={() => setShowQuoteForm(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className={styles.submitBtn}>
                    Enviar Solicitud <FaArrowRight />
                  </button>
                </div>
              </form>
              <div className={styles.modalFooter}>
                <p>Te responderemos en menos de 24 horas</p>
                <div className={styles.contactOptions}>
                  <span><FaWhatsapp /> WhatsApp</span>
                  <span><FaEnvelope /> Email</span>
                  <span><FaCalendarAlt /> Agenda</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className={`${styles.features} ${isVisible ? styles.animateIn : ''}`}>
          <h3>Todos los planes incluyen</h3>
          <div className={styles.featuresGrid}>
            <div className={styles.featureItem}>
              <FaDatabase />
              <span>Almacenamiento seguro</span>
            </div>
            <div className={styles.featureItem}>
              <FaShieldAlt />
              <span>Seguridad de datos</span>
            </div>
            <div className={styles.featureItem}>
              <FaSync />
              <span>Actualizaciones automáticas</span>
            </div>
            <div className={styles.featureItem}>
              <FaHeadset />
              <span>Soporte técnico</span>
            </div>
            <div className={styles.featureItem}>
              <FaCode />
              <span>API abierta</span>
            </div>
            <div className={styles.featureItem}>
              <FaMobile />
              <span>Acceso móvil</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;