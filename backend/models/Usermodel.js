const mongoose = require('mongoose');

const userAuthSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  microsoftId: String,
  phoneNo:Number,
  emergencyNo:Number,
  skills:Array,
  Address:{
    address:String,
    city:String,
    state:String,
    zip:Number
  
    
  }

});

const User = mongoose.model('User', userAuthSchema);

module.exports = User;