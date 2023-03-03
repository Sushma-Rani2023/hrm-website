const mongoose = require('mongoose');

const CreateProjectSchema = new mongoose.Schema({
    Projectname:String,
    Projectcode: String,
    Projectmanager:String,
    ProjectStartDate:String,
    Projectstatus: String,
    Projectdescription:String
})

module.exports = mongoose.model('CreateProject', CreateProjectSchema);