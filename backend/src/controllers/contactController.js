const Contact = require('../models/Contact');
const SiteSetting = require('../models/SiteSetting');
const sendEmail = require('../utils/sendEmail');

// @desc    Create a contact message (public form submission)
// @route   POST /api/contacts
// @access  Public
const createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);

    // Send notification email to admin
    try {
      const settings = await SiteSetting.findOne();
      const adminEmail = settings ? settings.email : process.env.EMAIL_USER;

      if (adminEmail) {
        const html = `
          <h2>New Contact Message</h2>
          <table style="border-collapse:collapse;width:100%;">
            <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Name</strong></td><td style="padding:8px;border:1px solid #ddd;">${contact.name}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd;">${contact.email}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #ddd;">${contact.phone || 'N/A'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Subject</strong></td><td style="padding:8px;border:1px solid #ddd;">${contact.subject || 'N/A'}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Message</strong></td><td style="padding:8px;border:1px solid #ddd;">${contact.message}</td></tr>
          </table>
        `;

        await sendEmail({
          to: adminEmail,
          subject: `New Contact: ${contact.subject || 'No Subject'} - From ${contact.name}`,
          html,
        });
      }
    } catch (emailError) {
      console.error('Contact notification email failed:', emailError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully. We will get back to you soon!',
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Private
const getContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.isRead !== undefined) {
      filter.isRead = req.query.isRead === 'true';
    }

    const total = await Contact.countDocuments(filter);
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: contacts.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get single contact by ID (marks as read)
// @route   GET /api/contacts/:id
// @access  Private
const getContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found',
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Reply to a contact message
// @route   POST /api/contacts/:id/reply
// @access  Private
const replyContact = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a reply message',
      });
    }

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found',
      });
    }

    const html = `
      <h2>Reply from Sports Academy</h2>
      <p>Dear ${contact.name},</p>
      <p>Thank you for reaching out to us. Here is our reply regarding your inquiry:</p>
      <div style="background:#f5f5f5;padding:16px;border-left:4px solid #1a73e8;margin:16px 0;">
        ${message}
      </div>
      <hr/>
      <p style="color:#666;font-size:12px;"><strong>Your original message:</strong></p>
      <p style="color:#666;font-size:12px;">${contact.message}</p>
      <p>Best regards,<br/>Sports Academy Team</p>
    `;

    try {
      await sendEmail({
        to: contact.email,
        subject: `Re: ${contact.subject || 'Your Message'} - Sports Academy`,
        html,
      });
    } catch (emailError) {
      console.error('Reply email failed:', emailError.message);
      // Continue even if email fails - still mark as read
    }

    // Mark as read after replying
    contact.isRead = true;
    await contact.save();

    res.status(200).json({
      success: true,
      message: 'Reply sent successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to send reply',
      error: error.message,
    });
  }
};

// @desc    Delete a contact message
// @route   DELETE /api/contacts/:id
// @access  Private
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact message deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

module.exports = {
  createContact,
  getContacts,
  getContact,
  replyContact,
  deleteContact,
};
