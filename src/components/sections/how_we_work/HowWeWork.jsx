// src/components/sections/HowWeWork/HowWeWork.jsx
import React, { useEffect, useState, useRef } from 'react';
import { 
  FaClipboardList, 
  FaProjectDiagram, 
  FaFileSignature, 
  FaCodeBranch, 
  FaVial, 
  FaRocket,
  FaCheckCircle,
  FaTrophy,
  FaCar,
  FaArrowLeft,
  FaArrowRight
} from 'react-icons/fa';
import styles from './HowWeWork.module.css';

const HowWeWork = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [carPosition, setCarPosition] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const animationRef = useRef(null);
  const autoPlayRef = useRef(null);
  const popupTimerRef = useRef(null);

  const steps = [
    {
      id: 0,
      number: "01",
      title: "Requisitos",
      icon: FaClipboardList,
      color: "#10B981",
      gradient: "linear-gradient(135deg, #10B981, #059669)",
      description: "Definimos los requerimientos del proyecto",
      longDescription: "Realizamos entrevistas detalladas, analizamos procesos actuales, identificamos necesidades específicas y documentamos cada requisito funcional y no funcional.",
      keyPoints: ["Entrevistas detalladas", "Análisis de procesos", "Documentación completa"]
    },
    {
      id: 1,
      number: "02",
      title: "Diseño",
      icon: FaProjectDiagram,
      color: "#2563EB",
      gradient: "linear-gradient(135deg, #2563EB, #1D4ED8)",
      description: "Diseñamos la solución técnica",
      longDescription: "Creamos la arquitectura del sistema, diseñamos diagramas UML, definimos la stack tecnológica y establecemos patrones de diseño.",
      keyPoints: ["Arquitectura escalable", "Diagramas UML", "Stack tecnológica"]
    },
    {
      id: 2,
      number: "03",
      title: "Contrato",
      icon: FaFileSignature,
      color: "#7C3AED",
      gradient: "linear-gradient(135deg, #7C3AED, #6D28D9)",
      description: "Acordamos términos y condiciones",
      longDescription: "Establecemos términos claros, definimos entregables por módulo, acordamos fechas de entrega y montos de pago por módulo completado.",
      keyPoints: ["Términos claros", "Entregables por módulo", "Pagos acordados"]
    },
    {
      id: 3,
      number: "04",
      title: "Desarrollo",
      icon: FaCodeBranch,
      color: "#F59E0B",
      gradient: "linear-gradient(135deg, #F59E0B, #D97706)",
      description: "Construimos módulo por módulo",
      longDescription: "Desarrollamos incrementalmente, entregamos cada módulo en fecha acordada, recibimos pago por módulo completado. Para entregas urgentes aplicamos metodología 'functional first'.",
      keyPoints: ["Desarrollo por módulos", "Entregas continuas", "Functional first"]
    },
    {
      id: 4,
      number: "04",
      title: "Testing",
      icon: FaVial,
      color: "#EF4444",
      gradient: "linear-gradient(135deg, #EF4444, #DC2626)",
      description: "Aseguramos calidad total",
      longDescription: "Realizamos pruebas unitarias, pruebas de integración, pruebas de interfaz, aseguramos que no haya breaking changes y garantizamos sistema 100% funcional.",
      keyPoints: ["Pruebas unitarias", "Integración perfecta", "100% funcional"]
    },
    {
      id: 5,
      number: "06",
      title: "Entrega",
      icon: FaRocket,
      color: "#EC4899",
      gradient: "linear-gradient(135deg, #EC4899, #DB2777)",
      description: "Entregamos y escalamos",
      longDescription: "Implementamos buenas prácticas, estándares de codificación, documentación técnica, aseguramos escalabilidad y facilitamos mantenimiento futuro.",
      keyPoints: ["Código de calidad", "Buenas prácticas", "Escalabilidad"]
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
      stopAutoPlay();
      if (popupTimerRef.current) {
        clearTimeout(popupTimerRef.current);
      }
    };
  }, []);

  // Start auto-play when visible and not animating
  useEffect(() => {
    if (isVisible && !isAnimating) {
      startAutoPlay();
    }
    return () => stopAutoPlay();
  }, [isVisible, isAnimating]);

  // Show popup when car arrives at a step
  useEffect(() => {
    if (isVisible && !isAnimating && steps[activeStep]) {
      setShowPopup(true);
      
      // Find car position to place popup near it
      const carElement = document.querySelector(`.${styles.animatedCar}`);
      if (carElement) {
        const rect = carElement.getBoundingClientRect();
        setPopupPosition({
          x: rect.right + 15,
          y: rect.top - 20
        });
      }
      
      // Auto hide popup after 3.5 seconds
      if (popupTimerRef.current) {
        clearTimeout(popupTimerRef.current);
      }
      popupTimerRef.current = setTimeout(() => {
        setShowPopup(false);
      }, 3500);
    }
  }, [activeStep, isAnimating, isVisible]);

  const startAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      if (!isAnimating && isVisible) {
        if (activeStep < steps.length - 1) {
          animateCarToStep(activeStep + 1);
        } else {
          // Reset to beginning after finishing
          animateCarToStep(0);
        }
      }
    }, 4000);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  const animateCarToStep = (targetStep) => {
    if (isAnimating || targetStep === activeStep) return;
    
    stopAutoPlay();
    setShowPopup(false);
    
    setIsAnimating(true);
    const startPosition = carPosition;
    const endPosition = targetStep;
    const duration = 800;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeInOutCubic(progress);
      const newPosition = startPosition + (endPosition - startPosition) * easeProgress;
      setCarPosition(newPosition);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCarPosition(endPosition);
        setActiveStep(targetStep);
        setIsAnimating(false);
        startAutoPlay();
      }
    };

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animationRef.current = requestAnimationFrame(animate);
  };

  const easeInOutCubic = (x) => {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1 && !isAnimating) {
      stopAutoPlay();
      animateCarToStep(activeStep + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep > 0 && !isAnimating) {
      stopAutoPlay();
      animateCarToStep(activeStep - 1);
    }
  };

  const handleStepClick = (index) => {
    if (index !== activeStep && !isAnimating && index >= 0 && index < steps.length) {
      stopAutoPlay();
      animateCarToStep(index);
    }
  };

  const getCarStyle = () => {
    const positions = [
      { left: "8%", top: "15%" },
      { left: "25%", top: "27%" },
      { left: "42%", top: "35%" },
      { left: "58%", top: "39%" },
      { left: "72%", top: "35%" },
      { left: "88%", top: "27%" }
    ];
    const pos = positions[Math.round(carPosition)] || positions[0];
    return pos;
  };

  const currentStep = steps[activeStep];
  const Icon = currentStep.icon;

  return (
    <section ref={sectionRef} className={styles.howWeWork}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Metodología de Trabajo</span>
          <h2 className={styles.title}>
            Nuestro Camino hacia el 
            <span className={styles.gradientText}> Éxito</span>
          </h2>
          <p className={styles.subtitle}>
            Un viaje transformador desde la idea hasta la realidad
          </p>
        </div>

        <div className={styles.roadWrapper}>
          <div className={styles.roadContainer}>
            <svg className={styles.roadSvg} viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4B5563"/>
                  <stop offset="100%" stopColor="#374151"/>
                </linearGradient>
              </defs>
              
              <path
                d="M 50 80 Q 200 80, 300 150 T 600 200 Q 750 200, 850 150 T 1100 80"
                fill="none"
                stroke="url(#roadGrad)"
                strokeWidth="80"
                strokeLinecap="round"
              />
              
              <path
                d="M 50 80 Q 200 80, 300 150 T 600 200 Q 750 200, 850 150 T 1100 80"
                fill="none"
                stroke="#FBBF24"
                strokeWidth="2"
                strokeDasharray="10, 15"
              />

              {/* Start flag */}
              <g transform="translate(30, 60)">
                <rect x="0" y="0" width="4" height="30" fill="#9CA3AF" />
                <path d="M4 0 L25 6 L4 12 Z" fill="#10B981" />
                <text x="8" y="9" fill="white" fontSize="6" fontWeight="bold">INICIO</text>
              </g>

              {/* Finish flag */}
              <g transform="translate(1080, 60)">
                <rect x="0" y="0" width="4" height="30" fill="#9CA3AF" />
                <path d="M0 0 L25 6 L0 12 Z" fill="#EF4444" />
                <text x="3" y="9" fill="white" fontSize="6" fontWeight="bold">META</text>
              </g>

              {/* Step markers */}
              {steps.map((step, index) => {
                const positions = [
                  { x: 180, y: 115 }, 
                  { x: 380, y: 175 }, 
                  { x: 580, y: 195 }, 
                  { x: 780, y: 175 }, 
                  { x: 950, y: 135 }, 
                  { x: 1080, y: 100 }
                ];
                const pos = positions[index];
                const isActive = activeStep === index;
                const isCompleted = index < activeStep;
                
                return (
                  <g key={step.id} onClick={() => handleStepClick(index)} style={{ cursor: 'pointer' }}>
                    <circle cx={pos.x} cy={pos.y} r="22" fill="#1F2937" stroke={step.color} strokeWidth="3" />
                    <circle cx={pos.x} cy={pos.y} r="15" fill={step.color} />
                    {isCompleted ? (
                      <FaCheckCircle x={pos.x - 8} y={pos.y - 8} width="16" height="16" color="white" />
                    ) : (
                      <text x={pos.x} y={pos.y + 4} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                        {step.number}
                      </text>
                    )}
                    <text x={pos.x} y={pos.y + 35} textAnchor="middle" fill={step.color} fontSize="9" fontWeight="600">
                      {step.title}
                    </text>
                  </g>
                );
              })}
            </svg>

            {isVisible && (
              <div className={styles.animatedCar} style={getCarStyle()}>
                <FaCar className={styles.carIcon} />
              </div>
            )}

            {/* Popup Tooltip */}
            {showPopup && currentStep && (
              <div 
                className={styles.popupTooltip}
                style={{ 
                  left: popupPosition.x, 
                  top: popupPosition.y
                }}
              >
                <div className={styles.popupHeader} style={{ background: currentStep.gradient }}>
                  <div className={styles.popupIcon}>
                    <Icon />
                  </div>
                  <div className={styles.popupTitle}>
                    <span className={styles.popupStep}>Paso {currentStep.number}</span>
                    <h4>{currentStep.title}</h4>
                  </div>
                </div>
                <div className={styles.popupBody}>
                  <p>{currentStep.description}</p>
                  <div className={styles.popupPoints}>
                    {currentStep.keyPoints.slice(0, 2).map((point, idx) => (
                      <span key={idx} className={styles.popupPoint}>
                        <span className={styles.popupPointDot} style={{ background: currentStep.color }}></span>
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Panel - Visible on mobile, hidden on desktop when popup shows */}
        <div className={styles.infoPanel}>
          <div className={styles.infoHeader} style={{ background: currentStep.gradient }}>
            <div className={styles.infoIcon}>
              <Icon />
            </div>
            <div className={styles.infoTitle}>
              <span className={styles.infoStep}>Paso {currentStep.number}</span>
              <h3>{currentStep.title}</h3>
              <p>{currentStep.description}</p>
            </div>
          </div>
          
          <div className={styles.infoBody}>
            <p>{currentStep.longDescription}</p>
            <div className={styles.infoPoints}>
              {currentStep.keyPoints.map((point, idx) => (
                <span key={idx} className={styles.infoPoint}>
                  <span className={styles.infoPointDot} style={{ background: currentStep.color }}></span>
                  {point}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.infoFooter}>
            <button className={styles.navButton} onClick={handlePrev} disabled={activeStep === 0 || isAnimating}>
              <FaArrowLeft /> Anterior
            </button>
            <div className={styles.stepProgress}>
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  className={`${styles.progressDot} ${activeStep === idx ? styles.active : ''}`}
                  onClick={() => handleStepClick(idx)}
                  style={{ background: idx === activeStep ? steps[idx].color : 'var(--border-color)' }}
                />
              ))}
            </div>
            <button className={styles.navButton} onClick={handleNext} disabled={activeStep === steps.length - 1 || isAnimating}>
              Siguiente <FaArrowRight />
            </button>
          </div>
        </div>

        <div className={styles.highlights}>
          <div className={styles.highlightCard}>
            <div className={styles.highlightIcon}>⚡</div>
            <h4>Functional First</h4>
            <p>Para entregas urgentes, funciona primero, luego optimizamos.</p>
          </div>
          <div className={styles.highlightCard}>
            <div className={styles.highlightIcon}>💰</div>
            <h4>Pago por Módulo</h4>
            <p>Entregamos y recibimos pago por cada módulo completado.</p>
          </div>
          <div className={styles.highlightCard}>
            <div className={styles.highlightIcon}>🔄</div>
            <h4>Integración Perfecta</h4>
            <p>Sistema 100% funcional sin breaking changes.</p>
          </div>
          <div className={styles.highlightCard}>
            <div className={styles.highlightIcon}>📋</div>
            <h4>Código de Calidad</h4>
            <p>Escalabilidad y mantenimiento garantizados.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;