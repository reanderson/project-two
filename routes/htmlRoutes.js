//var db = require("../models");
var path = require("path");

module.exports = function(app) {
  //load login page
  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Load index page
  app.get("/index", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  //load entry page
  app.get("/entry", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/entry.html"));
  });
};
