const mongoose = require('mongoose');

const EngRoleSchema = new mongoose.Schema({
    Name:String,
    Description:String,
    Optional:Number,
    
})

module.exports = mongoose.model('Roles', EngRoleSchema);