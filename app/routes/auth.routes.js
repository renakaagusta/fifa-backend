const { verifySignUp, authJwt, verifyAdminToken } = require("../middlewares");
const controller = require("../controllers/auth.controller");


module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, auth-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/v1/auth", [authJwt.isAdmin, verifyAdminToken.checkToken], controller.index);
    app.post(
        "/api/v1/auth/signup", [
            verifySignUp.checkDuplicateUsernameOrEmail
        ],
        controller.signup
    );
    app.post("/api/v1/auth/signin", controller.signin);
    app.get("/api/v1/auth/:id/confirm-email/", controller.confirmEmail);
    app.put("/api/v1/auth/:id/grant-admin", [authJwt.isAdmin, verifyAdminToken.checkToken], controller.makeAdmin);
};