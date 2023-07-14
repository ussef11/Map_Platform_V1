module.exports = (sequelize, Sequelize) => {
  const Interface = sequelize.define("interfaces", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    parent: {
      type: Sequelize.INTEGER,
      
    },
    type: {
      type: Sequelize.STRING,
    },
    icon: {
      type: Sequelize.STRING,
    },
  
  });

  return Interface;
};

