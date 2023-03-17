const mongoose = require('mongoose');

const EngRoleSchema = new mongoose.Schema({
    Name:String,
    Description:String,
    Optional:Number,
    project_id:String
    
})

module.exports = mongoose.model('Roles', EngRoleSchema);