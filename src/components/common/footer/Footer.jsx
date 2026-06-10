// src/components/layout/Footer/Footer.jsx
import React, { useState } from 'react';
import { 
  FaLinkedinIn, 
  FaTwitter, 
  FaFacebookF, 
  FaInstagram, 
  FaGithub, 
  FaYoutube, 
  FaDiscord, 
  FaTelegram, 
  FaTiktok,
  FaPinterest
} from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import Modal from '../ui/Modal';
import TermsAndConditions from '../ui/TermsAndConditions';
import PrivacyPolicy from '../ui/PrivacyPolicy';
import CookiesPolicy from '../ui/CookiesPolicy';
import styles from './Footer.module.css';

const Footer = () => {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isCookiesModalOpen, setIsCookiesModalOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  // EmailJS configuration
  const EMAILJS_SERVICE_ID = 'service_irvthxe';
  const EMAILJS_TEMPLATE_ID = 'template_n85innp';
  const EMAILJS_PUBLIC_KEY = 'hY2LpwoPAxGjcXKrS';

  const socialIcons = [
    { icon: FaLinkedinIn, url: 'https://www.linkedin.com/in/elmer-urbina-meneses-290a3b208/', label: 'LinkedIn' },
    { icon: FaFacebookF, url: 'https://www.facebook.com/share/1DzCvDjzUj/', label: 'Facebook' },
    { icon: FaInstagram, url: 'https://www.instagram.com/ct_hatomaster2026/', label: 'Instagram' },
    { icon: FaGithub, url: 'https://github.com/Foxomax', label: 'GitHub' }
  ];

  const footerSections = [
    {
      title: 'Contacto',
      items: [
        { text: '+505 5789 3565', href: 'tel:+50557893565', icon: '📞' },
        { text: 'codetreecompany@gmail.com', href: 'mailto:codetreecompany@gmail.com', icon: '✉️' },
        { text: 'Jugalpa-Chontales', href: '#', icon: '📍' },
      ]
    },
    {
      title: 'Boletín VIP',
      items: [
        { text: 'Correo Electrónico', href: '#', isEmailInput: true, label: 'Correo Electrónico' },
        { text: 'Regístrate', href: '#', isButton: true },
      ]
    },
    {
      title: 'Enlaces Rápidos',
      items: [
        { text: 'FAQ', href: '/faq' },
        { text: 'Soporte', href: '/support' },
        { text: 'Carreras', href: '/carreras' },
      ]
    },
    {
      title: 'Legal',
      items: [
        { text: 'Políticas de Privacidad', href: '/privacy', isModal: true, modalType: 'privacy' },
        { text: 'Términos y Condiciones', href: '/terms', isModal: true, modalType: 'terms' },
        { text: 'Cookies', href: '/cookies', isModal: true, modalType: 'cookies' },
      ]
    }
  ];

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleNewsletterSubmit = async () => {
    if (!newsletterEmail.trim()) {
      toast.error('Por favor, ingresa tu correo electrónico');
      return;
    }
    
    if (!validateEmail(newsletterEmail)) {
      toast.error('Por favor, ingresa un correo electrónico válido');
      return;
    }

    setIsSubscribing(true);

    try {
      const templateParams = {
        user_email: newsletterEmail,
        subscription_date: new Date().toLocaleString('es-ES', {
          dateStyle: 'full',
          timeStyle: 'medium'
        }),
        source: 'Footer VIP Newsletter'
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      
      toast.success('¡Suscripción exitosa! Gracias por unirte al boletín VIP.');
      setNewsletterEmail('');
      
    } catch (error) {
      console.error('Error sending subscription:', error);
      toast.error('Error al suscribirte. Por favor, intenta de nuevo.');
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleModalOpen = (modalType) => {
    if (modalType === 'terms') {
      setIsTermsModalOpen(true);
    } else if (modalType === 'privacy') {
      setIsPrivacyModalOpen(true);
    } else if (modalType === 'cookies') {
      setIsCookiesModalOpen(true);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.socialSection}>
            <div className={styles.socialIcons}>
              {socialIcons.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialIcon}
                    aria-label={social.label}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          <div className={styles.footerGrid}>
            {footerSections.map((section, index) => (
              <div key={index} className={styles.footerSection}>
                <h3 className={styles.sectionTitle}>{section.title}</h3>
                <ul className={styles.sectionItems}>
                  {section.items.map((item, itemIndex) => {
                    if (item.isEmailInput) {
                      return (
                        <li key={itemIndex} className={styles.emailInputWrapper}>
                          {item.label && <label className={styles.emailLabel}>{item.label}</label>}
                          <input
                            type="email"
                            placeholder={item.text}
                            value={newsletterEmail}
                            onChange={(e) => setNewsletterEmail(e.target.value)}
                            className={styles.emailInput}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleNewsletterSubmit();
                              }
                            }}
                          />
                        </li>
                      );
                    }
                    if (item.isButton) {
                      return (
                        <li key={itemIndex}>
                          <button 
                            className={styles.registerBtn}
                            onClick={handleNewsletterSubmit}
                            disabled={isSubscribing}
                          >
                            {isSubscribing ? 'Enviando...' : item.text}
                          </button>
                        </li>
                      );
                    }
                    return (
                      <li key={itemIndex}>
                        <a
                          href={item.href}
                          className={styles.footerLink}
                          onClick={(e) => {
                            if (item.isModal) {
                              e.preventDefault();
                              handleModalOpen(item.modalType);
                            }
                          }}
                        >
                          {item.icon && <span className={styles.linkIcon}>{item.icon}</span>}
                          {item.text}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className={styles.copyright}>
            <p>&copy; {new Date().getFullYear()} CodeTree. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Terms and Conditions Modal */}
      <Modal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        title="Términos y Condiciones"
        size="lg"
      >
        <TermsAndConditions />
      </Modal>

      {/* Privacy Policy Modal */}
      <Modal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        title="Políticas de Privacidad"
        size="lg"
      >
        <PrivacyPolicy />
      </Modal>

      {/* Cookies Policy Modal */}
      <Modal
        isOpen={isCookiesModalOpen}
        onClose={() => setIsCookiesModalOpen(false)}
        title="Política de Cookies"
        size="lg"
      >
        <CookiesPolicy />
      </Modal>
    </>
  );
};

export default Footer;