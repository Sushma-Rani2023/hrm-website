const mongoose = require('mongoose');

const EngRoleSchema = new mongoose.Schema({
    Roles:String,
    Name:String,
    Description:String,
    Optional:String,
    
})

module.exports = mongoose.model('Roles', EngRoleSchema);