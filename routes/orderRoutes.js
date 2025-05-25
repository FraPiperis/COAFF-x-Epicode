const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "eur",
  });

  res.send({ clientSecret: paymentIntent.client_secret });
});

router.post('/', async (req, res) => {
  const { tickets, accreditations, quantity, total, paymentIntentId } = req.body;

  const order = new Order({
    tickets,
    accreditations,
    quantity,
    total,
    paymentIntentId,
    paymentStatus: "paid",
  });

  await order.save();
  res.status(201).json(order);
});

module.exports = router;
