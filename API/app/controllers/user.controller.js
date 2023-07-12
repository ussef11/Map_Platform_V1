const db = require("../models");
const User = db.user;
const Role = db.role;
const  Articles = db.articles
const Op = db.Sequelize.Op;

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
    SELECT us.id ,  username as LOGIN , us.name as NOM ,
 ro.name as PROFIL  , email, latitude , longitude  , gsm ,
   LEFT(password ,10) as password from public."users" us inner join user_roles ur on  us.id = ur."userId" 
    inner join roles ro on ro.id = ur."roleId";
    `, { type: db.sequelize.QueryTypes.SELECT })
      .then(results => {
        res.status(200).json(results);
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  };


  exports.DeleteUser  =(req , res) =>{
    User.findOne({
      where:{
        id:req.body.id,
      },
    }).then((user)=>{
      if(!user){
        return res.status(404).send({message:"User Not Found. "});
      }
      User.findByPk(user.id).then((user) =>{
        if(user){
          user.destroy().then(()=>{
            res.send({ message: "User was Deleted successfully! " , user });
          }).catch(()=>{
            res.status(500).send({ message: "Failed  to Deleted successfully! " , user });
          })
        }else{
          res.status(404).send({ message: "User not found" , user });
        }
      }).catch((error)=>{
        res.status(500).json({ error: "Failed to find user" });
      })
    })
  }
  

  exports.UpdatedUser = (req, res) => {
    User.findOne({
      where: {
        id: req.body.id,
      },
    }).then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      User.findByPk(user.id)
        .then((user) => {
          if (user) {
            user.username = req.body.username;
            user.email = req.body.email;
            user.name = req.body.name;
            user.latitude = req.body.latitude;
            user.longitude = req.body.longitude;
            // user.password = req.body.password;
            user.gsm = req.body.gsm;
            // user.password = bcrypt.hashSync(req.body.newpassword, 8);
  
            user.save().then((user) => {
              if (req.body.roles) {
                Role.findAll({
                  where: {
                    name: {
                      [Op.or]: req.body.roles,
                    },
                  },
                }).then((roles) => {
                  user.setRoles(roles).then(() => {
                    res.send({ message: "User was Updated successfully! " , user });
                  });
                });
              } else {
                // user role = 1
                user.setRoles([1]).then(() => {
                  res.send({ message: "User was Updated successfully!" , user});
                });
              }
            })
             
              .catch((error) => {
                // Handle the error
                res.status(500).json({ error: error, userid: user.id });
              });
          } else {
            res.status(404).json({ error: "User not found" });
          }
        })
        .catch((error) => {
          // Handle the error
          res.status(500).json({ error: "Failed to find user" });
        });
    });
  };