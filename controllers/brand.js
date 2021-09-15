const { Brand, Product, ProductColor } = require('../database/models');
const product = require('../database/models/product');

module.exports = {
  getAll: async (query) => {
    const options = {
      include: [{ model: Product, where: {} }],
      where: {},
    };

    if (query && query.category) {
      options.include[0].where = {
        categoryId: query.category,
      };
    }
    if (query && query.color) {
      options.include[0].include = [{
        model: ProductColor,
        where: { colorId: query.color },
      }];
    }

    const rows = await Brand.findAll(options);
    return rows.map((row) => row.dataValues);
  },
};
