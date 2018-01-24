var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
let connection = require('./mongooseSetUp');
var index = require('./serverConfig/index');
var users = require('./ozModules/mUrp/routes/users');
let roles = require('./ozModules/mUrp/routes/roles');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Check headers config
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Acces-Control-Allow-Headers', 'X-Api-key, Origin, X-Requesed-With, Content-Type, Accept, Acces-Control-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS, POST, DELET');
  res.header('Allow', 'GET, PUT, OPTIONS, POST, DELET');
  next();
});

app.use('/', index);
app.use('/users', users);
app.use('/roles', roles);

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
app.conection = connection;

module.exports = app;

