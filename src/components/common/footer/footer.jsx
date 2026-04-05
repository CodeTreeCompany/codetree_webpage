
import React from 'react';
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
import styles from './Footer.module.css';

const Footer = () => {
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
        { text: 'Correo Electrónico', href: '#', isEmailInput: true },
        { text: '@seplocorriero.com', href: '#', isDomain: true },
        { text: 'Regístrate', href: '#', isButton: true },
      ]
    },
    {
      title: 'Enlaces Rápidos',
      items: [
        { text: 'FAQ', href: '/faq' },
        { text: 'Soporte', href: '/support' },
        { text: 'Carreras', href: '/careers' },
        { text: 'Cookies', href: '/cookies' },
      ]
    },
    {
      title: 'Legal',
      items: [
        { text: 'Políticas de Privacidad', href: '/privacy' },
        { text: 'Términos y Condiciones', href: '/terms' },
      ]
    }
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Social Media Icons - First Line */}
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

        {/* Footer Content Grid */}
        <div className={styles.footerGrid}>
          {footerSections.map((section, index) => (
            <div key={index} className={styles.footerSection}>
              <h3 className={styles.sectionTitle}>{section.title}</h3>
              <ul className={styles.sectionItems}>
                {section.items.map((item, itemIndex) => {
                  if (item.isEmailInput) {
                    return (
                      <li key={itemIndex} className={styles.emailInputWrapper}>
                        <input
                          type="email"
                          placeholder={item.text}
                          className={styles.emailInput}
                        />
                      </li>
                    );
                  }
                  if (item.isDomain) {
                    return (
                      <li key={itemIndex} className={styles.domainText}>
                        <span>{item.text}</span>
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
                      <a href={item.href} className={styles.footerLink}>
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

        {/* Copyright */}
        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} CodeTree. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;