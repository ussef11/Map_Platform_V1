const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
var DataTypes = require('sequelize/lib/data-types');

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.articles = require("../models/articles.model.js")(sequelize , Sequelize);
db.interface = require("../models/interface.model.js")(sequelize, Sequelize);


db.role.belongsToMany(db.user, {
  through: "user_roles"
});
db.user.belongsToMany(db.role, {
  through: "user_roles"
});



// db.interface.belongsToMany(db.user ,{
//   through : "user_interface"
// })

// db.user.belongsToMany(db.interface ,{
//   through : "user_interface"
// })

const user_interface = sequelize.define('user_interfaces', {
  read: DataTypes.BOOLEAN,
  create: DataTypes.BOOLEAN,
  delete: DataTypes.BOOLEAN
});
db.interface.belongsToMany(db.user , { through: user_interface });
db.user.belongsToMany(db.interface , { through: user_interface });



db.user.hasMany(db.articles, {
  foreignKey: 'userId' // Foreign key column in the articles table referencing the users table
});

db.articles.belongsTo(db.user, {
  foreignKey: 'userId' // Foreign key column in the articles table referencing the users table
});

db.ROLES = ["user", "admin", "moderator"];
db.INTERFACE = ["TEMPS REEL", "HISTORIQUE", "DIAGNOSTIQUE"];

module.exports = db;