const engineerroles = require('../models/engineerroles');

const engineercreate = (req,res) => {

  const Engineer = new engineerroles({
    Roles:req.body.Roles,
    Name:req.body.Name,
    Description:req.body.Description,
    Optional:req.body.Optional
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
    if(req.query.id){
        const id = req.query.id;
        engineerroles.findById(id)
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

module.exports = engineercreate;