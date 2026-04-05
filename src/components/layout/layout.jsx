// src/components/layout/Layout.jsx
import React from 'react';
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        {children || (
          <div className={styles.hero}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                Bienvenido a{' '}
                <span className={styles.gradientText}>CodeTree</span>
              </h1>
              <p className={styles.heroSubtitle}>
                Innovación tecnológica para tu negocio
              </p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;