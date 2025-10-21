// backend/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI is not defined in .env');
  process.exit(1);
}

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Volunteer Schema
const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
}, { timestamps: true });

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

// Routes
app.get('/', (req, res) => {
  res.json({ message: '🌍 Zero Hunger API is running' });
});

app.post('/api/volunteers', async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const existingVolunteer = await Volunteer.findOne({ email });
    if (existingVolunteer) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const newVolunteer = new Volunteer({ name, email });
    await newVolunteer.save();
    
    console.log('📝 New volunteer added:', name, email);
    res.status(201).json({ 
      message: `Welcome ${name}! Thank you for volunteering!`,
      volunteer: newVolunteer
    });
  } catch (err) {
    console.error('❌ Error saving volunteer:', err);
    res.status(500).json({ message: 'Error saving volunteer' });
  }
});

app.get('/api/volunteers', async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.json({ count: volunteers.length, volunteers });
  } catch (err) {
    console.error('❌ Error fetching volunteers:', err);
    res.status(500).json({ message: 'Error fetching volunteers' });
  }
});

// Connect to MongoDB and start server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });