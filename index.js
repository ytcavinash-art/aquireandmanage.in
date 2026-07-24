require('dotenv').config();
const dns = require('dns');

// Force IPv4 & Public DNS for SRV Resolution
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
  dns.setDefaultResultOrder('ipv4first');
} catch (e) {
  console.log('DNS Notice:', e.message);
}

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Item = require('./models/Item');
const ContactSubmission = require('./models/ContactSubmission');
const Feedback = require('./models/Feedback');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API running fine!');
});

app.get('/api/users', (req, res) => {
  res.json({ message: 'User list route working fine!' });
});

app.post('/api/contact', async (req, res) => {
  try {
    console.log('Received Form Data:', req.body);
    const submission = await ContactSubmission.create(req.body);
    res.status(201).json(submission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/feedback', async (req, res) => {
  try {
    const { fullName, emailAddress, rating, feedback } = req.body;
    const newFeedback = await Feedback.create({
      fullName,
      emailAddress,
      rating,
      feedback
    });

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully!',
      feedback: newFeedback
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.get('/api/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- API ENDPOINTS ---

// 1. GET ALL
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. POST (CREATE)
app.post('/api/items', async (req, res) => {
  try {
    const isContactSubmission = (
      req.body.fullName &&
      req.body.mobileNumber &&
      req.body.emailAddress &&
      req.body.message
    );

    if (isContactSubmission) {
      console.log('Received Form Data:', req.body);
      const submission = await ContactSubmission.create(req.body);
      return res.status(201).json(submission);
    }

    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 3. GET BY ID
app.get('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item nahi mila' });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. PUT (UPDATE) - Warning Fix Applied Here
app.put('/api/items/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after', runValidators: true }
    );
    if (!updatedItem) return res.status(404).json({ message: 'Item nahi mila' });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 5. DELETE
app.delete('/api/items/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Item nahi mila' });
    res.status(200).json({ message: 'Item delete ho gaya hai' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- SERVER & DATABASE CONNECTION ---
const PORT = process.env.PORT || 5050;

console.log('⏳ Connecting to MongoDB Atlas...');

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  family: 4
})
.then(() => {
  console.log('✅ MongoDB connected successfully!');
  app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ Connection Error:', err.message);
});
