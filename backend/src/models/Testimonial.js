const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'] },
  role: { type: String },
  message: { type: String, required: [true, 'Message is required'] },
  photo: { type: String },
  rating: { type: Number, min: 1, max: 5 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
