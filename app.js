var createError = require('http-errors');
var express = require('express');
var path = require('path');   //   core Node library for parsing file and directory paths.
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');  //   required modules from routes directory 
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');  //Import routes for "catalog" area of site
var compression = require('compression');
var helmet = require('helmet');

var app = express();    //  create express app  


//Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb+srv://ryanfloyd:I58lwYkeH27HZGPy@cluster0-yrb7s.mongodb.net/local_library?retryWrites=true&w=majority';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// view engine setup --> use app to set up the view (template) engine
app.set('views', path.join(__dirname, 'views'));    //  we set the 'views' value to specify the folder where the templates will be stored (in this case the subfolder /views)
app.set('view engine', 'pug');    //  set the 'view engine' value to specify the template library (in this case "pug")


//  add middleware libraries
app.use(helmet());
app.use(compression()); //Compress all routes 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));  //  static middleware to serve static files, like css, images, javascript files  


//   adds route-handling code to the request handling chain. The imported code will define particular routes for the different parts of the site
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);  // Add catalog routes to middleware chain.


/*  Middleware for error handling   */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
}); 



// error handler. errors handeled at the end, so any next's resolve here 
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//  The Express application object (app) is now fully configured. The last step is to add it to the module exports (this is what allows it to be imported by /bin/www).
module.exports = app;
