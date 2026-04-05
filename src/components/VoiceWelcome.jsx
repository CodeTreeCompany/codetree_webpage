import React, { useEffect, useRef, useState } from 'react';
import '../styles/components/voice_welcome.css';

const VoiceWelcome = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const speechSynthesisRef = useRef(null);
  const hasSpokenRef = useRef(false);
  const interactionTimerRef = useRef(null);
  const isSpeakingRef = useRef(false);

  // Function to detect if it's first visit or reload
  const checkVisitStatus = () => {
    try {
      const hasVisited = sessionStorage.getItem('codetree_visited');
      
      if (hasVisited) {
        setIsFirstVisit(false);
        return false;
      } else {
        sessionStorage.setItem('codetree_visited', 'true');
        setIsFirstVisit(true);
        return true;
      }
    } catch (error) {
      console.error('Error accessing sessionStorage:', error);
      setIsFirstVisit(true);
      return true;
    }
  };

  // Get the appropriate welcome message - using phonetic spelling for CodeTree in English
  const getWelcomeMessage = () => {
    const isFirstTime = checkVisitStatus();
    
    // Using phonetic spelling "Coud Tri" to force English pronunciation
    // This way we only need ONE utterance for the entire message
    if (!isFirstTime) {
      // Welcome back message for reload/revisit
      return `¡Bienvenido de nuevo a Coud Tri! Nos alegra verte otra vez. Coud Tri continúa siendo tu aliado en desarrollo de software, especializados en SaaS, aplicaciones móviles y de escritorio, inteligencia artificial, automatización y análisis de datos. Explora nuestras soluciones y descubre cómo podemos ayudarte a crecer. ¡Gracias por regresar!`;
    } else {
      // First visit welcome message
      return `Bienvenido al sitio web oficial de Coud Tri. Coud Tri es una empresa de desarrollo de software especializada en SaaS, aplicaciones móviles y de escritorio, inteligencia artificial, automatización y análisis de datos. Conoce más sobre nosotros en nuestro sitio web. ¡Te esperamos!`;
    }
  };

  useEffect(() => {
    // Check if browser supports speech synthesis
    if (!window.speechSynthesis) {
      console.warn('Este navegador no soporta síntesis de voz');
      return;
    }

    speechSynthesisRef.current = window.speechSynthesis;
    
    // Load available voices
    const loadVoices = () => {
      const voices = speechSynthesisRef.current.getVoices();
      
      if (voices.length > 0) {
        // Find a good Spanish voice
        let selected = voices.find(voice => 
          voice.lang === 'es-ES' || 
          voice.lang === 'es-MX' || 
          voice.lang === 'es-US' ||
          voice.name.includes('Spanish') ||
          voice.name.includes('español') ||
          voice.name.includes('Sabina') ||
          voice.name.includes('Helena') ||
          voice.name.includes('Paulina')
        );
        
        // Fallback voice
        if (!selected) {
          selected = voices.find(voice => 
            voice.name.includes('Google UK English Female') ||
            voice.name.includes('Samantha') ||
            voice.name.includes('Female')
          );
        }
        
        // If still no voice, pick any voice
        if (!selected && voices.length > 0) {
          selected = voices[0];
        }
        
        setSelectedVoice(selected);
      }
    };

    // Chrome requires this event to load voices
    if (speechSynthesisRef.current.onvoiceschanged !== undefined) {
      speechSynthesisRef.current.onvoiceschanged = loadVoices;
    }
    
    loadVoices();
    
    // Try to autoplay after 1.5 seconds
    const autoplayTimer = setTimeout(() => {
      if (!hasSpokenRef.current) {
        attemptAutoplay();
      }
    }, 1500);
    
    // Set a timer to show play button if autoplay fails after 4 seconds
    const fallbackTimer = setTimeout(() => {
      if (!hasSpokenRef.current && !isSpeakingRef.current) {
        setShowPlayButton(true);
      }
    }, 4000);

    return () => {
      clearTimeout(autoplayTimer);
      clearTimeout(fallbackTimer);
      if (interactionTimerRef.current) {
        clearTimeout(interactionTimerRef.current);
      }
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel();
      }
    };
  }, []);

  const attemptAutoplay = () => {
    speakWelcomeMessage().catch((error) => {
      console.log('Autoplay blocked or failed:', error.message);
      setupUserInteractionDetection();
    });
  };

  const setupUserInteractionDetection = () => {
    const handleUserInteraction = () => {
      if (!hasSpokenRef.current && !isSpeakingRef.current) {
        console.log('User interaction detected, attempting to play...');
        speakWelcomeMessage().catch(err => {
          console.log('Still blocked:', err);
          setShowPlayButton(true);
        });
      }
      
      ['click', 'touchstart', 'keydown'].forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
    
    ['click', 'touchstart', 'keydown'].forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });
    
    interactionTimerRef.current = setTimeout(() => {
      if (!hasSpokenRef.current && !isSpeakingRef.current) {
        setShowPlayButton(true);
      }
    }, 5000);
  };

  const speakWelcomeMessage = () => {
    return new Promise((resolve, reject) => {
      if (!speechSynthesisRef.current) {
        reject(new Error('Speech synthesis not available'));
        return;
      }
      
      if (hasSpokenRef.current) {
        console.log('Already spoken, skipping...');
        resolve();
        return;
      }
      
      if (isSpeakingRef.current) {
        console.log('Already speaking, skipping...');
        resolve();
        return;
      }

      try {
        if (speechSynthesisRef.current.speaking) {
          speechSynthesisRef.current.cancel();
        }
        
        const message = getWelcomeMessage();
        
        // Create a SINGLE utterance for the entire message
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = 'es-ES';
        utterance.rate = 1.3;
        utterance.pitch = 1.05;
        utterance.volume = 1;
        
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
        
        utterance.onstart = () => {
          setIsSpeaking(true);
          isSpeakingRef.current = true;
          setShowPlayButton(false);
        };
        
        utterance.onend = () => {
          setIsSpeaking(false);
          isSpeakingRef.current = false;
          hasSpokenRef.current = true;
          resolve();
        };
        
        utterance.onerror = (event) => {
          console.error('Error en síntesis de voz:', event);
          setIsSpeaking(false);
          isSpeakingRef.current = false;
          
          if (event.error === 'not-allowed') {
            reject(new Error('User interaction required'));
          } else {
            reject(new Error('Speech synthesis failed'));
          }
        };
        
        speechSynthesisRef.current.speak(utterance);
        
      } catch (error) {
        console.error('Error in speakWelcomeMessage:', error);
        setIsSpeaking(false);
        isSpeakingRef.current = false;
        reject(error);
      }
    });
  };

  const handlePlayClick = () => {
    setShowPlayButton(false);
    speakWelcomeMessage().catch(err => {
      console.error('Failed to play voice:', err);
      setShowPlayButton(true);
    });
  };

  return (
    <div className="voice-background">
      
      {isSpeaking && (
        <div className="voice-mini-indicator" title="Asistente CodeTree activo">
          <div className="voice-pulse-ring">
            <div className="voice-dot"></div>
          </div>
          <span className="voice-tooltip">
            🔊 Asistente activo
            <span className="tooltip-sub">
              {!isFirstVisit ? '¡Bienvenido de nuevo!' : 'Bienvenida en curso'}
            </span>
          </span>
        </div>
      )}
    </div>
  );
};

export default VoiceWelcome;