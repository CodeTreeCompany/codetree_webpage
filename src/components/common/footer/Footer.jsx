// src/components/layout/Footer/Footer.jsx - Updated with all modals
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
import Modal from '../ui/Modal';
import TermsAndConditions from '../ui/TermsAndConditions';
import PrivacyPolicy from '../ui/PrivacyPolicy';
import CookiesPolicy from '../ui/CookiesPolicy';
import styles from './Footer.module.css';

const Footer = () => {
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isCookiesModalOpen, setIsCookiesModalOpen] = useState(false);

  const socialIcons = [
    { icon: FaLinkedinIn, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaTwitter, url: 'https://twitter.com', label: 'Twitter' },
    { icon: FaFacebookF, url: 'https://facebook.com', label: 'Facebook' },
    { icon: FaInstagram, url: 'https://instagram.com', label: 'Instagram' },
    { icon: FaGithub, url: 'https://github.com', label: 'GitHub' },
    { icon: FaYoutube, url: 'https://youtube.com', label: 'YouTube' },
    { icon: FaDiscord, url: 'https://discord.com', label: 'Discord' },
    { icon: FaTelegram, url: 'https://telegram.org', label: 'Telegram' },
    { icon: FaTiktok, url: 'https://tiktok.com', label: 'TikTok' },
    { icon: FaPinterest, url: 'https://pinterest.com', label: 'Pinterest' },
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
                            className={styles.emailInput}
                          />
                        </li>
                      );
                    }
                    if (item.isButton) {
                      return (
                        <li key={itemIndex}>
                          <button className={styles.registerBtn}>
                            {item.text}
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