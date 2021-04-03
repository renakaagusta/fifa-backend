const { authJwt } = require("../middlewares");
const controller = require("../controllers/player.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/v1/player/all", [authJwt.verifyToken], controller.index);
    app.get("/api/v1/player/page/:page", [authJwt.verifyToken], controller.indexByPage);
    app.get("/api/v1/player/:id", [authJwt.verifyToken], controller.view);
    app.post(
        "/api/v1/player", [authJwt.verifyToken, authJwt.isAdmin],
        controller.create
    );
    app.post(
        "/api/v1/player/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.update
    );
    app.delete(
        "/api/v1/player/:id", [authJwt.verifyToken, authJwt.isAdmin],
        controller.delete
    );
};