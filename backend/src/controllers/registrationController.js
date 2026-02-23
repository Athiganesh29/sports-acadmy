const Registration = require('../models/Registration');
const Program = require('../models/Program');
const generateRegId = require('../utils/generateRegId');
const sendEmail = require('../utils/sendEmail');

// @desc    Create a new registration
// @route   POST /api/registrations
// @access  Public
const createRegistration = async (req, res) => {
  try {
    // Generate unique registration ID
    const registrationId = await generateRegId();

    // Transform flat FormData fields into the nested model structure
    const registrationData = {
      registrationId,
      student: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        photo: req.file ? req.file.path : undefined,
      },
      parent: {
        name: req.body.parentName,
        relationship: req.body.relationship,
        phone: req.body.parentPhone,
        email: req.body.parentEmail,
        address: req.body.address,
      },
      program: req.body.programId || undefined,
    };

    const registration = await Registration.create(registrationData);

    // Populate program details for the email
    const populatedReg = await Registration.findById(registration._id).populate(
      'program',
      'name sport ageGroup fee'
    );

    // Send confirmation email to parent
    const html = `
      <h2>Registration Confirmation</h2>
      <p>Dear ${registration.parent.name},</p>
      <p>Thank you for registering <strong>${registration.student.firstName} ${registration.student.lastName}</strong> at Sports Academy.</p>
      <h3>Registration Details</h3>
      <table style="border-collapse:collapse;width:100%;">
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Registration ID</strong></td><td style="padding:8px;border:1px solid #ddd;">${registrationId}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Program</strong></td><td style="padding:8px;border:1px solid #ddd;">${populatedReg.program ? populatedReg.program.name : 'N/A'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Sport</strong></td><td style="padding:8px;border:1px solid #ddd;">${populatedReg.program ? populatedReg.program.sport : 'N/A'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Status</strong></td><td style="padding:8px;border:1px solid #ddd;">Pending</td></tr>
      </table>
      <p>We will review your registration and get back to you shortly.</p>
      <p>Best regards,<br/>Sports Academy Team</p>
    `;

    try {
      await sendEmail({
        to: registration.parent.email,
        subject: `Registration Confirmation - ${registrationId}`,
        html,
      });
    } catch (emailError) {
      // Log but don't fail the registration if email fails
      console.error('Registration email notification failed:', emailError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Registration submitted successfully',
      data: populatedReg,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get all registrations (with pagination, filter, search)
// @route   GET /api/registrations
// @access  Private
const getRegistrations = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const filter = {};

    // Filter by status
    if (req.query.status) {
      filter.status = req.query.status;
    }

    // Search by student name, parent name, or registration ID
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      filter.$or = [
        { 'student.firstName': searchRegex },
        { 'student.lastName': searchRegex },
        { 'parent.name': searchRegex },
        { 'parent.email': searchRegex },
        { registrationId: searchRegex },
      ];
    }

    const total = await Registration.countDocuments(filter);
    const registrations = await Registration.find(filter)
      .populate('program', 'name sport ageGroup fee')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: registrations.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: registrations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get single registration by ID
// @route   GET /api/registrations/:id
// @access  Private
const getRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id).populate(
      'program',
      'name sport ageGroup fee duration coach'
    );

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found',
      });
    }

    res.status(200).json({
      success: true,
      data: registration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Update registration status
// @route   PUT /api/registrations/:id/status
// @access  Private
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !['Pending', 'Confirmed', 'Cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid status (Pending, Confirmed, Cancelled)',
      });
    }

    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('program', 'name sport');

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found',
      });
    }

    // Send status update email to parent
    const html = `
      <h2>Registration Status Update</h2>
      <p>Dear ${registration.parent.name},</p>
      <p>The status of registration <strong>${registration.registrationId}</strong> for
      <strong>${registration.student.firstName} ${registration.student.lastName}</strong>
      has been updated to: <strong>${status}</strong>.</p>
      ${status === 'Confirmed' ? '<p>Welcome to Sports Academy! We look forward to seeing you.</p>' : ''}
      ${status === 'Cancelled' ? '<p>If you have any questions, please contact us.</p>' : ''}
      <p>Best regards,<br/>Sports Academy Team</p>
    `;

    try {
      await sendEmail({
        to: registration.parent.email,
        subject: `Registration ${status} - ${registration.registrationId}`,
        html,
      });
    } catch (emailError) {
      console.error('Status update email failed:', emailError.message);
    }

    res.status(200).json({
      success: true,
      message: `Registration status updated to ${status}`,
      data: registration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Export registrations as CSV
// @route   GET /api/registrations/export/csv
// @access  Private
const exportCSV = async (req, res) => {
  try {
    const filter = {};

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const registrations = await Registration.find(filter)
      .populate('program', 'name sport ageGroup fee')
      .sort({ createdAt: -1 });

    // Build CSV header
    const csvHeaders = [
      'Registration ID',
      'Student First Name',
      'Student Last Name',
      'Date of Birth',
      'Gender',
      'Parent Name',
      'Parent Phone',
      'Parent Email',
      'Parent Address',
      'Program',
      'Sport',
      'Status',
      'Registration Date',
    ].join(',');

    // Build CSV rows
    const csvRows = registrations.map((reg) => {
      return [
        reg.registrationId,
        `"${reg.student.firstName}"`,
        `"${reg.student.lastName}"`,
        reg.student.dateOfBirth ? new Date(reg.student.dateOfBirth).toLocaleDateString() : '',
        reg.student.gender || '',
        `"${reg.parent.name}"`,
        reg.parent.phone,
        reg.parent.email,
        `"${(reg.parent.address || '').replace(/"/g, '""')}"`,
        reg.program ? `"${reg.program.name}"` : '',
        reg.program ? reg.program.sport : '',
        reg.status,
        new Date(reg.createdAt).toLocaleDateString(),
      ].join(',');
    });

    const csv = [csvHeaders, ...csvRows].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=registrations.csv');

    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

module.exports = {
  createRegistration,
  getRegistrations,
  getRegistration,
  updateStatus,
  exportCSV,
};
