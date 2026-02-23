const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'] },
  slug: { type: String, unique: true },
  content: { type: String },
  excerpt: { type: String },
  image: { type: String },
  author: { type: String },
  tags: [{ type: String }],
  isPublished: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
