const db = require("../models");

const  Articles = db.articles


exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };
  exports.addData = (req, res) => {
    const { title, content, userId } = req.body;
  
    Articles.create({
      title: title,
      content: content,
      userId: userId
    })
      .then(() => {
        res.status(200).json({ message: "Data added successfully",userId });

      })
      .catch(err => {
        res.status(500).json({ message: err.message , userId });
      });
  }
  

  exports.getAlldata = (req, res) => {
    db.sequelize.query(`
    SELECT username  ,password, ro.name from public."users" us inner join user_roles ur on  us.id = ur."userId" 
    inner join roles ro on ro.id = ur."roleId";
    `, { type: db.sequelize.QueryTypes.SELECT })
      .then(results => {
        res.status(200).json(results);
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  };
  