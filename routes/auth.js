var authController = require("../controllers/authcontroller.js");

module.exports = function(app, passport) {
  app.get("/signup", authController.signup);
  app.get("/signin", authController.signin);
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/dashboard",
      failureRedirect: "/signup"
    })
  );

  app.get("/dashboard", isLoggedIn, authController.dashboard);

  app.get("/logout", authController.logout);

  app.post("/signin", passport.authenticate("local-signin"), function(req, res) {
    console.log("!");
    res.json(true);
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/signin");
  }
};
