const nodemailer = require("nodemailer");
const compile = require("string-template");
const mongoose = require("mongoose");
const Leadmodel = require("../models/Leadmodel");

const sendEmail = async (req, res) => {
  console.log("Sending Email", req.body);

  try {
    const transporter = nodemailer.createTransport({
      service: "outlook365",
      auth: {
        user: process.env.outlook_mail,
        pass: process.env.password,
      },
    });

    const sendMailPromises = req.body.arr.map(async (id) => {
      try {
        const user_id = new mongoose.Types.ObjectId(id);
        const user = await Leadmodel.findById(user_id);
        console.log(user.Name);

        const Html = compile(req.body.html, {
          name: user.Name,
          email: user.Email,
          country: user.Country,
          company: user.Company,
          phone: user.Phone,
        });

        const mailOptions = {
          from: process.env.outlook_mail,
          to: user.Email,
          subject: req.body.subject,
          html: Html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
      } catch (error) {
        console.log("Error:", error);
      }
    });

   
    const concurrencyLimit = 5;
    for (let i = 0; i < sendMailPromises.length; i += concurrencyLimit) {
      await Promise.all(sendMailPromises.slice(i, i + concurrencyLimit));
    }

    res.send({ msg: "Mail sent successfully" });
  } catch (error) {
    console.log("Error is", error);
    res.send({ msg: "There is an error" });
  }
};

module.exports = sendEmail;
