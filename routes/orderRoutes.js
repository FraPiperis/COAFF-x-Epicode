const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

// Endpoint per creare Payment Intent Stripe
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Importo non valido" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      // puoi aggiungere metadata se vuoi
      // metadata: { integration_check: 'accept_a_payment' },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Errore creazione PaymentIntent:", error);
    res.status(500).json({ message: "Errore server durante la creazione del pagamento" });
  }
});

// Endpoint per salvare un ordine dopo pagamento avvenuto
router.post('/', async (req, res) => {
  try {
    const { tickets, accreditations, total, paymentIntentId } = req.body;

    if (!tickets && !accreditations) {
      return res.status(400).json({ message: "Nessun elemento da acquistare" });
    }
    if (!total || total <= 0) {
      return res.status(400).json({ message: "Totale non valido" });
    }
    if (!paymentIntentId) {
      return res.status(400).json({ message: "paymentIntentId mancante" });
    }

    const order = new Order({
      tickets: tickets || [],
      accreditations: accreditations || [],
      total,
      paymentIntentId,
      paymentStatus: "paid", // supponiamo che il pagamento sia andato a buon fine
      createdAt: new Date(),
    });

    await order.save();

    res.status(201).json({ message: "Ordine salvato con successo", order });
  } catch (error) {
    console.error("Errore salvataggio ordine:", error);
    res.status(500).json({ message: "Errore server durante il salvataggio ordine" });
  }
});

module.exports = router;
