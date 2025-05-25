const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

router.get('/', async (req, res) => {
  const tickets = await Ticket.find();
  res.json(tickets);
});

module.exports = router;
