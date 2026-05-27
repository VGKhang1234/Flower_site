var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Flower-forever')
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.error("Error connecting to MongoDB", err);
});

var indexRouter = require('./routes/routerindex'); //localhost:3000/
var usersRouter = require('./routes/routerusers'); //localhost:3000/users
var categoriesRouter = require('./routes/routercategories'); //localhost:3000/categories
var productsRouter = require('./routes/routerproducts'); //localhost:3000/products
var ordersRouter = require('./routes/routerorders'); //localhost:3000/orders
var app = express();

// Add MIME type configuration BEFORE serving static files
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
// Define routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter); 
app.use('/img', express.static(path.join(__dirname, 'img')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
module.exports = app;
