// src/components/layout/Layout.jsx
import React from 'react';
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';
import Hero from '../sections/hero/Hero';
import styles from './Layout.module.css';
import AboutUs from '../sections/about_us/AboutUs';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        {children || <Hero />}
         <section id="about">
              <AboutUs />
            </section>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;