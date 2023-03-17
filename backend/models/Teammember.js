const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  MemberName:{
    type:String,
    required:true
  },
  Role:{
     type:String,
     required:true
  },
  Description:{
    type:String,
    required:false
  },
  AllocationDate:{
    type:String
  },
  project_id:{
    type:String
  }
})

module.exports = mongoose.model("Member",teamSchema);