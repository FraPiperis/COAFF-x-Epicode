import React from 'react';
import backgroundImage from '../telefono.jpg';
import logoCOAFF from '../CAPSTONE-removebg-preview.png'; 

const ChiSiamo = () => {
  return (
    <div className="w-full h-full overflow-auto">
      {/* Hero Section */}
      <div
        className="w-full h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <h1 className="text-white text-6xl md:text-8xl font-bold">CHI SIAMO</h1>
      </div>

      {/* Descrizione */}
      <div className="bg-[#f4e7e5] py-16 px-8 md:px-32 text-[#4a2c2a]">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <img
            src={logoCOAFF}
            alt="COAFF logo"
            className="w-40 h-40 object-contain"
          />

          <div className="text-base md:text-lg leading-relaxed max-w-2xl">
            <p>
              Il <strong>Coming of Age Film Festival</strong> è un festival cinematografico dedicato ai film coming of age,
              opere che esplorano il delicato passaggio dall’adolescenza all’età adulta.
            </p>
            <br />
            <p>
              L’evento nasce con l’obiettivo di <strong>stimolare una riflessione</strong> sul tema della <strong>crescita</strong> e del <strong>cambiamento</strong>,
              raccontato attraverso prospettive, culture e contesti diversi.
            </p>
            <br />
            <p>
              Di <strong>respiro internazionale</strong>, il festival propone una <strong>selezione di film</strong> provenienti da tutto il mondo,
              offrendo al pubblico uno sguardo ampio e sfaccettato su questo <strong>genere tanto intimo quanto universale</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChiSiamo;

