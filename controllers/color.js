const { Color, ProductColor } = require('../database/models');

module.exports = {
  getAll: async (req, res) => {
    const rows = await Color.findAll({
      include: ProductColor,
    });
    return rows.map((r) => r.dataValues);
  },
};
