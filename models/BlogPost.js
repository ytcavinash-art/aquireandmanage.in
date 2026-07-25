const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  content: { type: String, default: '' },
  image: { type: String, default: '' },
  author: { type: String, default: 'A&M Advisory', trim: true },
  category: { type: String, default: 'Industry News', trim: true },
  sourceName: { type: String, default: '', trim: true },
  sourceUrl: { type: String, default: '', trim: true },
  publishedAt: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: true },
  isAutomated: { type: Boolean, default: false },
}, { timestamps: true });

blogPostSchema.index({ title: 'text', description: 'text', content: 'text' });
blogPostSchema.index({ isPublished: 1, publishedAt: -1 });

module.exports = mongoose.model('BlogPost', blogPostSchema);
