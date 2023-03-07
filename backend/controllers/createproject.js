const CreateProject = require('../models/Createprojectmodel')


const Createproject = (req,res,next) => {
    
    const project = new CreateProject({
        Projectname:req.body.Projectname,
        Projectcode:req.body.Projectcode,
        Projectmanager:req.body.Projectmanager,
        ProjectStartDate:req.body.ProjectStartDate,
        Projectstatus:req.body.Projectstatus,
        description: req.body.description
       })
    project.save()
    .then(result =>{
        console.log(result)
        res.status(200).json({
            newProject : result
        })
     })

     .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
     })
}


const Projectfindbycode = (req,res) => {
    console.log(req.params.Projectcode);
    CreateProject.find({ Projectcode : req.params.Projectcode})
    .then(result => {
        res.status(200).json({
            projectData : result
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
}

const updateproject = (req,res) => {
  const id = req.params.id;
  console.log(id);
  CreateProject.findByIdAndUpdate(id, req.body,{ useFindandModify: false} )
   .then(data =>{
    if(!data){
        res.status(404).send({message : `Cannot Update Project with ${id}.Maybe project not found`})
    }
    else{
        res.send(data)
    }
   })
   .catch(err => {
    res.status(500).send({message : `Error Update project information `})
   })   
}

const deleteproject = (req, res)=> {
    const id = req.params.id;

    CreateProject.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({message:`cannot dalete with id ${id} Maybe id is wrong`})
        }
        else{
            res.send({
                message : "Project was deleted successfully!"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message : "Could not delete Project with id " + id
        })
    })
}

module.exports = {Createproject , Projectfindbycode , updateproject , deleteproject};