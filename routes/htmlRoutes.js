//var db = require("../models");
var path = require("path");

module.exports = function(app) {
  //load login page
  app.get("/login", function(req, res) {
    if (!req.user) {
      res.sendFile(path.join(__dirname, "../public/login.html"));
    } else {
      res.redirect("/");
    }
  });

  // Load index page
  app.get("/", function(req, res) {
    if (req.user) {
      res.sendFile(path.join(__dirname, "../public/main.html"));
    } else {
      res.redirect("/login");
    }
  });

  //load entry page
  app.get("/entry", function(req, res) {
    if (req.user) {
      res.sendFile(path.join(__dirname, "../public/entry.html"));
    } else {
      res.redirect("/login");
    }
  });
};
