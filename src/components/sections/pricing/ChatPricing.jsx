// src/components/sections/Pricing/ChatPricing.jsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { 
  FaPaperPlane,
  FaRedo,
  FaStar,
  FaShieldAlt,
  FaRocket,
  FaCheckCircle,
  FaDownload,
  FaWhatsapp,
  FaEnvelope,
  FaUserCircle
} from 'react-icons/fa';
import { chatMessages } from './chatMessages';
import styles from './ChatPricing.module.css';

const ChatPricing = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [conversationState, setConversationState] = useState({
    currentAction: 'welcome',
    answers: {
      name: '',
      businessType: '',
      employeeCount: '',
      cowCount: '',
      budget: '',
      urgency: '',
      urgencyMultiplier: 1,
      contactMethod: '',
      email: '',
      phone: ''
    },
    quote: null,
    waitingForInput: false,
    inputConfig: null
  });
  
  const messagesEndRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const sectionRef = useRef(null);
  const inputRef = useRef(null);
  const startChatTriggered = useRef(false);

  // Auto-focus input when waiting for input
  useEffect(() => {
    if (conversationState.waitingForInput && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [conversationState.waitingForInput]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startChatTriggered.current) {
          setIsVisible(true);
          startChatTriggered.current = true;
          setTimeout(() => {
            startChat();
          }, 500);
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

  // Only scroll when new message is added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  const addBotMessage = useCallback((text, options = null, isHtml = false) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', text, options, isHtml }]);
      setIsTyping(false);
    }, 500);
  }, []);

  const addUserMessage = useCallback((text) => {
    setMessages(prev => [...prev, { type: 'user', text }]);
  }, []);

  const startChat = useCallback(() => {
    if (chatStarted) return;
    setChatStarted(true);
    const message = chatMessages.welcome;
    addBotMessage(message.botMessage, message.options);
  }, [addBotMessage, chatStarted]);

  const calculateQuote = useCallback(() => {
    const answers = conversationState.answers;
    let basePrice = 0;
    let planName = '';
    let planType = '';
    let features = [];
    let period = 'mes';

    const cowCount = parseInt(answers.cowCount) || 0;
    const urgencyMultiplier = parseFloat(answers.urgencyMultiplier) || 1;

    if (answers.businessType === 'farm') {
      if (cowCount <= 100) {
        basePrice = 8;
        planName = 'Básico';
        planType = 'SaaS Mensual';
        features = ['2 granjas', '2 empleados', 'Hasta 100 animales', 'Módulos completos'];
      } else if (cowCount <= 400) {
        basePrice = 18;
        planName = 'Estándar';
        planType = 'SaaS Mensual';
        features = ['5 granjas', '12 empleados', '100-400 animales', 'Módulos completos'];
      } else if (cowCount <= 1000) {
        basePrice = 35;
        planName = 'Premium';
        planType = 'SaaS Mensual';
        features = ['Granjas ilimitadas', 'Empleados ilimitados', '400-1000 animales', 'Módulos completos'];
      } else {
        basePrice = cowCount * 0.01;
        planName = 'Enterprise';
        planType = 'SaaS Personalizado';
        features = [`${cowCount} animales`, 'Precio por animal', 'Todo incluido', 'Soporte prioritario'];
        period = 'mes';
      }
    } else {
      basePrice = 150;
      planName = 'Negocio+';
      planType = 'Licencia Única';
      features = ['Instalación única', 'Soporte 3 días', 'Actualizaciones 1 año', 'Sin límites de usuarios'];
      period = 'único';
    }

    const totalPrice = (basePrice * urgencyMultiplier).toFixed(2);

    return { basePrice, planName, planType, features, totalPrice, currency: 'USD', period };
  }, [conversationState.answers]);

  const processNextAction = useCallback(async (nextAction, option) => {
    // Save answer
    if (option) {
      setConversationState(prev => ({
        ...prev,
        answers: { ...prev.answers, [option.saveAs || option.id]: option.value || option.text }
      }));
    }

    const message = chatMessages[nextAction];
    
    if (!message) return;

    if (message.inputType) {
      // Show input field
      setConversationState(prev => ({ 
        ...prev, 
        currentAction: nextAction,
        waitingForInput: true, 
        inputConfig: message 
      }));
      addBotMessage(message.botMessage, null);
    } else if (message.options) {
      // Show options
      let botMessage = message.botMessage;
      if (typeof message.botMessage === 'function') {
        botMessage = message.botMessage(conversationState.answers.name, conversationState.answers);
      }
      addBotMessage(botMessage, message.options, message.id === 'showPlans' || message.id === 'quoteGenerated');
      setConversationState(prev => ({ ...prev, currentAction: nextAction, waitingForInput: false, inputConfig: null }));
    } else if (nextAction === 'generateQuote') {
      // Generate and show quote
      setIsTyping(true);
      setTimeout(() => {
        const quote = calculateQuote();
        const quoteMessage = chatMessages.quoteGenerated;
        const botMessage = quoteMessage.botMessage(quote, conversationState.answers);
        addBotMessage(botMessage, quoteMessage.options, true);
        setConversationState(prev => ({ ...prev, quote, waitingForInput: false, inputConfig: null }));
        setIsTyping(false);
      }, 1500);
    } else if (nextAction === 'advisorConfirmed') {
      const confirmMessage = chatMessages.advisorConfirmed;
      addBotMessage(confirmMessage.botMessage, confirmMessage.options);
      setConversationState(prev => ({ ...prev, currentAction: 'advisorConfirmed', waitingForInput: false, inputConfig: null }));
    }
  }, [addBotMessage, calculateQuote, conversationState.answers]);

  const handleAction = useCallback((action, option = null) => {
    switch (action) {
      case 'startQuote':
        const nameMessage = chatMessages.askName;
        addBotMessage(nameMessage.botMessage, null);
        setConversationState(prev => ({ 
          ...prev, 
          currentAction: 'askName',
          waitingForInput: true,
          inputConfig: nameMessage
        }));
        break;

      case 'showPlans':
        const plansMessage = chatMessages.showPlans;
        addBotMessage(plansMessage.botMessage, plansMessage.options, true);
        setConversationState(prev => ({ ...prev, currentAction: 'showPlans', waitingForInput: false, inputConfig: null }));
        break;

      case 'contactAdvisor':
        const advisorMessage = chatMessages.contactAdvisor;
        addBotMessage(advisorMessage.botMessage, advisorMessage.options);
        setConversationState(prev => ({ ...prev, currentAction: 'contactAdvisor', waitingForInput: false, inputConfig: null }));
        break;

      case 'restart':
        resetChat();
        break;

      case 'download':
        downloadQuote();
        const downloadMessage = chatMessages.afterDownload;
        addBotMessage(downloadMessage.botMessage, downloadMessage.options);
        break;

      case 'whatsapp':
        window.open(`https://wa.me/50557893565?text=Hola!%20Vengo%20de%20la%20cotización%20de%20CodeTree`, '_blank');
        const whatsappMessage = chatMessages.afterWhatsApp;
        addBotMessage(whatsappMessage.botMessage, whatsappMessage.options);
        break;

      case 'email':
        setConversationState(prev => ({ 
          ...prev, 
          waitingForInput: true, 
          inputConfig: { saveAs: "email", nextAction: "sendEmail" }
        }));
        addBotMessage("📧 Por favor, confirma tu correo electrónico para enviarte la cotización:", null);
        break;

      default:
        if (option && option.nextAction) {
          processNextAction(option.nextAction, option);
        }
        break;
    }
  }, [addBotMessage, processNextAction]);

  const handleOptionClick = useCallback((option) => {
    addUserMessage(option.text);
    
    if (option.action) {
      handleAction(option.action, option);
    } else if (option.nextAction) {
      // Save the answer value
      if (option.value) {
        setConversationState(prev => ({
          ...prev,
          answers: { ...prev.answers, [option.saveAs || option.id]: option.value }
        }));
      }
      // Save count values
      if (option.cowCount) {
        setConversationState(prev => ({
          ...prev,
          answers: { ...prev.answers, cowCount: option.cowCount }
        }));
      }
      if (option.employeeCount) {
        setConversationState(prev => ({
          ...prev,
          answers: { ...prev.answers, employeeCount: option.employeeCount }
        }));
      }
      if (option.budget) {
        setConversationState(prev => ({
          ...prev,
          answers: { ...prev.answers, budget: option.budget }
        }));
      }
      if (option.multiplier) {
        setConversationState(prev => ({
          ...prev,
          answers: { ...prev.answers, urgencyMultiplier: option.multiplier, urgency: option.urgency }
        }));
      }
      
      processNextAction(option.nextAction, option);
    }
  }, [addUserMessage, handleAction, processNextAction]);

  const handleTextSubmit = useCallback((text, inputConfig) => {
    addUserMessage(text);
    
    // Save the input
    setConversationState(prev => ({
      ...prev,
      answers: { ...prev.answers, [inputConfig.saveAs]: text },
      waitingForInput: false,
      inputConfig: null
    }));

    if (inputConfig.nextAction === 'sendEmail') {
      // Send email with quote
      addBotMessage("✅ ¡Cotización enviada a tu correo! Revisa tu bandeja de entrada. ¿Necesitas algo más?", [
        { id: 'restart', text: "🔄 Nueva Cotización", action: "restart" }
      ]);
    } else if (inputConfig.nextAction) {
      processNextAction(inputConfig.nextAction, { value: text });
    }
  }, [addUserMessage, addBotMessage, processNextAction]);

  const downloadQuote = useCallback(() => {
    const answers = conversationState.answers;
    const quote = conversationState.quote || calculateQuote();
    
    const quoteText = `
╔══════════════════════════════════════════════════════════════╗
║                    COTIZACIÓN CODETREE                       ║
╠══════════════════════════════════════════════════════════════╣
║  Cliente: ${answers.name || 'Cliente'}                       
║  Fecha: ${new Date().toLocaleDateString()}                   
╠══════════════════════════════════════════════════════════════╣
║  PLAN SELECCIONADO:                                          ║
║  • ${quote.planName} (${quote.planType})                   
║  • Precio: $${quote.totalPrice} ${quote.period ? `/${quote.period}` : ''}
╠══════════════════════════════════════════════════════════════╣
║  CARACTERÍSTICAS INCLUIDAS:                                  ║
${quote.features.map(f => `║  ✓ ${f.padEnd(55)}║`).join('\n')}
╠══════════════════════════════════════════════════════════════╣
║  TODOS LOS MÓDULOS INCLUYEN:                                 ║
║  ✓ Gestión de inventario                                     ║
║  ✓ Control de producción                                     ║
║  ✓ Reportes y analytics                                      ║
║  ✓ API de integración                                        ║
║  ✓ Soporte técnico                                           ║
║  ✓ Actualizaciones automáticas                               ║
╠══════════════════════════════════════════════════════════════╣
║  Contacto: ${answers.email || answers.phone || 'No especificado'}         
╚══════════════════════════════════════════════════════════════╝
    `;
    
    const blob = new Blob([quoteText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cotizacion_${answers.name?.replace(/\s/g, '_') || 'codetree'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [conversationState.answers, conversationState.quote, calculateQuote]);

  const resetChat = useCallback(() => {
    setMessages([]);
    setChatStarted(false);
    startChatTriggered.current = false;
    setConversationState({
      currentAction: 'welcome',
      answers: {
        name: '',
        businessType: '',
        employeeCount: '',
        cowCount: '',
        budget: '',
        urgency: '',
        urgencyMultiplier: 1,
        contactMethod: '',
        email: '',
        phone: ''
      },
      quote: null,
      waitingForInput: false,
      inputConfig: null
    });
    setTimeout(() => {
      startChatTriggered.current = true;
      startChat();
    }, 100);
  }, [startChat]);

  const renderMessageText = (text, isHtml) => {
    if (isHtml) {
      return <div className={styles.htmlMessage} dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br/>') }} />;
    }
    return <div className={styles.plainMessage}>{text}</div>;
  };

  return (
    <section ref={sectionRef} className={styles.chatPricing}>
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.animateIn : ''}`}>
          <span className={styles.badge}>Cotización Inteligente</span>
          <h2 className={styles.title}>
            Obtén tu cotización 
            <span className={styles.gradientText}> en minutos</span>
          </h2>
          <p className={styles.subtitle}>
            Conversa con Sofía, nuestra asistente inteligente, y recibe una cotización personalizada al instante
          </p>
        </div>

        <div className={`${styles.chatContainer} ${isVisible ? styles.animateIn : ''}`}>
          <div className={styles.chatHeader}>
            <div className={styles.chatHeaderInfo}>
              <div className={styles.botAvatar}>
                <img 
                  src="/assets/images/assistant-avatar.jpg" 
                  alt="Sofía" 
                  className={styles.avatarImage} 
                  onError={(e) => {
                    e.target.src = 'https://randomuser.me/api/portraits/women/68.jpg';
                  }}
                />
              </div>
              <div>
                <h3>Sofía - Asistente de Cotización</h3>
                <p>🟢 Online • Responde en segundos</p>
              </div>
            </div>
            <button className={styles.resetBtn} onClick={resetChat}>
              <FaRedo /> Nueva Conversación
            </button>
          </div>

          <div className={styles.chatMessages} ref={chatMessagesRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`${styles.message} ${styles[msg.type]}`}>
                <div className={styles.messageAvatar}>
                  {msg.type === 'bot' ? (
                    <img 
                      src="/assets/images/assistant-avatar.jpg" 
                      alt="Sofía" 
                      className={styles.avatarImageSmall} 
                      onError={(e) => {
                        e.target.src = 'https://randomuser.me/api/portraits/women/68.jpg';
                      }}
                    />
                  ) : (
                    <FaUserCircle />
                  )}
                </div>
                <div className={styles.messageContent}>
                  <div className={styles.messageText}>
                    {renderMessageText(msg.text, msg.isHtml)}
                  </div>
                  {msg.options && (
                    <div className={styles.optionsContainer}>
                      {msg.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          className={styles.optionBtn}
                          onClick={() => handleOptionClick(opt)}
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className={`${styles.message} ${styles.bot}`}>
                <div className={styles.messageAvatar}>
                  <img 
                    src="/assets/images/assistant-avatar.jpg" 
                    alt="Sofía" 
                    className={styles.avatarImageSmall} 
                    onError={(e) => {
                      e.target.src = 'https://randomuser.me/api/portraits/women/68.jpg';
                    }}
                  />
                </div>
                <div className={styles.typingIndicator}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {conversationState.waitingForInput && conversationState.inputConfig && (
            <div className={styles.chatInput}>
              <input
                ref={inputRef}
                type={conversationState.inputConfig.inputType || 'text'}
                placeholder={conversationState.inputConfig.placeholder}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    handleTextSubmit(e.target.value.trim(), conversationState.inputConfig);
                    e.target.value = '';
                  }
                }}
                autoFocus
              />
              <button onClick={() => {
                if (inputRef.current && inputRef.current.value.trim()) {
                  handleTextSubmit(inputRef.current.value.trim(), conversationState.inputConfig);
                  inputRef.current.value = '';
                }
              }}>
                <FaPaperPlane />
              </button>
            </div>
          )}
        </div>

        <div className={`${styles.trustBadges} ${isVisible ? styles.animateIn : ''}`}>
          <div className={styles.badge}>
            <FaStar />
            <span>+500 clientes satisfechos</span>
          </div>
          <div className={styles.badge}>
            <FaShieldAlt />
            <span>Respuesta instantánea</span>
          </div>
          <div className={styles.badge}>
            <FaRocket />
            <span>Cotización en minutos</span>
          </div>
          <div className={styles.badge}>
            <FaCheckCircle />
            <span>Sin compromiso</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatPricing;