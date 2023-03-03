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

module.exports = Createproject;