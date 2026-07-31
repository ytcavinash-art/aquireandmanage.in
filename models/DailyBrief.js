const mongoose = require('mongoose');

const rankedItemSchema = new mongoose.Schema({
  id: String,
  title: { type: String, required: true },
  whatHappened: String,
  whyItMatters: String,
  dprImplication: String,
  clientAction: String,
  sources: [String],
  category: { type: String, default: 'General' }
});

const dailyBriefSchema = new mongoose.Schema({
  briefId: { type: String, required: true, unique: true, index: true },
  date: { type: String, required: true }, // e.g., "2026-07-21" or "Tue, Jul 21, 2026"
  publishedAt: { type: Date, default: Date.now },
  title: { type: String, required: true },
  focus: { type: String, required: true },
  coverageAssumption: String,
  executiveSummary: [String],
  highestImpactSignals: [String],
  rankedItems: [rankedItemSchema],
  urgentDeadlines: [{
    deadline: String,
    item: String,
    action: String
  }],
  immediateActionList: [String],
  isAutomated: { type: Boolean, default: true },
  isPublished: { type: Boolean, default: true }
}, { timestamps: true });

dailyBriefSchema.index({ publishedAt: -1 });

module.exports = mongoose.model('DailyBrief', dailyBriefSchema);
