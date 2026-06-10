import React, { useEffect, useState, useRef } from 'react';
import { 
  FaCode, 
  FaBullhorn, 
  FaPalette, 
  FaChartLine, 
  FaShoppingCart, 
  FaMicrochip,
  FaUserGraduate,
  FaHandshake,
  FaCertificate,
  FaTrophy,
  FaRocket,
  FaCheckCircle,
  FaClock,
  FaUsers,
  FaRegLightbulb,
  FaArrowRight,
  FaWhatsapp,
  FaEnvelope,
  FaFileAlt
} from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import styles from './Careers.module.css';

const Careers = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedArea, setSelectedArea] = useState('development');
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  // EmailJS configuration
  const EMAILJS_SERVICE_ID = 'service_irvthxe';
  const EMAILJS_TEMPLATE_ID = 'template_careers';
  const EMAILJS_PUBLIC_KEY = 'hY2LpwoPAxGjcXKrS';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    area: 'development',
    experience: '',
    portfolio: '',
    message: '',
    cv: null
  });

  const [formErrors, setFormErrors] = useState({});

  const areas = [
    { id: 'development', name: 'Desarrollo de Software', icon: FaCode, color: '#10B981', gradient: 'linear-gradient(135deg, #10B981, #059669)', description: 'React, Node.js, Python, Java, Bases de datos' },
    { id: 'marketing', name: 'Marketing Digital', icon: FaBullhorn, color: '#2563EB', gradient: 'linear-gradient(135deg, #2563EB, #1D4ED8)', description: 'SEO, Redes Sociales, Content Strategy, Analytics' },
    { id: 'design', name: 'Diseño Gráfico', icon: FaPalette, color: '#7C3AED', gradient: 'linear-gradient(135deg, #7C3AED, #6D28D9)', description: 'UI/UX, Branding, Photoshop, Illustrator, Figma' },
    { id: 'accounting', name: 'Contabilidad', icon: FaChartLine, color: '#F59E0B', gradient: 'linear-gradient(135deg, #F59E0B, #D97706)', description: 'Gestión financiera, Facturación, Reportes fiscales' },
    { id: 'sales', name: 'Ventas', icon: FaShoppingCart, color: '#EF4444', gradient: 'linear-gradient(135deg, #EF4444, #DC2626)', description: 'Negociación, CRM, Prospección, Cierre de ventas' },
    { id: 'iot', name: 'IoT', icon: FaMicrochip, color: '#06B6D4', gradient: 'linear-gradient(135deg, #06B6D4, #0891B2)', description: 'Sensores, Arduino, Raspberry Pi, MQTT' }
  ];

  const advantages = [
    { icon: FaUserGraduate, title: 'Mentoría personalizada', description: 'Un profesional con experiencia te guiará y dará feedback directo para acelerar tu crecimiento.' },
    { icon: FaUserGraduate, title: 'Procesos formales', description: 'Seguimos estándares internacionales y buenas prácticas en cada proyecto.' },
    { icon: FaHandshake, title: 'Ambiente colaborativo', description: 'Trabajo en equipo, código reviews y aprendizaje continuo.' },
    { icon: FaCertificate, title: 'Certificaciones', description: 'Acceso a cursos y certificaciones para potenciar tus habilidades.' },
    { icon: FaTrophy, title: 'Crecimiento profesional', description: 'Oportunidad real de crecimiento dentro de la empresa.' },
    { icon: FaRocket, title: 'Proyectos reales', description: 'Trabajarás en proyectos reales con clientes desde el día uno.' }
  ];

  const benefits = [
    { icon: FaClock, title: 'Horario flexible', description: 'Horario adaptado a tus necesidades' },
    { icon: FaUsers, title: 'Equipo joven', description: 'Ambiente dinámico y colaborativo' },
    { icon: FaRegLightbulb, title: 'Aprendizaje continuo', description: 'Capacitaciones y workshops semanales' },
    { icon: FaCertificate, title: 'Certificaciones pagadas', description: 'Inversión en tu desarrollo profesional' }
  ];

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El número de teléfono es obligatorio';
    }

    if (!formData.experience) {
      newErrors.experience = 'Selecciona tu nivel de experiencia';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Cuéntanos por qué te interesa el programa';
    } else if (formData.message.length < 30) {
      newErrors.message = 'Cuéntanos más (mínimo 30 caracteres)';
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'cv') {
      setFormData(prev => ({ ...prev, cv: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Por favor, completa todos los campos requeridos');
      return;
    }

    setIsSubmitting(true);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        area: areas.find(a => a.id === formData.area)?.name || formData.area,
        experience: formData.experience,
        portfolio: formData.portfolio || 'No especificado',
        message: formData.message,
        sent_date: new Date().toLocaleString('es-ES')
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      
      toast.success('¡Postulación enviada con éxito! Te contactaremos pronto.');
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        area: 'development',
        experience: '',
        portfolio: '',
        message: '',
        cv: null
      });
      setShowForm(false);
      
    } catch (error) {
      console.error('Error sending application:', error);
      toast.error('Error al enviar la postulación. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const message = `Hola! Me interesa el programa de desarrollo profesional de CodeTree. ¿Podrían darme más información?`;
    window.open(`https://wa.me/50577966272?text=${encodeURIComponent(message)}`, '_blank');
  };

  const currentArea = areas.find(a => a.id === selectedArea);
  const AreaIcon = currentArea?.icon;

  return (
    <div className={styles.careersPage}>
      <Toaster position="top-right" />
      
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Programa de 
            <span className={styles.gradientText}> Desarrollo Profesional</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Impulsa tu carrera con nosotros. Aprendizaje práctico, mentoría personalizada y oportunidad real de crecimiento
          </p>
          <div className={styles.heroButtons}>
            <button className={styles.primaryBtn} onClick={() => setShowForm(true)}>
              Postular ahora <FaArrowRight />
            </button>
            <button className={styles.secondaryBtn} onClick={handleWhatsApp}>
              <FaWhatsapp /> Consultar por WhatsApp
            </button>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        {/* Program Info Section */}
        <div className={`${styles.infoSection} ${isVisible ? styles.animateIn : ''}`}>
          <div className={styles.infoCard}>
            <div className={styles.infoNumber}>C$3,000 - C$5,000</div>
            <div className={styles.infoLabel}>Apoyo económico mensual</div>
            <p>Apoyo económico durante tu formación y primeros proyectos</p>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoNumber}>6 meses</div>
            <div className={styles.infoLabel}>Duración del programa</div>
            <p>Programa intensivo con evaluación continua y retroalimentación</p>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoNumber}>1:1</div>
            <div className={styles.infoLabel}>Mentoría personalizada</div>
            <p>Un mentor asignado para guiarte y acelerar tu crecimiento</p>
          </div>
        </div>

        {/* Areas Section */}
        <div className={`${styles.areasSection} ${isVisible ? styles.animateIn : ''}`}>
          <h2 className={styles.sectionTitle}>Áreas disponibles</h2>
          <p className={styles.sectionSubtitle}>Elige el área que mejor se adapte a tus habilidades e intereses</p>
          
          <div className={styles.areasGrid}>
            {areas.map(area => {
              const Icon = area.icon;
              const isActive = selectedArea === area.id;
              return (
                <button
                  key={area.id}
                  className={`${styles.areaCard} ${isActive ? styles.active : ''}`}
                  onClick={() => setSelectedArea(area.id)}
                >
                  <div className={styles.areaIcon} style={{ background: area.gradient }}>
                    <Icon />
                  </div>
                  <h3>{area.name}</h3>
                  <p>{area.description}</p>
                  <div className={styles.areaActive} style={{ background: area.color }}></div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Area Detail */}
        <div className={`${styles.areaDetail} ${isVisible ? styles.animateIn : ''}`}>
          <div className={styles.areaDetailHeader} style={{ background: currentArea?.gradient }}>
            <AreaIcon className={styles.areaDetailIcon} />
            <h3>¿Qué aprenderás en {currentArea?.name}?</h3>
          </div>
          <div className={styles.areaDetailContent}>
            <ul>
              <li><FaCheckCircle /> Metodologías ágiles y buenas prácticas del sector</li>
              <li><FaCheckCircle /> Trabajo en proyectos reales con clientes</li>
              <li><FaCheckCircle /> Code reviews y feedback constante de profesionales</li>
              <li><FaCheckCircle /> Documentación técnica y estándares de calidad</li>
              <li><FaCheckCircle /> Preparación para certificaciones profesionales</li>
            </ul>
          </div>
        </div>

        {/* Advantages Section */}
        <div className={`${styles.advantagesSection} ${isVisible ? styles.animateIn : ''}`}>
          <h2 className={styles.sectionTitle}>¿Por qué unirte al programa?</h2>
          <div className={styles.advantagesGrid}>
            {advantages.map((adv, idx) => {
              const Icon = adv.icon;
              return (
                <div key={idx} className={styles.advantageCard}>
                  <div className={styles.advantageIcon}>
                    <Icon />
                  </div>
                  <h4>{adv.title}</h4>
                  <p>{adv.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits Section */}
        <div className={`${styles.benefitsSection} ${isVisible ? styles.animateIn : ''}`}>
          <h2 className={styles.sectionTitle}>Beneficios adicionales</h2>
          <div className={styles.benefitsGrid}>
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className={styles.benefitCard}>
                  <div className={styles.benefitIcon}>
                    <Icon />
                  </div>
                  <div>
                    <h4>{benefit.title}</h4>
                    <p>{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* How It Works Section */}
        <div className={`${styles.processSection} ${isVisible ? styles.animateIn : ''}`}>
          <h2 className={styles.sectionTitle}>Proceso de selección</h2>
          <div className={styles.processSteps}>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>1</div>
              <h4>Postulación</h4>
              <p>Completa el formulario con tus datos y cuéntanos sobre ti</p>
            </div>
            <div className={styles.processArrow}><FaArrowRight /></div>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>2</div>
              <h4>Evaluación técnica</h4>
              <p>Prueba práctica según el área de tu interés</p>
            </div>
            <div className={styles.processArrow}><FaArrowRight /></div>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>3</div>
              <h4>Entrevista</h4>
              <p>Conversatorio con el equipo para conocerte mejor</p>
            </div>
            <div className={styles.processArrow}><FaArrowRight /></div>
            <div className={styles.processStep}>
              <div className={styles.stepNumber}>4</div>
              <h4>Ingreso al programa</h4>
              <p>¡Bienvenido! Comienza tu desarrollo profesional con nosotros</p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className={`${styles.testimonialsSection} ${isVisible ? styles.animateIn : ''}`}>
          <h2 className={styles.sectionTitle}>Lo que dicen nuestros participantes</h2>
          <div className={styles.testimonialsGrid}>
            <div className={styles.testimonialCard}>
              <p>"El programa me dio las herramientas y la confianza para entrar al mundo del desarrollo. Ahora soy parte del equipo full-time."</p>
              <div className={styles.testimonialAuthor}>
                <strong>María Jose</strong>
                <span>Desarrolladora Frontend</span>
              </div>
            </div>
            <div className={styles.testimonialCard}>
              <p>"La mentoría personalizada hizo toda la diferencia. Aprendí más en 3 meses que en un año de cursos por mi cuenta."</p>
              <div className={styles.testimonialAuthor}>
                <strong>Carlos Fonseca Gutierrez</strong>
                <span>Especialista IoT</span>
              </div>
            </div>
            <div className={styles.testimonialCard}>
              <p>"Excelente oportunidad para crecer profesionalmente. El ambiente es increíble y siempre hay apoyo del equipo."</p>
              <div className={styles.testimonialAuthor}>
                <strong>Ana Martínez</strong>
                <span>Diseñadora UX/UI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;