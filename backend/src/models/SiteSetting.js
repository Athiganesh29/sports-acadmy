const mongoose = require('mongoose');

const siteSettingSchema = new mongoose.Schema({
  academyName: { type: String, default: 'Sports Academy' },
  tagline: { type: String, default: 'Train Like Champions' },
  phone: [{ type: String }],
  email: { type: String },
  address: { type: String },
  whatsappNumber: { type: String },
  googleMapUrl: { type: String },
  socialLinks: {
    facebook: { type: String },
    instagram: { type: String },
    youtube: { type: String },
    twitter: { type: String },
  },
  workingHours: { type: String, default: 'Mon-Sat: 6AM-8PM' },
}, { timestamps: true });

module.exports = mongoose.model('SiteSetting', siteSettingSchema);
