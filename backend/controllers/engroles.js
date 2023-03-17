const engineerroles = require('../models/engineerroles');

const engineercreate = (req,res) => {

  const Engineer = new engineerroles({
    Name:req.body.Name,
    Description:req.body.Description,
    Optional:req.body.Optional,
    project_id: req.body.project_id
  })
  
  Engineer.save()
  .then(result => {
    res.status(200).json({
        newEngineer : result
    })
  })
  .catch(err => {
    res.status(500).json({
        error:err
    })
  })
}


const getengineerinfo = (req,res) => {
    const project_id  = req.params.project_id;
    console.log(project_id);
    if(project_id){
        
        engineerroles.find({project_id})
        .then(data => {
            if(!data){
                res.status(404).send({message:'Engineer not found with id' + id})
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
        engineerroles.find()
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

const updateengineer = async (req,res) =>{
    const { Name , Description, Optional} = req.body;
    const id = req.params.id;
    const newengineerinfo = await engineerroles.findByIdAndUpdate(id);

    
    newengineerinfo.Name = Name|| newengineerinfo.Name;
    newengineerinfo.Description = Description|| newengineerinfo.Description;
    newengineerinfo.Optional = Optional|| newengineerinfo.Optional;

    newengineerinfo
    .save()
    .then(data => {
        res.json({
            message:'Engineer is updated',
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

const deleteengineer = (req,res) => {
    const id = req.params.id;
    engineerroles.findByIdAndDelete(id)
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

module.exports = {engineercreate , getengineerinfo , updateengineer, deleteengineer};