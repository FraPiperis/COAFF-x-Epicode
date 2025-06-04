const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Stripe = require('stripe');

const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/payments', paymentRoutes);

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // per leggere JSON in req.body

// Connessione a MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connesso a MongoDB"))
  .catch((err) => console.error("❌ Errore di connessione:", err));

// Import rotte
const ticketRoutes = require("./routes/ticketRoutes");
const accreditationRoutes = require("./routes/accreditationRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Usa rotte
app.use("/api/tickets", ticketRoutes);
app.use("/api/accreditations", accreditationRoutes);
app.use("/api/orders", orderRoutes);

// Inizializza Stripe con la chiave segreta dal .env
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Rotta per creare sessione di pagamento Stripe
app.post('/api/payment', async (req, res) => {
  const { carrello, email } = req.body;

  if (!carrello || !email) {
    return res.status(400).json({ message: "Carrello o email mancanti" });
  }

  try {
    // Mappiamo gli articoli nel formato richiesto da Stripe
    const line_items = carrello.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.tipo,
        },
        unit_amount: item.prezzo * 100, // Stripe lavora in centesimi
      },
      quantity: item.quantità,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      customer_email: email,
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Errore durante la creazione della sessione Stripe:", error);
    res.status(500).json({ message: "Errore nel pagamento" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server avviato su porta ${PORT}`));
