const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  tipo: {
    type: String,
    enum: ["giorno 1", "giorno 2", "giorno 3", "giorno 4"],
    required: true,
  },
  quantità: {
    type: Number,
    required: true,
    min: 1,
  },
  prezzo: {
    type: Number,
    required: true,
  },
  dataAcquisto: {
    type: Date,
    default: Date.now,
  },
  // opzionale: dati dell'utente, stato pagamento, ecc.
});

module.exports = mongoose.model("Ticket", ticketSchema);

