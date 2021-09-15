const { Category, Product } = require('../database/models');

module.exports = {
  getAll: async (req, res) => {
    const rows = await Category.findAll({
      include: [{ model: Product }],
    });
    return rows.map((r) => r.dataValues);
  },
};
