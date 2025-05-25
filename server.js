const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
require('dotenv').config();
const mongoose = require('mongoose');


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ Connesso a MongoDB"))
  .catch((err) => console.error("❌ Errore di connessione:", err));

const ticketRoutes = require("./routes/ticketRoutes.js");
app.use("/api/tickets", ticketRoutes);

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/tickets', require('./routes/ticketRoutes'));
app.use('/api/accreditations', require('./routes/accreditationRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server avviato su porta ${PORT}`));

app.use(express.json()); // per poter leggere req.body in JSON

const ticketRoutes = require("./routes/ticketRoutes");
app.use("/api/tickets", ticketRoutes);

// ... altre configurazioni e app.listen