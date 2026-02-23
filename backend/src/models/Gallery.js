const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'] },
  type: { type: String, enum: ['photo', 'video'], required: true },
  url: { type: String, required: [true, 'URL is required'] },
  thumbnail: { type: String },
  category: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
