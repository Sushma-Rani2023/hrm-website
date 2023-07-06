const nodemailer = require("nodemailer");
const compile = require("string-template");
const mongoose = require("mongoose");
const Leadmodel = require("../models/Leadmodel");

const sendEMail = async (req, res) => {
  console.log("Sending Email", req.body);
  try {
    const transporter = nodemailer.createTransport({
      service: "outlook365",
      auth: {
        user: process.env.outlook_mail,
        pass: process.env.password,
      },
    });

    req.body.arr.forEach(async (id) => {
      const user_id=new mongoose.Types.ObjectId(id)

      const user = await Leadmodel.findById(user_id);

      Html = compile(req.body.html, {
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

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.send({msg:"There is an error"})

          console.log("Error:", error);
        } else {
          res.send({msg:"mail sent successfully"})
          console.log("Email sent:", info.response);
        }
      });
    });

   
  } catch (error) {
    console.log("error is", error);
    res.send({msg:"There is an error"});
  }
};

module.exports = sendEMail;
