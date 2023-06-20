const Leadmodel = require("../models/Leadmodel")
const xlsx=require('xlsx')
const createlead = (req,res) => {

    const Lead = new Leadmodel({
      Name:req.body.Name,
      Phone:req.body.Phone,
      Country:req.body.Country,
      Company: req.body.Company,
      Email:req.body.Email
    })
    
    Lead.save()
    .then(result => {
      res.status(200).json({
          newLead : result
      })
    })
    .catch(err => {
      res.status(500).json({
          error:err
      })
    })
  }

  const getleadinfo = (req,res) => {
    const lead_id  = req.params.lead_id;
   
    if(lead_id){
        
       Leadmodel.find({lead_id})
        .then(data => {
            if(!data){
                res.status(404).send({message:'Lead not found with id' + id})
            }
            else{
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({message:'Error occured'});
        })
    }
    else{
        Leadmodel.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({message:'Error Occured',
        error: err
        })
        })
    }
}

const deletelead = (req,res) => {
    const id = req.params.id;
    Leadmodel.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({message:`Data not found with id = ${id}` })
        }
        else{
            res.status(200).send({message: 'Data deleted successfully'})
        }
    })

    .catch(err => {
        res.status(500).send({
            message : "Could not delete data with id" + id,
            error: err
        })
    })
}
const updatelead = async (req,res) =>{
    const { Name ,Phone,Country,Company,Email} = req.body;
    const id = req.params.id;
    const newlead = await Leadmodel.findByIdAndUpdate(id);

    
    newlead.Name = Name|| newlead.Name;
    newlead.Phone = Phone|| newlead.Phone;
    newlead.Country =Country|| newlead.Country;
    newlead.Email = Email|| newlead.Email;
    newlead.Company =Company|| newlead.Company;
    

    newlead
    .save()
    .then(data => {
        res.json({
            message:'Lead is updated',
            Updatedengineer:data
        })
    })
    .catch(err => {
        res.json({
            message:"Error Occured",
            error:err
        })
    })
}

const importuser = async (req, res) => {
    try {
      const workbook = xlsx.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(sheet);
      console.log(data)
      const emails = data.map(entry => entry.Email);
const uniqueEmails = [...new Set(emails)];

if (emails.length !== uniqueEmails.length) {
  console.log('Duplicate email addresses found in the data.',emails.length,uniqueEmails.length,emails,uniqueEmails);
  res.send({status:405,success:false ,msg:'duplicate email',data:data})
}
else{
      await Leadmodel.deleteMany({});
      await Leadmodel.insertMany(data);
  
      res.send({ status: 200, success: true, msg: 'Excel imported' });
    }} catch (err) {
      res.send({ status: 400, success: false, msg: err.message });
    }
  }
;

  
  

  module.exports ={createlead,getleadinfo,deletelead,updatelead,importuser}