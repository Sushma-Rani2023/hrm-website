const nodemailer = require('nodemailer');

const sendMail = () => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'outlook', // e.g., 'gmail'
      auth: {
        user: process.env.outlook_mail,
        pass: process.env.password,
      },
    });
    
    const mailOptions = {
      from: process.env.outlook_mail,
      to: 'sushma@inzint.com',
      subject: 'Test Email',
      text: 'This is a test email sent from Node.js using Nodemailer.',
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

module.exports = sendMail;
