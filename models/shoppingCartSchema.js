var mongoose = require('mongoose');

var shoppingCartSchema = new mongoose.Schema({
  productId: {
  	type: mongoose.Schema.ObjectId,
  	ref: 'products'
  },
  quantity: Number
});

module.exports = mongoose.model('shoppingcart', shoppingCartSchema, 'shoppingcart');