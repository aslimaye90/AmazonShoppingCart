var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var session = require('express-session');
var categoriesSchema = require('../models/categoriesSchema.js');
var productsSchema = require('../models/productsSchema.js');
var shoppingCartSchema = require('../models/shoppingCartSchema.js');
var pageRenderModule = require('../modules/pageRenderModule.js');

/* GET home page. */
router.get('/', function(req, res) {
  if(req.session.name){
    pageRenderModule.getHomePage(req,res);
  }
  else
    res.redirect('/login');
});


/* GET products page. */
router.get('/products', function(req, res) {
  if(req.session.name){
    productsSchema.find(function(err,products){
      productsSchema.populate(products,{path: 'category'},function(err,products){
        pageRenderModule.getProductsPage(res,products);
      });
    });
  }
  else
    res.redirect('/login');
});


/* GET categories page. */
router.get('/categories', function(req, res, next) {
  if(req.session.name){
    categoriesSchema.find(function (err, categories) {
      if (err) return next(err);
      pageRenderModule.getCategoriesPage(res, categories);
    });
  }
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