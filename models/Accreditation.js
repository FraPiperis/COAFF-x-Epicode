const mongoose = require('mongoose');

const AccreditationSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

module.exports = mongoose.model('Accreditation', AccreditationSchema);
