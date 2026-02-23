const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  registrationId: { type: String, unique: true },
  student: {
    firstName: { type: String, required: [true, 'First name is required'] },
    lastName: { type: String, required: [true, 'Last name is required'] },
    dateOfBirth: { type: Date, required: [true, 'Date of birth is required'] },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    photo: { type: String },
  },
  parent: {
    name: { type: String, required: [true, 'Parent name is required'] },
    relationship: { type: String },
    phone: { type: String, required: [true, 'Phone number is required'] },
    email: { type: String, required: [true, 'Email is required'] },
    address: { type: String },
  },
  program: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Registration', registrationSchema);
