const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],
  accreditations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Accreditation' }],
  quantity: Number,
  total: Number,
  paymentStatus: String,
  paymentIntentId: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);
