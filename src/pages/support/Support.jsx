// src/pages/Support/index.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaClock,
  FaHeadset,
  FaTicketAlt,
  FaComment,
  FaArrowRight,
  FaCheckCircle,
  FaShieldAlt,
  FaRocket
} from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import styles from './Support.module.css';

const Support = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    priority: 'normal'
  });

  const [formErrors, setFormErrors] = useState({});

  const EMAILJS_SERVICE_ID = 'service_irvthxe';
  const EMAILJS_TEMPLATE_ID = 'template_support';
  const EMAILJS_PUBLIC_KEY = 'hY2LpwoPAxGjcXKrS';

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

    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Correo inválido';
    }

    if (!formData.subject.trim()) newErrors.subject = 'El asunto es obligatorio';
    if (!formData.message.trim()) newErrors.message = 'El mensaje es obligatorio';

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Por favor, completa todos los campos');
      return;
    }

    setIsSubmitting(true);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'No especificado',
        subject: formData.subject,
        message: formData.message,
        priority: formData.priority === 'high' ? 'Alta' : formData.priority === 'urgent' ? 'Urgente' : 'Normal',
        sent_date: new Date().toLocaleString('es-ES')
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      
      toast.success('Mensaje enviado. Te responderemos pronto.');
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        priority: 'normal'
      });
      
    } catch (error) {
      toast.error('Error al enviar. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/50577966272?text=Hola!%20Necesito%20soporte%20técnico', '_blank');
  };

  return (
    <div className={styles.supportPage}>
      <Toaster position="top-right" />
      
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Centro de <span className={styles.gradientText}>Soporte</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Estamos aquí para ayudarte. Elige el canal que prefieras
          </p>
        </div>
      </div>

      <div className={styles.container}>
        {/* Contact Channels */}
        <div className={`${styles.channelsSection} ${isVisible ? styles.animateIn : ''}`}>
          <div className={styles.channelCard}>
            <FaWhatsapp className={styles.channelIcon} style={{ color: '#25D366' }} />
            <h3>WhatsApp</h3>
            <p>Respuesta rápida en minutos</p>
            <button onClick={handleWhatsApp} className={styles.channelBtn}>
              Contactar <FaArrowRight />
            </button>
          </div>
          <div className={styles.channelCard}>
            <FaEnvelope className={styles.channelIcon} style={{ color: '#10B981' }} />
            <h3>Email</h3>
            <p>Respuesta en menos de 24h</p>
            <a href="mailto:codetreecompany@gmail.com" className={styles.channelBtn}>
              codetreecompany@gmail.com <FaArrowRight />
            </a>
          </div>
          <div className={styles.channelCard}>
            <FaPhone className={styles.channelIcon} style={{ color: '#2563EB' }} />
            <h3>Teléfono</h3>
            <p>Lun-Vie 9:00 - 18:00</p>
            <a href="tel:+50577966272" className={styles.channelBtn}>
              +505 7796 6272 <FaArrowRight />
            </a>
          </div>
        </div>

        {/* Support Hours */}
        <div className={`${styles.hoursSection} ${isVisible ? styles.animateIn : ''}`}>
          <div className={styles.hoursCard}>
            <FaClock className={styles.hoursIcon} />
            <h3>Horario de atención</h3>
            <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
            <p>Soporte urgente 24/7 para clientes Enterprise</p>
          </div>
          <div className={styles.hoursCard}>
            <FaHeadset className={styles.hoursIcon} />
            <h3>Tiempo de respuesta</h3>
            <p>Email: 24 horas</p>
            <p>WhatsApp: 1-2 horas</p>
            <p>Teléfono: Inmediato</p>
          </div>
        </div>

        {/* Support Form */}
        <div className={`${styles.formSection} ${isVisible ? styles.animateIn : ''}`}>
          <h2>Envíanos un mensaje</h2>
          <p>Completa el formulario y te responderemos lo antes posible</p>
          
          <form className={styles.supportForm} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Nombre completo *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={formErrors.name ? styles.error : ''}
                />
                {formErrors.name && <span>{formErrors.name}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>Correo electrónico *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={formErrors.email ? styles.error : ''}
                />
                {formErrors.email && <span>{formErrors.email}</span>}
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Opcional"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Prioridad</label>
                <select name="priority" value={formData.priority} onChange={handleChange}>
                  <option value="normal">Normal</option>
                  <option value="high">Alta</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Asunto *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={formErrors.subject ? styles.error : ''}
              />
              {formErrors.subject && <span>{formErrors.subject}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>Mensaje *</label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className={formErrors.message ? styles.error : ''}
              />
              {formErrors.message && <span>{formErrors.message}</span>}
            </div>

            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
            </button>
          </form>
        </div>

        {/* FAQ Link */}
        <div className={`${styles.faqLink} ${isVisible ? styles.animateIn : ''}`}>
          <div className={styles.faqCard}>
            <FaComment className={styles.faqIcon} />
            <div>
              <h3>¿Buscas respuestas rápidas?</h3>
              <p>Visita nuestra sección de preguntas frecuentes</p>
            </div>
            <button onClick={() => window.location.href = '/faq'}>
              Ver FAQ <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;