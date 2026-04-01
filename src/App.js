import React from 'react';
import VoiceWelcome from './components/voice_welcome';
import MainContent from './components/main_content';
import './styles/App.css';

const App = () => {
  return (
    <div className="app">
      {/* Voice welcome - plays automatically in background */}
      <VoiceWelcome />
      
      {/* Main content - shows immediately */}
      <MainContent />
    </div>
  );
};

export default App;