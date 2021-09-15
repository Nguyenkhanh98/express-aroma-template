const Sequelize = require('sequelize');
const {
  Product, Category, ProductSpecification, Specification, Comment, User, Review, ProductColor,
} = require('../database/models');

const { Op } = Sequelize;

module.exports = {
  getTrendingProducts: async () => {
    const data = await Product.findAll({
      order: [['overallReview', 'DESC']],
      limit: 8,
      include: [{ model: Category }],
      raw: true,
      nest: true,
    });
    return data;
  },
  getAll: async (query) => {
    const options = {
      include: [{ model: Category }],
      where: {
        price: {
          [Op.gte]: parseInt(query.min),
          [Op.lte]: parseInt(query.max),
        },
      },
      nest: true,
      raw: true,
    };
    if (query && query.category) {
      options.where.categoryId = query.category;
    }

    if (query && query.brand) {
      options.where.brandId = query.brand;
    }

    if (query && query.color) {
      options.include.push({
        model: ProductColor,
        attributes: [],
        where: {
          colorId: query.color,
        },
      });
    }

    const data = await Product.findAll(options);
    return data;
  },

  getById: async (id) => {
    const product = await Product.findOne({
      where: { id },
      include: [{ model: Category }],
      raw: true,
      nest: true,
    });
    const productSpecifications = await ProductSpecification.findAll({
      where: { productId: id },
      include: [{ model: Specification }],
      raw: true,
      nest: true,
    });
    const comments = await Comment.findAll({
      where: { productId: id, parentCommentId: null },
      include: [{ model: User },
        {
          model: Comment,
          as: 'SubComments',
          include: [{ model: User }],

        },
      ],
    });

    const reviews = await Review.findAll({
      where: { productId: id },
      include: [{ model: User }],
      raw: true,
      nest: true,
    });
    const starsCount = {};
    reviews.forEach((review) => {
      if (starsCount[review.rating]) {
        starsCount[review.rating] += 1;
      } else {
        starsCount[review.rating] = 1;
      }
    });
    product.ProductSpecifications = productSpecifications;
    product.Comments = JSON.parse(JSON.stringify(comments));
    product.Reviews = reviews;
    product.StarsCount = starsCount;

    const toltalRating = reviews.reduce((t, { rating }) => t + rating, 0);
    product.overall = Math.round(toltalRating / reviews.length);
    return product;
  },
};
