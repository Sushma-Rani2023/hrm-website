const mongoose = require('mongoose');

const userAuthSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  microsoftId: String,
  phoneNo:Number,
  address: String,
  emergencyNo:Number,
  skills:Array,
  

});

const User = mongoose.model('User', userAuthSchema);

module.exports = User;