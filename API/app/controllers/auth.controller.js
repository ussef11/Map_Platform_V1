const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Article = db.articles;
const Interface = db.interface;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");





exports.signup = (req, res) => {
  try {
    User.create({
      username: req.body.username,
      email: req.body.email,
      name: req.body.name,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      gsm: req.body.gsm,
      password: bcrypt.hashSync(req.body.password, 8),
      
     
    })
      .then((user) => {
        if (req.body.roles) {
          Role.findAll({
            where: {
              name: {
                [Op.or]: req.body.roles,
              },
            },
          }).then((roles) => {
              user.setRoles(roles).then(() => {
              // res.send({ message: "User was registered successfully!"  , role:roles[0].name} );
              if(req.body.interface){
                if(roles[0].name === "admin"){
                  Interface.findAll({
                    where :{
                      name :{
                        [Op.or] : req.body.interface,
                      },
                      
                    },
                  }).then((interface)=>{
                      user.setInterfaces(interface  ,{
                        through: {
                          read: req.body.read || true,
                          create: req.body.create || true,
                          delete: req.body.delete || true,
                        }},).then(()=>{ 
                         console.log(interface)
                         res.send({ message: "User was registered successfully!"  , name :user.username} );
                     })
                  })
              }else{
                Interface.findAll({
                  where :{
                    name :{
                      [Op.or] : req.body.interface,
                    },
                  },
                }).then((interface)=>{
                    user.setInterfaces(interface  ,{
                      through: {
                        read: req.body.read || false,
                        create: req.body.create || false,
                        delete: req.body.delete || false,
                      }},).then(()=>{ 
                       console.log(interface)
                       res.send({ message: "User was registered successfully!"  , user} );
                   })
                })
              }
              }else{
                  user.setInterfaces([1,2]  , {
                    through: {
                      read: req.body.read || false,
                      create: req.body.create || false,
                      delete: req.body.delete || false,
                    }}).then(() => {
                  res.send({ message: "User was registered successfully!"  , user});
                });
              }
            
            });
          });
        } else {
          
            //user role = 1
            user.setRoles([1]).then(() => {
              user.setInterfaces([1,2]  , {
                through: {
                  read: req.body.read || false,
                  create: req.body.create || false,
                  delete: req.body.delete || false,
                }}).then(() => {
              res.send({ message: "User was registered successfully!"  , user});
            });
            // res.send({ message: "User was registered successfully!"  , user:user});
          });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};



exports.updatePassword = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      User.findByPk(user.id)
        .then((user) => {
          if (user) {
            // user.email = req.body.email;
            user.password = bcrypt.hashSync(req.body.newpassword, 8);

            user
              .save()
              .then((updatedUser) => {
                // User updated successfully
                res.json(updatedUser);
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
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
