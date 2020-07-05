var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');




var shopRouter = require('./routes/shop');
var adminRouter = require('./routes/admin');
var userRouter = require('./routes/user');
var myseverRouter = require('./routes/mysever');
var goodRouter = require('./routes/good');
var testRouter = require('./routes/test');

require('./dao/db.js')
const jwtAuth = require('./utils/authToken')
var app = express();





app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




// app.use(jwtAuth);
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/mysever', myseverRouter);


app.use('/good', goodRouter);

app.use('/shop', shopRouter);
app.use('/test', testRouter);



app.use(function (req, res, next) {
  next(createError(404));
});


app.use(function (err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
