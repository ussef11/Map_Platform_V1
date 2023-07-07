module.exports = (sequelize, Sequelize) => {
    const Articles = sequelize.define("articles", {
      // id: {
      //   type: Sequelize.INTEGER,
      //   primaryKey: true
      // },
      title: {
        type: Sequelize.STRING
      },
      content: {
        type:Sequelize.TEXT
      }
    });
  
    return Articles;
  };