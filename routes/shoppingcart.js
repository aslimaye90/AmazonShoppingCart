var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var session = require('express-session');
var shoppingCartSchema = require('../models/shoppingCartSchema.js');
var pageRenderModule = require('../modules/pageRenderModule.js');

/* GET shopping cart page. */
router.get('/', function(req, res, next) {
  if(req.session.name){
    shoppingCartSchema.find(function(err,cartdata){
      shoppingCartSchema.populate(cartdata,{path: 'productId'},function(err,cartdata){
        pageRenderModule.getShoppingCartPage(res, cartdata);
      });
    });
  }
  else
    res.redirect('/login');
});

/* ADD item to shopping cart. */
router.post('/', function(req, res, next) {
  shoppingCartSchema.find({productId: req.body.id}, function(err,found){
    if(found.length==0){
      var item = new shoppingCartSchema({productId: req.body.id, quantity: 1});
      item.save(function (err) {
        if (err) 
          return err;
        else
          console.log("Item added to cart successfully!");
      });
    }
    else
      console.log('item already exists');
  });
  res.redirect('/products');
});


/* DELETE shopping cart item. */
router.post('/delete', function(req, res, next) {
  shoppingCartSchema.remove({productId: req.body.id},function(err,doc){
    if(err)
      return err;
    else{
      console.log('Item removed successfully!');
      res.redirect('/shoppingcart');
    }
  });
});



/* INCREMENT item count in shopping cart. */
router.post('/inc', function(req, res, next) {
  shoppingCartSchema.findOne({productId: req.body.id},function(err,doc){
    if(err)
      return err;
    else{
      doc.productId=req.body.id;
      doc.quantity=parseInt(req.body.quantity)+1;
      doc.save();
    }
    res.redirect('/shoppingcart');
  });
});



/* DECREMENT item count in shopping cart. */
router.post('/dec', function(req, res, next) {
  shoppingCartSchema.findOne({productId: req.body.id},function(err,doc){
    if(err)
      return err;
    else{
      doc.productId=req.body.id;
      doc.quantity=parseInt(req.body.quantity)-1;
      doc.save();
    }
    res.redirect('/shoppingcart');
  });
});


module.exports = router;