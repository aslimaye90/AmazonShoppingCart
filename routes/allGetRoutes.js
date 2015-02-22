var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var categoriesSchema = require('../models/categoriesSchema.js');
var usersSchema = require('../models/usersSchema.js');
var productsSchema = require('../models/productsSchema.js');
var shoppingCartSchema = require('../models/shoppingCartSchema.js');

//var shoppingCartSchema = mongoose.model('shoppingcart');

/* GET categories listing. */
router.get('/categories', function(req, res, next) {
  categoriesSchema.find(function (err, categories) {
    if (err) return next(err);
    res.json(categories);
  });
});


/* GET products listing. */
router.get('/products', function(req, res, next) {
  productsSchema.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/*detailed info of a product*/
router.get('/products/:Pid',function(req,res){
	productsSchema.findById(req.params.Pid, function(err,product){
		productsSchema.populate(product,{path: 'category'},function(err,product){
			res.json(product);
		});
	});
});


/* GET users listing. */
router.get('/users', function(req, res, next) {
  usersSchema.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});


/* GET shopping cart listing. */
router.get('/shoppingcart', function(req, res, next) {
  shoppingCartSchema.find(function (err, shoppingcart) {
    if (err) return next(err);
    res.json(shoppingcart);
  });
});


module.exports = router;