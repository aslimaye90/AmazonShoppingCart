var mongoose = require('mongoose');

var productsSchema = new mongoose.Schema({
  name: String,
  description: String,
  availability: Number,
  category: {
  	type: mongoose.Schema.ObjectId,
  	ref: 'categories'
  },
  price: Number
});

module.exports = mongoose.model('products', productsSchema);