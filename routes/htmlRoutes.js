//var db = require("../models");
var path = require("path");

module.exports = function(app) {
  //load login page
  app.get("/login", function(req, res){
    res.sendFile(path.join(__dirname, "/public/login.html"))
  })  

  // Load index page
  app.get("/index", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  //load entry page
  app.get("/entry", function(req,res){
    res.sendFile(path.join(__dirname, "../public.entry.html"));
  });

  

  //app.get("/", function(req, res) {
    //res.sendFile({}).then(function(dbExamples) {
      //res.render("index", {
        msg: //"Welcome!",
        //examples: dbExamples
      //});
    //});
  //});

  // Load example page and pass in an example by id
  //app.get("/example/:id", function(req, res) {
    //db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      //res.render("example", {
        //example: dbExample
      //});
    //});
  //});

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
