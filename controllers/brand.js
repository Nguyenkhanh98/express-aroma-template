const { Brand, Product } = require('../database/models');

module.exports = {
  getAll: async (req, res) => {
    const rows = await Brand.findAll({
      include: [{ model: Product }],
    });
    return rows.map((row) => row.dataValues);
  },
};
