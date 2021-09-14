const { Category } = require('../database/models');

module.exports = {
  getAll: async (req, res) => {
    const data = await Category.findAll({
      raw: true,
      nest: true,
    });
    return data;
  },
};
