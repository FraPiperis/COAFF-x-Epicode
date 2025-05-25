const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  day: String,
  date: Date,
  price: Number,
});

module.exports = mongoose.model('Ticket', TicketSchema);
