const mongoose =require("mongoose")

const Leadschema=new mongoose.Schema({
    Name:{
      type:String
    },
    Phone:{
      type:Number
    },
    Country:{
      type:String
    },
    Company:{
      type:String
    },
    Email: {
        type: String,
        required: true,
        unique: true
      }
})

module.exports =mongoose.model('Lead',Leadschema);