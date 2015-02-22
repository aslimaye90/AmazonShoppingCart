var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
  name: String,
  userId: String,
  password: String
});

module.exports = mongoose.model('users', usersSchema);