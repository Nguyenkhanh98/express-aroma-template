const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
let bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
const Routes = require('./routers');
const hbsHelper = require('../utils/hbs');
let Cart = require('../controllers/cartController');
let session = require('express-session');


const app = express();

// view engine setup

app.set('views', path.join(__dirname, '..', 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '..', 'public')));

const hbs = expressHbs.create({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: `${__dirname}/../views/layouts/`,
  partialsDir: `${__dirname}/../views/partials/`,
  helpers: { ...hbsHelper },
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  cookie: { httpOnly: true, maxAge: null },
  secret: '53cret',
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  res.locals.totalQuantity = cart.totalQuantity;
  req.session.cart = cart;
  res.locals.fullname = req.session.user ? req.session.user.fullname : '';
  res.locals.isLoggedIn = req.session.user ? true : false;
  next();
});

Routes(app);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
