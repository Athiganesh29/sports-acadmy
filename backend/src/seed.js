const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const SiteSetting = require('./models/SiteSetting');

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    // Seed Super Admin
    const existingAdmin = await Admin.findOne({ email: process.env.SUPERADMIN_EMAIL });
    if (!existingAdmin) {
      await Admin.create({
        name: process.env.SUPERADMIN_NAME || 'Super Admin',
        email: process.env.SUPERADMIN_EMAIL || 'admin@sportsacademy.com',
        password: process.env.SUPERADMIN_PASSWORD || 'Admin@123',
        role: 'superadmin',
        isActive: true,
      });
      console.log('Super Admin created successfully');
    } else {
      console.log('Super Admin already exists, skipping...');
    }

    // Seed default site settings
    const existingSettings = await SiteSetting.findOne();
    if (!existingSettings) {
      await SiteSetting.create({
        academyName: 'Sports Academy',
        tagline: 'Train Like Champions',
        phone: ['+91 98765 43210'],
        email: 'info@sportsacademy.com',
        address: '123 Sports Complex, Main Road, Chennai, Tamil Nadu 600001',
        whatsappNumber: '919876543210',
        googleMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.2!2d80.2!3d13.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1',
        socialLinks: {
          facebook: 'https://facebook.com/sportsacademy',
          instagram: 'https://instagram.com/sportsacademy',
          youtube: 'https://youtube.com/sportsacademy',
          twitter: 'https://twitter.com/sportsacademy',
        },
        workingHours: 'Mon-Sat: 6:00 AM - 8:00 PM',
      });
      console.log('Default site settings created');
    } else {
      console.log('Site settings already exist, skipping...');
    }

    console.log('Seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedDB();
