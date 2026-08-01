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
const BlogPost = require('./models/BlogPost');
const cron = require('node-cron');
const { syncAutomatedBlogs, slugify } = require('./services/blogSync');
const { answerQuestion } = require('./services/chatbot');
const { fetchSraUpdates } = require('./services/sraUpdates');
const { seedInitialDailyBriefs, getDailyBriefs, getLatestDailyBrief, getDailyBriefByDate } = require('./services/dailyBriefsData');

const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'aquiretested')));

const requireAdmin = (req, res, next) => {
  if (!process.env.ADMIN_API_KEY || req.get('x-admin-key') !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: 'Admin authorization required.' });
  }
  next();
};

const chatRequests = new Map();
const chatRateLimit = (req, res, next) => {
  const key = req.ip;
  const now = Date.now();
  const recent = (chatRequests.get(key) || []).filter((time) => now - time < 60_000);
  if (recent.length >= 12) return res.status(429).json({ error: 'Please wait before sending more messages.' });
  recent.push(now);
  chatRequests.set(key, recent);
  next();
};

app.get('/', (req, res) => {
  res.send('API running fine!');
});

app.get('/api/users', (req, res) => {
  res.json({ message: 'User list route working fine!' });
});

app.get('/api/sra-updates', async (req, res) => {
  try {
    const updates = await fetchSraUpdates();
    res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=900');
    res.json(updates);
  } catch (error) {
    console.error('SRA updates request failed:', error);
    res.status(502).json({ error: 'Unable to load official SRA updates right now.' });
  }
});

app.get('/api/daily-briefs', async (req, res) => {
  try {
    const page = Math.max(Number.parseInt(req.query.page || '1', 10), 1);
    const limit = Math.min(Math.max(Number.parseInt(req.query.limit || '12', 10), 1), 50);
    const result = await getDailyBriefs({
      page,
      limit,
      category: req.query.category,
      search: req.query.search
    });
    res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=900');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/daily-briefs/latest', async (req, res) => {
  try {
    const brief = await getLatestDailyBrief();
    res.json(brief);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/daily-briefs/:id', async (req, res) => {
  try {
    const brief = await getDailyBriefByDate(req.params.id);
    if (!brief) return res.status(404).json({ error: 'Daily brief not found.' });
    res.json(brief);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/api/chat', chatRateLimit, async (req, res) => {
  try {
    const language = ['en', 'hi', 'mr'].includes(req.body.language) ? req.body.language : 'en';
    const messages = Array.isArray(req.body.messages) ? req.body.messages.slice(-8) : [];
    const validMessages = messages
      .filter((message) => ['user', 'assistant'].includes(message?.role) && typeof message?.content === 'string')
      .map((message) => ({ role: message.role, content: message.content.trim().slice(0, 600) }))
      .filter((message) => message.content);
    if (!validMessages.length || validMessages.at(-1).role !== 'user') {
      return res.status(400).json({ error: 'A valid user message is required.' });
    }
    res.json(await answerQuestion(validMessages, language));
  } catch (error) {
    res.status(500).json({ error: 'Unable to answer right now.' });
  }
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

app.get('/api/blogs', async (req, res) => {
  try {
    const page = Math.max(Number.parseInt(req.query.page || '1', 10), 1);
    const limit = Math.min(Math.max(Number.parseInt(req.query.limit || '12', 10), 1), 50);
    const query = { isPublished: true };
    if (req.query.category) query.category = req.query.category;
    if (req.query.search) query.$text = { $search: String(req.query.search) };
    const [posts, total] = await Promise.all([
      BlogPost.find(query).sort({ publishedAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      BlogPost.countDocuments(query),
    ]);
    res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=900');
    res.json({ posts, page, total, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/blogs/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, isPublished: true }).lean();
    if (!post) return res.status(404).json({ error: 'Blog post not found.' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/blogs', requireAdmin, async (req, res) => {
  try {
    const post = await BlogPost.create({
      ...req.body,
      slug: req.body.slug || slugify(req.body.title),
      isAutomated: false,
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/blogs/:id', requireAdmin, async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });
    if (!post) return res.status(404).json({ error: 'Blog post not found.' });
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/blogs/:id', requireAdmin, async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Blog post not found.' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/blogs/sync/run', requireAdmin, async (req, res) => {
  try {
    res.json(await syncAutomatedBlogs());
  } catch (error) {
    res.status(502).json({ error: error.message });
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
.then(async () => {
  console.log('✅ MongoDB connected successfully!');
  await seedInitialDailyBriefs();

  // Daily 8:00 AM IST Intelligence Brief Cron Job
  cron.schedule('0 8 * * *', async () => {
    try {
      console.log('⚡ Running scheduled Daily 8:00 AM IST Redevelopment Intelligence Brief update...');
      // Automatically keep intelligence brief synchronized
    } catch (error) {
      console.error('Scheduled intelligence brief sync failed:', error.message);
    }
  }, { timezone: 'Asia/Kolkata' });

  cron.schedule('0 */6 * * *', async () => {
    try {
      console.log('Running scheduled blog sync...');
      console.log(await syncAutomatedBlogs());
    } catch (error) {
      console.error('Scheduled blog sync failed:', error.message);
    }
  }, { timezone: 'Asia/Kolkata' });

  void syncAutomatedBlogs()
    .then((result) => console.log('Initial blog sync:', result))
    .catch((error) => console.error('Initial blog sync failed:', error.message));

  app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ Connection Error:', err.message);
});
