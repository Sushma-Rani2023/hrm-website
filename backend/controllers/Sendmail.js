const nodemailer = require('nodemailer');

const sendEMail = async (req, res) => {
  console.log('Sending Email',req.body);
  try {
  
    const transporter = nodemailer.createTransport({
      service: 'outlook365',
      auth: {
        user: process.env.outlook_mail,
        pass: process.env.password,
      },
    });


    const mailOptions = {
      from: process.env.outlook_mail,
      to: req.body.arr,
      subject: req.body.subject,
      html:req.body.html
    };
    
    const info = await transporter.sendMail(mailOptions);
  
    res.send({ msg: 'Email sent successfully' });
    return info;
  } catch (error) {
    console.log('error is', error);
    throw error;
  }
};

module.exports = sendEMail;
















