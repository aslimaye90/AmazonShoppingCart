var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var categoriesSchema = require('../models/categoriesSchema.js');
var usersSchema = require('../models/usersSchema.js');
var productsSchema = require('../models/productsSchema.js');
var shoppingCartSchema = require('../models/shoppingCartSchema.js');
var redisCaching = require('../modules/redisCaching.js');

var genericCallback = function(data, funct, res){
  if(data == 'xxx'){
    funct();
  }
  else{
    res.json(JSON.parse(data));
  }
}

/* GET categories listing. */
router.get('/categories', function(req, res, next) {
  var categoriesFunct = function(){
    categoriesSchema.find(function (err, categories) {
      if (err) 
        return next(err);

      redisCaching.cacheThis('allCategories', JSON.stringify(categories));
      res.json(categories);
    });
  }

  redisCaching.checkInCache('allCategories', genericCallback, categoriesFunct, res);  
});


/* GET products listing. */
router.get('/products', function(req, res, next) {
  var productsFunct = function(){
    productsSchema.find(function (err, products) {
      if (err)
        return next(err);

      redisCaching.cacheThis('allProducts', JSON.stringify(products));
      res.json(products);
    });
  }

  redisCaching.checkInCache('allProducts', genericCallback, productsFunct, res);  
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
  var usersFunct = function(){
    usersSchema.find(function (err, users) {
      if (err)
        return next(err);

      redisCaching.cacheThis('allUsers', JSON.stringify(users));
      res.json(users);
    });
  }

  redisCaching.checkInCache('allUsers', genericCallback, usersFunct, res);  
});


/* GET shopping cart listing. */
router.get('/shoppingcart', function(req, res, next) {
  var shoppingcartFunct = function(){
    shoppingCartSchema.find(function (err, shoppingcart) {
      if (err)
        return next(err);

      redisCaching.cacheThis('shoppingCart', JSON.stringify(shoppingcart));
      res.json(shoppingcart);
    });
  }

  redisCaching.checkInCache('shoppingCart', genericCallback, shoppingcartFunct, res);    
});


module.exports = router;