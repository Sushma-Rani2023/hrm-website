const Leadmodel = require("../models/Leadmodel");
const xlsx = require("xlsx");
const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  signatureVersion: "v4",
  region: "ap-south-1",
  accessKeyId: process.env.accesskey,
  secretAccessKey: process.env.secretkey,
});
const createlead = (req, res) => {
  const Lead = new Leadmodel({
    Name: req.body.Name,
    Phone: req.body.Phone,
    Country: req.body.Country,
    Company: req.body.Company,
    Email: req.body.Email,
  });

  Lead.save()
    .then((result) => {
      res.status(200).json({
        newLead: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

const getleadinfo = (req, res) => {
  const lead_id = req.params.lead_id;

  if (lead_id) {
    Leadmodel.find({ lead_id })
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Lead not found with id" + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error occured" });
      });
  } else {
    Leadmodel.find()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({ message: "Error Occured", error: err });
      });
  }
};

const deletelead = (req, res) => {
  const id = req.params.id;
  Leadmodel.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Data not found with id = ${id}` });
      } else {
        res.status(200).send({ message: "Data deleted successfully" });
      }
    })

    .catch((err) => {
      res.status(500).send({
        message: "Could not delete data with id" + id,
        error: err,
      });
    });
};
const updatelead = async (req, res) => {
  const { Name, Phone, Country, Company, Email } = req.body;
  const id = req.params.id;
  const newlead = await Leadmodel.findByIdAndUpdate(id);

  newlead.Name = Name || newlead.Name;
  newlead.Phone = Phone || newlead.Phone;
  newlead.Country = Country || newlead.Country;
  newlead.Email = Email || newlead.Email;
  newlead.Company = Company || newlead.Company;

  newlead
    .save()
    .then((data) => {
      res.json({
        message: "Lead is updated",
        Updatedengineer: data,
      });
    })
    .catch((err) => {
      res.json({
        message: "Error Occured",
        error: err,
      });
    });
};
const importuser = async (req, res) => {
  try {
    const params = {
      Bucket: process.env.bucket_name,
      Key: req.body.key,
    };

    const s3Object = await s3.getObject(params).promise();
    const workbook = xlsx.read(s3Object.Body, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    const emails = data.map((entry) => entry.Email);
    const uniqueEmails = [...new Set(emails)];

    if (emails.length !== uniqueEmails.length) {
      console.log("Duplicate email addresses found in the data.");
      res.status(405).json({
        success: false,
        msg: "Duplicate email",
        data: data,
      });
    } else {
      await Leadmodel.deleteMany({});
      await Leadmodel.insertMany(data);
      console.log("Data imported:", data.length, "rows");
      await s3.deleteObject(params).promise();
      res.status(200).json({ success: true, msg: "Excel imported" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(400).json({ success: false, msg: err.message });
  }
};
;


async function upload(req, res) {

  const message = req.body

  
  try {
    
    const params = {
      Bucket: process.env.bucket_name,
      Key: message.file,
      ContentType: message.fileType,
      Expires: 300000,
    };
    
    const preSignedUrl = await s3.getSignedUrlPromise("putObject", params);
    console.log(preSignedUrl);
    return res.send({
      statusCode: 200,
      url:preSignedUrl
      
    });
  } catch (error) {
    return res.send({
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
      }),
    });
  }
}

module.exports = {
  createlead,
  getleadinfo,
  deletelead,
  updatelead,
  importuser,
  upload,
};
