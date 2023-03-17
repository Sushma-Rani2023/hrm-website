const Member = require('../models/Teammember');

const createMember = (req,res) => {
    const Team = new Member({
        MemberName: req.body.MemberName,
        Role:req.body.Role,
        Description:req.body.Description,
        AllocationDate:req.body.AllocationDate,
    })
    
    Team.save()
    .then(result => {
        res.json({
            data:result
        })
    })
    .catch(err => {
        res.status(500).json({
            error : err,
            message: "Error Occured"
        })
    })
}

const getTeam = (req, res) => {
    if(req.query.id){
      const id = req.query.id;
      Member.findById(id)
      .then((result) => {
        if(!result){
            res.status(404).send({
              message : "Data not found at this" + id 
            })
        }
        else{
            res.status(200).send({
                data : result,
                message : "Data Found Successfully "
            })
        }
      })
      .catch(err => {
        res.status(500).json({
            error : err,
            message: "Error Occured in finding data"
        })
      })
    }
    else{
        Member.find()
        .then(result => {
            res.status(200).send({
                Memberdata : result,
            })
        })
        .catch(err => {
            res.status(500).send({
                error : err,
                message : "Error Occurred"
            })
        })
    }
}


const updateTeam = (req,res) => {
    const {MemberName, Role, Description, AllocationDate} = req.body;
    const id = req.params.id;
    const updatedteam = Member.findByIdAndUpdate(id);
    
    updatedteam.MemberName = MemberName || updatedteam.MemberName,
    updatedteam.Role = Role || updatedteam.Role,
    updatedteam.Description = Description || updatedteam.Description,
    updatedteam.AllocationDate = AllocationDate || updatedteam.AllocationDate,
    
    updatedteam.save()
    .then(result => {
        res.status(200).json({
            data : result,
            message : "Updated data successfully"
        })
    })
    .catch(err => {
        res.status(500).json({
            error : err,
            message : "Data not updated "
        })
    })
    
}

const deleteTeammember = (req, res) => {
    const id = req.params.id;
    Member.findByIdAndDelete(id)
    .then(result => {
        if(!result){
            res.status(404).send({mesaage:"Data not found at id" + id})
        }
        else{
            res.status(202).send({message:"Data deleted successfully"})
        }
    })
    .catch(err => {
        res.status(500).send({message:"Error Occured"});
    })
}

module.exports = {createMember, getTeam, updateTeam, deleteTeammember}