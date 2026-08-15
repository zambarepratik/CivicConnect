const express = require('express');
const cors = require('cors');
require('dotenv').config();
const supabase = require('./config/supabase'); // Top par import kiya

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("CivicConnect Server Ready!");
});

app.get('/api/test-db', async (req, res) => {
  try {
    const { data, error } = await supabase.from('issues').select('*').limit(1);
    if (error && error.code !== 'PGRST116') {
      console.error('DB Notice:', error.message);
    }
    res.json({ message: "Database connection successful!" });
  } catch (err) {
    res.status(500).json({ message: "Database connection failed!", error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));