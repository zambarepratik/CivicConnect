const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json()); // JSON data parse karne ke liye

// Auth routes connect kar diye
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send("CivicConnect Server Ready!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));