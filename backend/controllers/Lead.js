const Leadmodel = require("../models/Leadmodel")
const xlsx=require('xlsx')
import { saveAs } from 'file-saver';
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
  
    //   const existingData = await Leadmodel.find({}, '-_id Name Country Company Phone Email');
  
    //   const existingDataWithoutId = existingData.map(obj => {
    //     const { Name, Country, Company, Phone, Email } = obj.toObject();
    //     return { Name, Country, Company, Phone, Email };
    //   });
  
    //   const mergedData = existingDataWithoutId.concat(data);
      await Leadmodel.insertMany(data);
  
      res.send({ status: 200, success: true, msg: 'Excel imported' });
    } catch (err) {
      res.send({ status: 400, success: false, msg: err.message });
    }
  };

  const download=async (req,res)=>{
   
        try {
          const data = await Leadmodel.find();
          res.json(data);
        } catch (error) {
          console.error('Error fetching data:', error);
          res.status(500).json({ error: 'Error fetching data' });
        }
      
  }
  
  

  module.exports ={createlead,getleadinfo,deletelead,updatelead,importuser,download}