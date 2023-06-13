import React from 'react'
const nodemailer = require('nodemailer');

const Sendmail = () => {

    const transporter = nodemailer.createTransport({
        service: 'outlook', // e.g., 'gmail'
        auth: {
          user: process.env.outlook_mail,
          pass: process.env.password,
        },
      });
      
      // Define the email options
      const mailOptions = {
        from: process.env.outlook_mail,
        to: 'rajputsushma5@gmail.com',
        subject: 'Test Email',
        text: 'This is a test email sent from Node.js using Nodemailer.',
      };
      
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return error
        } else {
          return info
        }
      });
      
  
}

export default Sendmail

