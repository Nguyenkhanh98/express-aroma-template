const indexRouter = require('../routes/index');
const blogsRouter = require('../routes/blogs');
const productsRoute = require('../routes/products');
const categoriesRoute = require('../routes/categories');
const cartRouter = require('../routes/cartRouter');
const commentRouter =  require('../routes/commentRouter');
const reviewRouter = require('../routes/reviewRouter');
const usersRouter = require('../routes/usersRouter');

module.exports = (app) => {
  app.use('/blogs', blogsRouter);
  app.use('/products', productsRoute);
  app.use('/category', categoriesRoute);
  app.use('/', indexRouter);
  app.use('/cart', cartRouter);
  app.use('/comments', commentRouter);
  app.use('/reviews', reviewRouter);
  app.use('/users', usersRouter);
};
