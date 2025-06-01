import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tickets from "./pages/Tickets";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/biglietti" element={<Biglietti />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
