const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");

router.post("/acquista", async (req, res) => {
  try {
    const { tipo, quantità, prezzo } = req.body;

    if (!tipo || !quantità || !prezzo) {
      return res.status(400).json({ message: "Dati mancanti" });
    }

    // Creiamo il documento nel DB
    const ticket = new Ticket({ tipo, quantità, prezzo });
    await ticket.save();

    res.status(201).json({ message: "Biglietto acquistato con successo", ticket });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Errore server" });
  }
});

module.exports = router;

