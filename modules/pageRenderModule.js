var productsSchema = require('../models/productsSchema.js');

/*GET home page*/
exports.getHomePage = function(req,res){
	res.render('pages/index', 
    	{ 
    		title: 'Home',
    		name: req.session.name,
    		page: 'Your Home page'
    });
}

/*GET products page*/
exports.getProductsPage = function(res, products){
	res.render('pages/products',
        { 
          title: 'Products', 
          data : products
      });
}

/*GET categories page*/
exports.getCategoriesPage = function(res, categories){
	res.render('pages/categories',
      { 
        title: 'Categories', 
        data : categories
      });
}

/*GET login page*/
exports.getLoginPage = function(res){
	res.render('pages/login', 
    {
      title: 'Login'
    });
}

/*GET shopping cart page*/
exports.getShoppingCartPage = function(res, cartdata){
	res.render('pages/shoppingcart',
        { 
          title: 'Shopping Cart', 
          data : cartdata
        });
}