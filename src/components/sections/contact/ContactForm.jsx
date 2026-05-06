// src/components/sections/Contact/ContactForm.jsx
import React, { useState, useRef, useEffect } from 'react';
import { 
  FaUser, 
  FaBuilding, 
  FaEnvelope, 
  FaPhone, 
  FaCommentDots, 
  FaClock, 
  FaUsers, 
  FaPaperPlane,
  FaCheckCircle,
  FaWhatsapp
} from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import styles from './ContactForm.module.css';

const ContactForm = ({ isModal = false, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    projectDescription: '',
    timeline: '',
    userRange: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef(null);

  // EmailJS configuration
  const EMAILJS_SERVICE_ID = 'service_irvthxe';
  const EMAILJS_TEMPLATE_ID = 'template_b5g8jnk';
  const EMAILJS_PUBLIC_KEY = 'hY2LpwoPAxGjcXKrS';

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    console.log('EmailJS initialized with public key:', EMAILJS_PUBLIC_KEY);
  }, []);

  // Timeline options
  const timelineOptions = [
    { value: '', label: 'Selecciona el plazo' },
    { value: 'immediate', label: '🚀 Inmediato (menos de 1 semana)' },
    { value: 'urgent', label: '⚡ Urgente (1-2 semanas)' },
    { value: 'normal', label: '📅 Normal (1-3 meses)' },
    { value: 'flexible', label: '🎯 Flexible (3-6 meses)' },
    { value: 'planning', label: '📋 En planificación (más de 6 meses)' }
  ];

  // User range options
  const userRangeOptions = [
    { value: '', label: 'Selecciona el rango de usuarios' },
    { value: '1-10', label: '👤 1-10 usuarios' },
    { value: '11-50', label: '👥 11-50 usuarios' },
    { value: '51-200', label: '👥👥 51-200 usuarios' },
    { value: '201-1000', label: '🏢 201-1000 usuarios' },
    { value: '1000+', label: '🌍 Más de 1000 usuarios' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    } else if (formData.name.length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }

    if (formData.phone) {
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Ingresa un número de teléfono válido';
      }
    }

    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = 'La descripción del proyecto es obligatoria';
    } else if (formData.projectDescription.length < 20) {
      newErrors.projectDescription = 'Descripción muy corta (mínimo 20 caracteres)';
    } else if (formData.projectDescription.length > 2000) {
      newErrors.projectDescription = 'Descripción muy larga (máximo 2000 caracteres)';
    }

    if (!formData.timeline) {
      newErrors.timeline = 'Selecciona el plazo estimado';
    }

    if (!formData.userRange) {
      newErrors.userRange = 'Selecciona el rango de usuarios';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form submission started');
    console.log('Form data:', formData);
    
    if (!validateForm()) {
      console.log('Validation failed:', errors);
      toast.error('Por favor, corrige los errores en el formulario');
      return;
    }

    setIsSubmitting(true);

    try {
      // Get selected option labels
      const timelineLabel = timelineOptions.find(opt => opt.value === formData.timeline)?.label || formData.timeline;
      const userRangeLabel = userRangeOptions.find(opt => opt.value === formData.userRange)?.label || formData.userRange;

      // Prepare template parameters - MATCHING YOUR TEMPLATE EXACTLY
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        organization: formData.organization || 'No especificada',
        phone: formData.phone || 'No especificado',
        timeline: timelineLabel,
        user_range: userRangeLabel,
        project_description: formData.projectDescription,
        website: window.location.href,
        sent_date: new Date().toLocaleString('es-ES', {
          dateStyle: 'full',
          timeStyle: 'medium'
        })
      };

      console.log('Sending email with params:', templateParams);
      console.log('Service ID:', EMAILJS_SERVICE_ID);
      console.log('Template ID:', EMAILJS_TEMPLATE_ID);
      console.log('Public Key:', EMAILJS_PUBLIC_KEY);

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      
      console.log('EmailJS success response:', response);
      console.log('Response status:', response.status);
      console.log('Response text:', response.text);
      
      setIsSuccess(true);
      toast.success('¡Mensaje enviado con éxito! Te contactaremos pronto.');
      
      setFormData({
        name: '',
        organization: '',
        email: '',
        phone: '',
        projectDescription: '',
        timeline: '',
        userRange: ''
      });
      
      // Close modal if in modal mode
      if (isModal && onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
      
      setTimeout(() => setIsSuccess(false), 5000);
      
    } catch (error) {
      console.error('❌ Error sending message:', error);
      console.error('Error details:', {
        message: error.message,
        text: error.text,
        status: error.status,
        stack: error.stack
      });
      
      // Mostrar mensaje de error más específico
      let errorMessage = 'Error al enviar el mensaje. ';
      if (error.text) {
        errorMessage += error.text;
      } else if (error.message) {
        errorMessage += error.message;
      } else {
        errorMessage += 'Por favor, intenta de nuevo.';
      }
      
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message = `Hola! Me gustaría obtener información sobre los servicios de CodeTree.`;
    window.open(`https://wa.me/50557893565?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--card-bg)',
            color: 'var(--text-primary)',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: 'white',
            },
          },
        }}
      />
      
      <form ref={formRef} className={`${styles.contactForm} ${isModal ? styles.modalForm : ''}`} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              <FaUser className={styles.inputIcon} />
              Nombre completo *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Juan Pérez"
              className={errors.name ? styles.error : ''}
            />
            {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="organization">
              <FaBuilding className={styles.inputIcon} />
              Organización (opcional)
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="Empresa XYZ"
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="email">
              <FaEnvelope className={styles.inputIcon} />
              Correo electrónico *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="juan@ejemplo.com"
              className={errors.email ? styles.error : ''}
            />
            {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">
              <FaPhone className={styles.inputIcon} />
              Teléfono (opcional)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+505 1234 5678"
              className={errors.phone ? styles.error : ''}
            />
            {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="timeline">
              <FaClock className={styles.inputIcon} />
              Plazo estimado *
            </label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className={errors.timeline ? styles.error : ''}
            >
              {timelineOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {errors.timeline && <span className={styles.errorMessage}>{errors.timeline}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="userRange">
              <FaUsers className={styles.inputIcon} />
              Rango de usuarios *
            </label>
            <select
              id="userRange"
              name="userRange"
              value={formData.userRange}
              onChange={handleChange}
              className={errors.userRange ? styles.error : ''}
            >
              {userRangeOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {errors.userRange && <span className={styles.errorMessage}>{errors.userRange}</span>}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="projectDescription">
            <FaCommentDots className={styles.inputIcon} />
            Descripción del proyecto *
          </label>
          <textarea
            id="projectDescription"
            name="projectDescription"
            rows={isModal ? 3 : 5}
            value={formData.projectDescription}
            onChange={handleChange}
            placeholder="Cuéntanos sobre tu proyecto, objetivos y requisitos específicos..."
            className={errors.projectDescription ? styles.error : ''}
          />
          <div className={styles.charCount}>
            {formData.projectDescription.length}/2000 caracteres
          </div>
          {errors.projectDescription && <span className={styles.errorMessage}>{errors.projectDescription}</span>}
        </div>

        <div className={styles.formActions}>
          <button 
            type="submit" 
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>Enviando...</>
            ) : (
              <>Enviar mensaje <FaPaperPlane /></>
            )}
          </button>
          <button 
            type="button" 
            className={styles.whatsappBtn}
            onClick={handleWhatsAppClick}
          >
            <FaWhatsapp /> Contactar por WhatsApp
          </button>
        </div>

        {isSuccess && (
          <div className={styles.successMessage}>
            <FaCheckCircle />
            <div>
              <strong>¡Mensaje enviado!</strong>
              <p>Gracias por contactarnos. Te responderemos en menos de 24 horas.</p>
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default ContactForm;