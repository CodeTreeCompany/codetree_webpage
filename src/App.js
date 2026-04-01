import React from 'react';
import VoiceWelcome from './components/voice_welcome';
import Layout from './components/layout/layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

const App = () => {
  return (
    <div className="app">
      {/* Voice welcome - plays automatically in background */}
      <VoiceWelcome />
      
      {/* Main layout with Bootstrap */}
      <Layout />
    </div>
  );
};

export default App;