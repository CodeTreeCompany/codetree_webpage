import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/layout';
import Projects from './pages/projects';
import './styles/globals.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/proyectos" element={<Layout><Projects /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;