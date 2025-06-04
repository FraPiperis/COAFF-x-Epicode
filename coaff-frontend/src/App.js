// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import ChiSiamo from './pages/ChiSiamo';
import Eventi from './pages/Eventi';
import Festival from './pages/Festival';
import Biglietti from './pages/Tickets';
import Contatti from './pages/Contatti';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ChiSiamo" element={<ChiSiamo />} />
        <Route path="/Eventi" element={<Eventi />} />
        <Route path="/Festival" element={<Festival />} />
        <Route path="/Tickets" element={<Biglietti />} />
        <Route path="/Contatti" element={<Contatti />} />
      </Routes>
    </Router>
  );
};

export default App;
