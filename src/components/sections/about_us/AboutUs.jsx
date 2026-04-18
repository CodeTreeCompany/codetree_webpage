// src/components/sections/AboutUs/AboutUs.jsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { 
  FaLightbulb, 
  FaBalanceScale, 
  FaStar, 
  FaHandshake, 
  FaShieldAlt, 
  FaUsers, 
  FaBook, 
  FaBullseye, 
  FaHeart,
  FaCheckCircle,
  FaTerminal
} from 'react-icons/fa';
import styles from './AboutUs.module.css';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeValue, setActiveValue] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const sectionRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const values = [
    {
      title: "Innovación con propósito",
      description: "Creamos tecnología que genera impacto real en la sociedad y los negocios.",
      icon: FaLightbulb
    },
    {
      title: "Ética profesional",
      description: "Actuamos con transparencia, responsabilidad y compromiso en cada proyecto.",
      icon: FaBalanceScale
    },
    {
      title: "Calidad y excelencia",
      description: "Entregamos software robusto, probado y alineado a estándares modernos.",
      icon: FaStar
    },
    {
      title: "Compromiso",
      description: "Cumplimos lo prometido con responsabilidad y enfoque en resultados.",
      icon: FaHandshake
    },
    {
      title: "Seguridad y privacidad",
      description: "Protegemos los datos y garantizamos la confidencialidad de nuestros clientes.",
      icon: FaShieldAlt
    },
    {
      title: "Trabajo en equipo",
      description: "Fomentamos la colaboración y el respeto entre todos los miembros.",
      icon: FaUsers
    },
    {
      title: "Aprendizaje continuo",
      description: "Nos adaptamos a nuevas tecnologías y tendencias del mercado.",
      icon: FaBook
    },
    {
      title: "Orientación al cliente",
      description: "Diseñamos soluciones centradas en las necesidades reales del usuario.",
      icon: FaBullseye
    },
    {
      title: "Pasión por la tecnología",
      description: "Disfrutamos lo que hacemos y buscamos siempre mejorar.",
      icon: FaHeart
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

  // Function to type text - FIXED with debug
  const typeText = useCallback((title, description) => {
    // Clear any existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    
    // Build the text carefully
    const titleText = title.trim();
    const descriptionText = `> ${description.trim()}`;
    const fullText = `${titleText}\n${descriptionText}`;
    
    console.log('Full text to type:', fullText);
    console.log('Full text length:', fullText.length);
    console.log('Last character:', fullText[fullText.length - 1]);
    
    let i = 0;
    setDisplayedText('');
    setIsTyping(true);
    
    const type = () => {
      if (i < fullText.length) {
        const currentChar = fullText[i];
        setDisplayedText(prev => prev + currentChar);
        i++;
        typingTimeoutRef.current = setTimeout(type, 50);
      } else {
        console.log('Typing complete. Final text:', displayedText);
        setIsTyping(false);
        typingTimeoutRef.current = null;
      }
    };
    
    type();
  }, []);

  // Start typing for a specific value
  const startTypingForValue = useCallback((valueIndex) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    
    const value = values[valueIndex];
    if (!value) {
      console.error('Value not found at index:', valueIndex);
      return;
    }
    
    console.log('Starting typing for value:', value.title);
    console.log('Description:', value.description);
    
    // Pass title and description separately
    typeText(value.title, value.description);
  }, [values, typeText]);

  // Handle value change
  const handleValueChange = useCallback((index) => {
    if (activeValue !== index && index < values.length) {
      console.log('Changing from value', activeValue, 'to', index);
      setActiveValue(index);
      startTypingForValue(index);
    }
  }, [activeValue, startTypingForValue, values.length]);

  // Start auto-play when visible
  useEffect(() => {
    if (isVisible && displayedText === '' && !isTyping) {
      console.log('Starting auto-play');
      startTypingForValue(0);
    }
  }, [isVisible, displayedText, isTyping, startTypingForValue]);

  // Auto-advance to next value
  useEffect(() => {
    if (isVisible && !isTyping && displayedText !== '') {
      const timer = setTimeout(() => {
        if (activeValue < values.length - 1) {
          console.log('Auto-advancing to next value');
          handleValueChange(activeValue + 1);
        }
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isTyping, activeValue, isVisible, displayedText, handleValueChange, values.length]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  // Get the current value safely
  const currentValue = values[activeValue];
  let commandText = 'innovacion-con-proposito';
  
  if (currentValue && currentValue.title) {
    commandText = currentValue.title.toLowerCase().replace(/\s+/g, '-');
  }

  return (
    <section ref={sectionRef} className={styles.aboutUs}>
      <div className={styles.container}>
        {/* Slogan */}
        <div className={`${styles.slogan} ${isVisible ? styles.animateIn : ''}`}>
          <span className={styles.sloganText}>"Sembramos software, cosechamos éxito."</span>
        </div>

        {/* Description */}
        <div className={`${styles.description} ${isVisible ? styles.animateIn : ''}`}>
          <p>
            Empresa tecnológica especializada en el desarrollo de software personalizado, 
            automatización e inteligencia artificial, que genera soluciones innovadoras, 
            confiables y escalables.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className={`${styles.missionVisionGrid} ${isVisible ? styles.animateIn : ''}`}>
          <div className={styles.missionCard}>
            <div className={styles.cardIcon}>🎯</div>
            <h2 className={styles.cardTitle}>Misión</h2>
            <p className={styles.cardText}>
              Desarrollar soluciones tecnológicas eficientes, seguras y escalables que 
              optimicen procesos, reduzcan costos y generen valor real para nuestros clientes.
            </p>
          </div>
          
          <div className={styles.visionCard}>
            <div className={styles.cardIcon}>👁️</div>
            <h2 className={styles.cardTitle}>Visión</h2>
            <p className={styles.cardText}>
              Ser una empresa líder en Latinoamérica y el Caribe en desarrollo de software, 
              innovación tecnológica y soluciones inteligentes basadas en datos y automatización.
            </p>
          </div>
        </div>

        {/* Values Section with Console Effect */}
        <div className={`${styles.valuesSection} ${isVisible ? styles.animateIn : ''}`}>
          <h2 className={styles.valuesTitle}>Nuestros Valores</h2>
          
          <div className={styles.valuesContainer}>
            <div className={styles.valuesList}>
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <button
                    key={index}
                    className={`${styles.valueButton} ${activeValue === index ? styles.active : ''} ${index < activeValue ? styles.completed : ''}`}
                    onClick={() => handleValueChange(index)}
                  >
                    <Icon className={styles.valueIcon} />
                    <span className={styles.valueTitle}>{value.title}</span>
                    {index < activeValue && <FaCheckCircle className={styles.checkmark} />}
                  </button>
                );
              })}
            </div>
            
            <div className={styles.consoleContainer}>
              <div className={styles.consoleHeader}>
                <div className={styles.consoleButtons}>
                  <span className={styles.consoleButtonRed}></span>
                  <span className={styles.consoleButtonYellow}></span>
                  <span className={styles.consoleButtonGreen}></span>
                </div>
                <FaTerminal className={styles.consoleIcon} />
                <span className={styles.consoleTitle}>CodeTree Terminal - Values</span>
              </div>
              <div className={styles.consoleContent}>
                <div className={styles.consoleLine}>
                  <span className={styles.consolePrompt}>$</span>
                  <span className={styles.consoleCommand}>
                    ./values --show {commandText}
                  </span>
                </div>
                <div className={styles.consoleOutput}>
                  <pre className={styles.consoleText}>{displayedText || ' '}</pre>
                  {isTyping && <span className={styles.consoleCursor}>█</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;