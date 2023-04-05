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
        
        res.status(200).json({
            newProject : result
        })
     })

     .catch(err => {
        
        res.status(500).json({
            error:err
        })
     })
}


const Projectfindbycode = (req,res) => {

    if(req.query.id){
      const id = req.query.id;
      CreateProject.findById(id)
      .then((data)=> {
        if(!data){
            res.status(404).send({message: 'Not found project with id' + id});
        }
        else{
            res.send(data)
        }
      })
      .catch(err => {
        res.status(500).send({message:'Error occured'})
      })
    }
    else{
        CreateProject.find()
        .then(result => {
            res.status(200).json({
                projectData : result
            });
        })
        .catch(err =>{
           
            res.status(500).json({
                error:err
            })
        })
    }
   
}



const updateproject = async (req, res) => {
    const { Projectname, Projectcode, Projectmanager, ProjectStartDate, Projectstatus , description } = req.body;
    const id = req.params.id;
    const project = await CreateProject.findByIdAndUpdate(id);
  
    project.Projectname = Projectname || project.Projectname;
    project.Projectcode = Projectcode || project.Projectcode;
    project.Projectmanager = Projectmanager || project.Projectmanager;
    project.ProjectStartDate = ProjectStartDate || project.ProjectStartDate;
    project.Projectstatus = Projectstatus || project.Projectstatus;
    project.description = description || project.description;
    
  
    project
      .save()
      .then((data) => {
        res.json({
          message: "project is updated at mongo",
          updatedProject: data,
        });
      })
      .catch((err) => {
        res.json({
          message: err.message,
        });
      });
  };

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