const dbConfig = require('../db/db_connect');
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
sequelize
  .authenticate()
  .then(() => {
    console.log("sequelize database connected");
  })
  .catch((error) => {
    console.log("Error", error);
  });


const db = {};

(db.sequelize = sequelize)

db.products = require('../Models/Product.model')(sequelize, DataTypes);
db.users = require('../Models/User.model')(sequelize, DataTypes);
db.logs = require('../Models/Log.model')(sequelize, DataTypes);

db.sequelize.sync({ force: false }).catch((e) => {
    return e;
}); 

module.exports = db;
module.exports.Sequelize = sequelize;