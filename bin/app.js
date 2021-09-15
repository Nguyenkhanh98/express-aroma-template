const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressHbs = require('express-handlebars');
const Routes = require('./routers');
const hbsHelper = require('../utils/hbs');

const app = express();

// view engine setup

app.set('views', path.join(__dirname, '..', 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '..', 'public')));

const timesHelper = ('times', (n, block) => {
  let accum = '';
  for (let i = 0; i < n; ++i) accum += block.fn(i);
  return accum;
});
console.log({ ...hbsHelper });
const hbs = expressHbs.create({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: `${__dirname}/../views/layouts/`,
  partialsDir: `${__dirname}/../views/partials/`,
  helpers: { ...hbsHelper },
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
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
