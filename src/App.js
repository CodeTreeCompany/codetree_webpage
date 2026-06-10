import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Projects from './pages/projects/index.jsx';
import Careers from './pages/careers/index.jsx';
import ServicesPage from './pages/services/index.jsx';
import Support from './pages/support/Support.jsx';
import './styles/globals.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/servicios" element={<Layout><ServicesPage /></Layout>} />
        <Route path="/support" element={<Layout><Support /></Layout>} />
        <Route path="/proyectos" element={<Layout><Projects /></Layout>} />
        <Route path="/carreras" element={<Layout><Careers /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;