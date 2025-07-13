// mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendErrorMail = async (error) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ALERT_EMAIL,
      subject: ' YouTube Fetch Error',
      text: `An error occurred during video fetch:\n\n${error}`
    });
  } catch (err) {
    console.error(' Failed to send error email:', err.message);
  }
};

module.exports = sendErrorMail;
