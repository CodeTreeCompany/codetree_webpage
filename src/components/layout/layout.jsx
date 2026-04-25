import React from 'react';
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';
import Hero from '../sections/hero/Hero';
import AboutUs from '../sections/about_us/AboutUs';
import Services from '../sections/services/Services';
import HowWeWork from '../sections/how_we_work/HowWeWork';
import Pricing from '../sections/pricing/Pricing';
import styles from './Layout.module.css';
import ChatPricing from '../sections/pricing/ChatPricing';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        {children || (
          <>
            <section id="home">
              <Hero />
            </section>
            <section id="about">
              <AboutUs />
            </section>
            <section id="services">
              <Services />
            </section>
            <section id="process">
              <HowWeWork />
            </section>
            <section id="cotization">
              <Pricing />
              <ChatPricing />
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;