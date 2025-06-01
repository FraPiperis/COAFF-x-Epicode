import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Tickets from './pages/Tickets';

// Se avevi altre importazioni qui, mantienile.

const App = () => {
  return (
    <Router>
      {/* Navbar semplice */}
      <nav style={{ padding: '10px', background: '#eee' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
        <Link to="/tickets">Tickets</Link>
      </nav>

      {/* Qui gestiamo il routing delle pagine */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tickets" element={<Tickets />} />
        {/* Se hai altre rotte, aggiungile qui */}
      </Routes>
    </Router>
  );
};

export default App;
