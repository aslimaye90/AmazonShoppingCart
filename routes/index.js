var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var session = require('express-session');
var categoriesSchema = require('../models/categoriesSchema.js');
var productsSchema = require('../models/productsSchema.js');
var shoppingCartSchema = require('../models/shoppingCartSchema.js');
var pageRenderModule = require('../modules/pageRenderModule.js');
var redisCaching = require('../modules/redisCaching.js');

/* GET home page. */
router.get('/', function(req, res) {
  if(req.session.name){
    pageRenderModule.getHomePage(req,res);
  }
  else
    res.redirect('/login');
});


/* GET all products page. */
router.get('/products', function(req, res) {
  var callbackFunction = function(data){
    if (data == 'xxx'){
      productsSchema.find(function (err, products) {
        productsSchema.populate(products,{path: 'category'},function(err,products){
          if (err)
            return next(err);

          redisCaching.cacheThis('allProductsFull', JSON.stringify(products));
          pageRenderModule.getProductsPage(res,products);
        });
      });
    }
    else{
      pageRenderModule.getProductsPage(res,JSON.parse(data));
    }
  }

  if(req.session.name){
    redisCaching.checkInCache('allProductsFull', callbackFunction);  
  }
  else
    res.redirect('/login');
});


/* GET all categories page. */
router.get('/categories', function(req, res, next) {
  var callbackFunction = function(data){
    if (data == 'xxx'){
      categoriesSchema.find(function (err, categories) {
        if (err)
          return next(err);

        redisCaching.cacheThis('allCategories', JSON.stringify(categories));
        pageRenderModule.getCategoriesPage(res, categories);
      });
    }
    else{
      pageRenderModule.getCategoriesPage(res,JSON.parse(data));
    }
  }
  
  if(req.session.name)
    redisCaching.checkInCache('allCategories', callbackFunction);  
  else
    res.redirect('/login');
});


/*LOGOUT and render login page.*/
router.get('/logout', function(req, res, next){
  req.session.destroy(function(err){
    if(err) 
      console.log(err);
    else{
      //console.log('session name: '+req.session.name);
      res.redirect('/login');
    }
  });
});


module.exports = router;