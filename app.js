var express = require('express');
var ejs = require('ejs'); 
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes_path = "./src/routes";

var home = require(routes_path+'/home');
var music = require(routes_path+'/music');
var folder = require(routes_path+'/folder');
var article = require(routes_path+'/article');
// var weibo = require('./routes/weibo');

var app = express();
var expressWs = require('express-ws')(app);

// view engine setup
app.set('views',  __dirname + "/view");
app.set( 'view engine', 'ejs' );
app.engine( '.html', ejs.__express );
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'view')));

app.use('/', home);
app.use('/music', music);
app.use('/folder', folder);
app.use('/article', article);
// app.use('/weibo', weibo);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
