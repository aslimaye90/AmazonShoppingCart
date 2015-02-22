var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//manually added vars below
var mongoose = require('mongoose');
var session = require('express-session');

var routes = require('./routes/index');
var login = require('./routes/login');
var shoppingcart = require('./routes/shoppingcart');
var allGetRoutes = require('./routes/allGetRoutes');

var app = express();

//mongodb connection
/*mongoose.connect('mongodb://localhost/testDB');*/
mongoose.connect('mongodb://localhost/testDB', function(err) {
    if(err) {
        console.log('database connection error', err);
    } else {
        console.log('database connection successful');
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.png'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//manually added app.use below
app.use(session({
  secret: 'pq9wnv98qn5nygpvy489',
  resave: true,
  saveUninitialized: true
}))
app.use('/', routes);
app.use('/login', login);
app.use('/shoppingcart', shoppingcart);
app.use('/get', allGetRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('pages/error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('pages/error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
