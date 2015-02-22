var mongoose = require('mongoose');

var categoriesSchema = new mongoose.Schema({
  name: String,
  description: String
});

module.exports = mongoose.model('categories', categoriesSchema);