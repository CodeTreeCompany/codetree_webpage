// src/pages/FAQ/index.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  FaChevronDown,
  FaChevronUp,
  FaQuestionCircle,
  FaCode,
  FaMoneyBillWave,
  FaClock,
  FaShieldAlt,
  FaUsers,
  FaLaptopCode,
  FaHeadset,
  FaWhatsapp,
  FaEnvelope
} from 'react-icons/fa';
import styles from './FAQ.module.css';

const FAQ = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);

  const faqs = [
    {
      category: "General",
      icon: FaQuestionCircle,
      questions: [
        {
          id: 1,
          question: "¿Qué servicios ofrece CodeTree?",
          answer: "CodeTree ofrece desarrollo de software a medida, soluciones IoT, automatización e IA, plataformas SaaS, ciberseguridad, apps móviles, transformación digital, DevOps, análisis de datos y software contable."
        },
        {
          id: 2,
          question: "¿Cómo puedo contratar un servicio?",
          answer: "Puedes contactarnos a través del formulario en nuestra página, por WhatsApp al +505 7796 6272, o enviando un correo a codetreecompany@gmail.com. Te contactaremos en menos de 24 horas."
        },
        {
          id: 3,
          question: "¿Cuánto tiempo toma desarrollar un proyecto?",
          answer: "El tiempo varía según la complejidad del proyecto. Proyectos pequeños pueden tomar 2-4 semanas, mientras que proyectos más complejos pueden tomar 3-6 meses. Ofrecemos entregas por módulos para que puedas ver resultados rápidamente."
        }
      ]
    },
    {
      category: "Desarrollo de Software",
      icon: FaCode,
      questions: [
        {
          id: 4,
          question: "¿Qué tecnologías utilizan?",
          answer: "Utilizamos tecnologías modernas como React, Node.js, Python, Java, TypeScript, PostgreSQL, MongoDB, Docker, Kubernetes, entre otras. Siempre elegimos la mejor tecnología para cada proyecto."
        },
        {
          id: 5,
          question: "¿Entregan el código fuente?",
          answer: "Sí, el código fuente es 100% tuyo. Entregamos el código completo con documentación técnica y guías de despliegue."
        },
        {
          id: 6,
          question: "¿Ofrecen mantenimiento post-entrega?",
          answer: "Sí, ofrecemos planes de mantenimiento y soporte continuo. Incluyen corrección de errores, actualizaciones de seguridad y mejoras menores."
        }
      ]
    },
    {
      category: "Pagos y Presupuestos",
      icon: FaMoneyBillWave,
      questions: [
        {
          id: 7,
          question: "¿Cómo funcionan los pagos?",
          answer: "Trabajamos con pagos por módulo. Entregamos un módulo funcional, recibes el pago acordado, y continuamos con el siguiente. También ofrecemos planes de suscripción para servicios SaaS."
        },
        {
          id: 8,
          question: "¿Ofrecen cotizaciones gratis?",
          answer: "Sí, ofrecemos cotizaciones sin costo. Analizamos tus requerimientos y te entregamos un presupuesto detallado sin compromiso."
        },
        {
          id: 9,
          question: "¿Aceptan pagos en córdobas?",
          answer: "Sí, aceptamos pagos en córdobas nicaragüenses y también en dólares estadounidenses."
        }
      ]
    },
    {
      category: "Plazos y Entregas",
      icon: FaClock,
      questions: [
        {
          id: 10,
          question: "¿Cumplen con las fechas de entrega?",
          answer: "Sí, nos comprometemos con las fechas acordadas. Trabajamos con metodologías ágiles y entregas incrementales para garantizar resultados."
        },
        {
          id: 11,
          question: "¿Puedo solicitar cambios durante el desarrollo?",
          answer: "Sí, entendemos que los requisitos pueden cambiar. Tenemos procesos flexibles para incorporar cambios, siempre evaluando el impacto en tiempo y costo."
        }
      ]
    },
    {
      category: "Seguridad y Calidad",
      icon: FaShieldAlt,
      questions: [
        {
          id: 12,
          question: "¿Cómo garantizan la seguridad de los datos?",
          answer: "Implementamos prácticas DevSecOps, cifrado de datos, auditorías regulares y cumplimos con estándares internacionales de seguridad."
        },
        {
          id: 13,
          question: "¿Realizan pruebas de calidad?",
          answer: "Sí, realizamos pruebas unitarias, de integración, funcionales y de rendimiento. Aseguramos que el software sea robusto y confiable."
        }
      ]
    },
    {
      category: "Soporte",
      icon: FaHeadset,
      questions: [
        {
          id: 14,
          question: "¿Qué tipo de soporte ofrecen?",
          answer: "Ofrecemos soporte por email, WhatsApp y teléfono. Horario de atención: Lunes a Viernes de 9:00 a 18:00. Para clientes Enterprise, soporte 24/7."
        },
        {
          id: 15,
          question: "¿Tienen garantía?",
          answer: "Sí, todos nuestros servicios incluyen garantía de 30 días post-entrega para corrección de errores. Planes extendidos disponibles."
        }
      ]
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

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/50577966272?text=Hola!%20Tengo%20una%20consulta%20sobre%20los%20servicios%20de%20CodeTree', '_blank');
  };

  return (
    <div className={styles.faqPage}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Preguntas <span className={styles.gradientText}>Frecuentes</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Encuentra respuestas a las dudas más comunes sobre nuestros servicios
          </p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={`${styles.faqGrid} ${isVisible ? styles.animateIn : ''}`}>
          {faqs.map((category, catIdx) => {
            const CategoryIcon = category.icon;
            return (
              <div key={catIdx} className={styles.categorySection}>
                <div className={styles.categoryHeader}>
                  <CategoryIcon className={styles.categoryIcon} />
                  <h2>{category.category}</h2>
                </div>
                <div className={styles.questionsList}>
                  {category.questions.map((faq, idx) => {
                    const globalIndex = `${catIdx}-${idx}`;
                    const isOpen = openIndex === globalIndex;
                    return (
                      <div key={faq.id} className={styles.questionItem}>
                        <button
                          className={styles.questionButton}
                          onClick={() => toggleQuestion(globalIndex)}
                        >
                          <span>{faq.question}</span>
                          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                        <div className={`${styles.answer} ${isOpen ? styles.open : ''}`}>
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h3>¿No encontraste lo que buscabas?</h3>
            <p>Contáctanos directamente y resolveremos todas tus dudas</p>
            <div className={styles.ctaButtons}>
              <button className={styles.ctaButton} onClick={() => window.location.href = '/contacto'}>
                <FaEnvelope /> Contactar por Email
              </button>
              <button className={styles.whatsappButton} onClick={handleWhatsApp}>
                <FaWhatsapp /> Contactar por WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;