const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/all", controller.allAccess);

  app.get(
    "/api/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/getalluser",
    [authJwt.verifyToken,authJwt.isAdmin],
    controller.getAlldata
  )

  app.post(
    "/add" ,
    [authJwt.verifyToken , authJwt.isAdmin],
    controller.addData
  )


  app.get(
    "/api/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.post("/api/admin/UpdatedUser",  [authJwt.verifyToken , authJwt.isAdmin], controller.UpdatedUser);
  app.post("/api/admin/DeleteUser",  [authJwt.verifyToken , authJwt.isAdmin], controller.DeleteUser);
};