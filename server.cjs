const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
  origin: "*",
}));

mongoose.connect('mongodb://localhost:27017/assessment', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});

// Define the schema based on your JSON data structure
const dataSchema = new mongoose.Schema({
  end_year: String,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: String,
  impact: String,
  added: String,
  published: String,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number
}, { collection: 'datas' }); // Use the 'datas' collection

const Data = mongoose.model('Data', dataSchema);

app.get('/data', async (req, res) => {
  try {
    const data = await Data.find();
    console.log("Fetched data from MongoDB:", data); // Log fetched data
    res.json(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
