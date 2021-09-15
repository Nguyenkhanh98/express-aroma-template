const { Product, Category } = require('../database/models');

module.exports = {
  getTrendingProducts: async (req, res) => {
    const data = await Product.findAll({
      order: [['overallReview', 'DESC']],
      limit: 8,
      include: [{ model: Category }],
      raw: true,
      nest: true,
    });
    return data;
  },
  getAll: async (req, res) => {
    const data = await Product.findAll({
      order: [['overallReview', 'DESC']],
      include: [{ model: Category }],
      raw: true,
      nest: true,
    });
    return data;
  },
};
