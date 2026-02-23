const mongoose = require('mongoose');

const coachSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Coach name is required'] },
  sport: { type: String, required: [true, 'Sport is required'] },
  photo: { type: String },
  experience: { type: Number },
  certifications: [{ type: String }],
  bio: { type: String },
  email: { type: String },
  phone: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Coach', coachSchema);
