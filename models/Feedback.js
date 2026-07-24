const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  emailAddress: { type: String, required: true, trim: true, lowercase: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  feedback: { type: String, required: true, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
