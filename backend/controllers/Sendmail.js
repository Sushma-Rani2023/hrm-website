const nodemailer = require('nodemailer');

const sendMail = async (req,res) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'outlook365', // e.g., 'gmail'
      auth: {
        user: process.env.outlook_mail,
        pass: process.env.password,
      },
    });
    
    const mailOptions = {
      from: process.env.outlook_mail,
      to: ['rajputsusa5@gmail.com','sushma_9@outlook.com'],
      subject: 'Test Email',
      text: 'This is a test email sent from Node.js using Nodemailer.',
    };

    // Send the email
     transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        res.send({msg:'Email send ssuccesfully'})
        resolve(info);
      }
    });
  });
};

module.exports = sendMail;
