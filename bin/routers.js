const indexRouter = require('../routes/index');
const blogsRouter = require('../routes/blogs');
const productsRoute = require('../routes/products');
const categoriesRoute = require('../routes/categories');

module.exports = (app) => {
  app.use('/blogs', blogsRouter);
  app.use('/products', productsRoute);
  app.use('/category', categoriesRoute);
  app.use('/', indexRouter);
};
