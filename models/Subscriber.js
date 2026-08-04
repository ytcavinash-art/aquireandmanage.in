const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  emailAddress: { type: String, required: true, unique: true, trim: true, lowercase: true },
  status: { type: String, enum: ['subscribed', 'unsubscribed'], default: 'subscribed' },
  sourcePage: { type: String, trim: true, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Subscriber', subscriberSchema);
