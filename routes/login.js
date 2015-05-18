var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var usersSchema = require('../models/usersSchema.js');
var pageRenderModule = require('../modules/pageRenderModule.js');

/* GET login page. */
router.get('/', function(req, res) {
  pageRenderModule.getLoginPage(res);
});

/*check login credentials and act accordingly*/
router.post('/', function(req, res) {
  usersSchema.find({userId : req.body.userId},function (err, users) {
    
    if (err) return next(err);
    
    if(users.length==0){
	  console.log('userId/pass combination incorrect');
	  res.render('pages/login', {title: 'Login'});
	}
	else{
		
		if(users[0].password==req.body.inputPassword){
			console.log('login successful!');
			req.session.name=users[0].name;
			res.redirect('/');
		}
		else{
			console.log('userId/pass combination incorrect');
	  		res.redirect('/login');
		}
    }
  });
});

module.exports = router;