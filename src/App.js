// src/App.jsx
import React from 'react';
import Layout from './components/layout/layout';
import VoiceWelcome from './components/VoiceWelcome';
import './styles/globals.css';
import './styles/index';

const App = () => {
  return (
    <div className="app">
      {/* Voice welcome - plays automatically when page loads */}
      <VoiceWelcome />
      
      {/* Main layout with Header, Content, and Footer */}
      <Layout />
    </div>
  );
};

export default App;