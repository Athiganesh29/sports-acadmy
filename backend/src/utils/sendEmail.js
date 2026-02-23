const transporter = require('../config/nodemailer');

const sendEmail = async ({ to, subject, html }) => {
  const mailOptions = {
    from: `"Sports Academy" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
