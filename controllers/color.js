const { Color, ProductColor, Product } = require('../database/models');

module.exports = {
  getAll: async (query) => {
    const options = {
      include: [{
        model: ProductColor,
        include: [{
          model: Product,
          where: {},
        }],
      }],
      where: {},
    };
    if (query && query.category) {
      options.include[0].include[0].where.categoryId = query.category;
    }

    if (query && query.brand) {
      options.include[0].include[0].where.brandId = query.brand;
    }

    const rows = await Color.findAll(options);
    return rows.map((r) => r.dataValues);
  },
};
