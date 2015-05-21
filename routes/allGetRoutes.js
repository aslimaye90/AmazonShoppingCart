var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var categoriesSchema = require('../models/categoriesSchema.js');
var usersSchema = require('../models/usersSchema.js');
var productsSchema = require('../models/productsSchema.js');
var shoppingCartSchema = require('../models/shoppingCartSchema.js');
var redisCaching = require('../modules/redisCaching.js');

//var shoppingCartSchema = mongoose.model('shoppingcart');

/* GET categories listing. */
router.get('/categories', function(req, res, next) {
  
  var callbackFunction = function(data){
    if (data == 'xxx'){
      categoriesSchema.find(function (err, categories) {
        if (err) 
          return next(err);

        redisCaching.cacheThis('allCategories', JSON.stringify(categories));
        res.json(categories);
      });
    }
    else{
      res.json(JSON.parse(data));
    }
  }

  redisCaching.checkInCache('allCategories', callbackFunction);  
});


/* GET products listing. */
router.get('/products', function(req, res, next) {
  var callbackFunction = function(data){
    if (data == 'xxx'){
      productsSchema.find(function (err, products) {
        if (err)
          return next(err);

        redisCaching.cacheThis('allProducts', JSON.stringify(products));
        res.json(products);
      });
    }
    else{
      res.json(JSON.parse(data));
    }
  }

  redisCaching.checkInCache('allProducts', callbackFunction);  
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
  var callbackFunction = function(data){
    if (data == 'xxx'){
      usersSchema.find(function (err, users) {
        if (err)
          return next(err);

        redisCaching.cacheThis('allUsers', JSON.stringify(users));
        res.json(users);
      });
    }
    else{
      res.json(JSON.parse(data));
    }
  }

  redisCaching.checkInCache('allUsers', callbackFunction);  
});


/* GET shopping cart listing. */
router.get('/shoppingcart', function(req, res, next) {
  var callbackFunction = function(data){
    if (data == 'xxx'){
      shoppingCartSchema.find(function (err, shoppingcart) {
        if (err)
          return next(err);

        redisCaching.cacheThis('shoppingCart', JSON.stringify(shoppingcart));
        res.json(shoppingcart);
      });
    }
    else{
      res.json(JSON.parse(data));
    }
  }

  redisCaching.checkInCache('shoppingCart', callbackFunction);    
});


module.exports = router;