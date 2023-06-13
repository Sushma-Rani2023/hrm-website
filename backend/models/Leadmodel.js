const mongoose =require("mongoose")

const Leadschema=new mongoose.Schema({
    Name:String,
    Phone:Number,
    Country:String,
    Company:String,
    Email:String
})

module.exports =mongoose.model('Lead',Leadschema);