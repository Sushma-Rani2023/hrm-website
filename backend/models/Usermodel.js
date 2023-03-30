const mongoose = require('mongoose');

const userAuthSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  microsoftId: String
});

const User = mongoose.model('User', userAuthSchema);

module.exports = User;