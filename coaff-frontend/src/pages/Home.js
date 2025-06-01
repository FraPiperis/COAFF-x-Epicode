// src/pages/Home.js
import React from 'react';
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="overlay">
        <nav className="navbar">
          <ul className="nav-list">
            <li><Link to="/chi-siamo">CHI SIAMO</Link></li>
            <li><Link to="/eventi">EVENTI</Link></li>
            <li><Link to="/festival">FESTIVAL</Link></li>
            <li><Link to="/Tickets">BIGLIETTI</Link></li> {/* ← QUI */}
            <li><Link to="/contatti">CONTATTI</Link></li>
          </ul>
        </nav>
        <div className="hero-text">
          <h1>COAFF</h1>
          <h2>COMING OF AGE FILM FESTIVAL</h2>
          {/* Qui aggiungo il messaggio di benvenuto*/}
          <p>Benvenuto al Coming Of Age Film Festival 🎬</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
