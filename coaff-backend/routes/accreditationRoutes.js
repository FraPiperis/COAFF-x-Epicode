const express = require('express');
const router = express.Router();
const Accreditation = require('../models/Accreditation');

router.get('/', async (req, res) => {
  const accreditations = await Accreditation.find();
  res.json(accreditations);
});

module.exports = router;
