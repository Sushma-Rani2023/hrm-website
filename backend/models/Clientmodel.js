const mongoose = require('mongoose');

const CreateProjectSchema = new mongoose.Schema({
    Projectname:String,
    Projectcode: String,
    Projectmanager:String,
    ProjectStartDate:String,
    Projectstatus: String,
    description:String
})

module.exports = mongoose.model('CreateProject', CreateProjectSchema);