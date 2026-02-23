const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Program name is required'] },
  sport: { type: String, required: [true, 'Sport is required'] },
  ageGroup: { type: String, required: true },
  description: { type: String },
  duration: { type: String },
  fee: { type: Number },
  coach: { type: mongoose.Schema.Types.ObjectId, ref: 'Coach' },
  image: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Program', programSchema);
