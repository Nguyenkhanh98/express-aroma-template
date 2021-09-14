require('dotenv').config();

const PG = {
  port: process.env.PORT || 5432,
  db: process.env.PG_DB || 'shopping',
  host: process.env.PG_HOST || 'localhost',
  userName: process.env.PG_USERNAME || 'dev',
  password: process.env.PG_PASSWORD || 'dev',
  dialect: process.env.PG_DIALECT || 'postgres',
  dialectOptions: {
    ssl: process.env === 'development' ? {
      require: true,
      rejectUnauthorized: false,
    } : true,
  },
};

const PG_URL = `postgres://${PG.userName}:${PG.password}@${PG.host}:${PG.port}/${PG.db}`;

module.exports = {
  PG,
  PG_URL,
};
