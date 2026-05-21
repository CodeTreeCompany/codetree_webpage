import React, { useState, useEffect } from 'react';
import Button from '../button/Button';
import Modal from '../ui/Modal';
import ContactForm from '../../sections/contact/ContactForm';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const navItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Acerca de nosotros', href: '#about' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Proyectos', href: '/proyectos' },
    { label: '¿Por qué elegirnos?', href: '#why-us' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <nav className={styles.navbar}>
          <div className={styles.logo}>
            <a href="/" className={styles.logoLink}>
              <img 
                src="/assets/logo.svg" 
                alt="CodeTree Logo" 
                className={styles.logoImage}
              />
              <span className={styles.logoText}>
                Code<span className={styles.logoHighlight}>Tree</span>
              </span>
            </a>
          </div>

          <ul className={styles.navLinks}>
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href} className={styles.navLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.contactBtn}>
            <Button variant="primary" size="md" onClick={openContactModal}>
              Contáctanos
            </Button>
          </div>

          <button
            className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>

        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
          <ul className={styles.mobileNavLinks}>
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className={styles.mobileNavLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className={styles.mobileBtnWrapper}>
              <Button variant="primary" size="lg" fullWidth onClick={openContactModal}>
                Contáctanos
              </Button>
            </li>
          </ul>
        </div>
      </header>

      <Modal isOpen={isContactModalOpen} onClose={closeContactModal} title="Contáctanos">
        <ContactForm isModal={true} onSuccess={closeContactModal} />
      </Modal>
    </>
  );
};

export default Header;