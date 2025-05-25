import React, { useState } from "react";

export default function Biglietti() {
  // Stato per biglietti
  const [tipoBiglietto, setTipoBiglietto] = useState("giorno 1");
  const [quantitàBiglietto, setQuantitàBiglietto] = useState(1);
  const prezzoPerBiglietto = 20;

  // Stato per accrediti
  const [tipoAccredito, setTipoAccredito] = useState("Accredito 2 giornate");
  const [quantitàAccredito, setQuantitàAccredito] = useState(1);
  const prezziAccrediti = {
    "Accredito 2 giornate": 50,
    "Accredito 5 proiezioni": 70,
    "Accredito 4 giornate": 90,
    "Accredito 10 proiezioni": 120,
  };

  // Carrello unico per biglietti e accrediti
  const [carrello, setCarrello] = useState([]);

  // Funzione per aggiungere biglietto
  const aggiungiBigliettoAlCarrello = () => {
    const esistente = carrello.find(item => item.tipo === tipoBiglietto);
    if (esistente) {
      setCarrello(carrello.map(item =>
        item.tipo === tipoBiglietto
          ? { ...item, quantità: item.quantità + quantitàBiglietto }
          : item
      ));
    } else {
      setCarrello([...carrello, { tipo: tipoBiglietto, quantità: quantitàBiglietto, prezzo: prezzoPerBiglietto }]);
    }
  };

  // Funzione per aggiungere accredito
  const aggiungiAccreditoAlCarrello = () => {
    const prezzo = prezziAccrediti[tipoAccredito];
    const esistente = carrello.find(item => item.tipo === tipoAccredito);
    if (esistente) {
      setCarrello(carrello.map(item =>
        item.tipo === tipoAccredito
          ? { ...item, quantità: item.quantità + quantitàAccredito }
          : item
      ));
    } else {
      setCarrello([...carrello, { tipo: tipoAccredito, quantità: quantitàAccredito, prezzo }]);
    }
  };

  // Rimuove item dal carrello
  const rimuoviDalCarrello = (tipoDaRimuovere) => {
    setCarrello(carrello.filter(item => item.tipo !== tipoDaRimuovere));
  };

  // Calcola totale carrello
  const totale = carrello.reduce((acc, item) => acc + item.quantità * item.prezzo, 0);

  // Funzione per inviare il carrello al backend uno per uno
  const procediAcquisto = async () => {
    if (carrello.length === 0) {
      alert("Il carrello è vuoto");
      return;
    }

    try {
      for (const item of carrello) {
        const response = await fetch("http://localhost:5000/api/tickets/acquista", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tipo: item.tipo,
            quantità: item.quantità,
            prezzo: item.prezzo,
          }),
        });

        if (!response.ok) {
          throw new Error("Errore nell'acquisto");
        }
      }
      alert("Acquisto completato con successo!");
      setCarrello([]);  // svuota carrello dopo successo
    } catch (error) {
      console.error(error);
      alert("Si è verificato un errore durante l'acquisto.");
    }
  };

  return (
    <div>
      <h3>Scegli il biglietto</h3>
      <div>
        <button onClick={() => setTipoBiglietto("giorno 1")}>Giorno 1</button>
        <button onClick={() => setTipoBiglietto("giorno 2")}>Giorno 2</button>
        <button onClick={() => setTipoBiglietto("giorno 3")}>Giorno 3</button>
        <button onClick={() => setTipoBiglietto("giorno 4")}>Giorno 4</button>
      </div>

      <div>
        <label>Quantità biglietti:</label>
        <input
          type="number"
          min="1"
          value={quantitàBiglietto}
          onChange={(e) => setQuantitàBiglietto(Number(e.target.value))}
        />
      </div>

      <button onClick={aggiungiBigliettoAlCarrello}>Aggiungi biglietto al carrello</button>

      <hr />

      <h3>Scegli l'accredito</h3>
      <div>
        <button onClick={() => setTipoAccredito("Accredito 2 giornate")}>Accredito 2 giornate</button>
        <button onClick={() => setTipoAccredito("Accredito 5 proiezioni")}>Accredito 5 proiezioni</button>
        <button onClick={() => setTipoAccredito("Accredito 4 giornate")}>Accredito 4 giornate</button>
        <button onClick={() => setTipoAccredito("Accredito 10 proiezioni")}>Accredito 10 proiezioni</button>
      </div>

      <div>
        <label>Quantità accrediti:</label>
        <input
          type="number"
          min="1"
          value={quantitàAccredito}
          onChange={(e) => setQuantitàAccredito(Number(e.target.value))}
        />
      </div>

      <button onClick={aggiungiAccreditoAlCarrello}>Aggiungi accredito al carrello</button>

      <hr />

      <h4>Carrello</h4>
      {carrello.length === 0 ? (
        <p>Il carrello è vuoto</p>
      ) : (
        <ul>
          {carrello.map((item) => (
            <li key={item.tipo}>
              {item.tipo} — {item.quantità} × €{item.prezzo} = €{item.quantità * item.prezzo}{" "}
              <button onClick={() => rimuoviDalCarrello(item.tipo)}>Rimuovi</button>
            </li>
          ))}
        </ul>
      )}
      <h4>Totale: €{totale}</h4>

      <button onClick={procediAcquisto}>Procedi all'acquisto</button>
    </div>
  );
}
