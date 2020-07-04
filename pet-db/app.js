var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

<<<<<<< HEAD
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var shopRouter = require('./routes/shop');

require('./dao/db.js');
=======
var adminRouter = require('./routes/admin');
var userRouter = require('./routes/user');
require('./dao/db.js')
const jwtAuth = require('./utils/authToken')
>>>>>>> b6fcaa6f2bb0b0f63893a53447c0cba1ba5c495a
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
<<<<<<< HEAD

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/shop',shopRouter);
=======
// app.use(jwtAuth);
app.use('/admin', adminRouter);
app.use('/user', userRouter);

>>>>>>> b6fcaa6f2bb0b0f63893a53447c0cba1ba5c495a
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
