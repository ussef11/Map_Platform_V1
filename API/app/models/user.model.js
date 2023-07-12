module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      
      username: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },    
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      latitude:{
        type :Sequelize.STRING
      },
      longitude:{
        type: Sequelize.STRING
      },
      gsm:{
        type: Sequelize.STRING
      },
    });
  
    return User;
  };