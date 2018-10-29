var db = require("../models");
var cloudinary = require("cloudinary");

require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

module.exports = function(app) {
  // send a sketch item to cloudinary, and return the image's url to front end.
  app.post("/api/sketch", function(req, res) {
    var paint = req.body.paint;
    cloudinary.uploader.upload(paint, function(result) {
      console.log(result);

      res.json(result.url);
    });
  });

  // GET route for all entries by user
  app.get("/api/entries/user/:userId", function(req, res) {
    const query = {
      UserId: req.params.userId
    };

    db.Entry.findAll({
      where: query
    }).then(function(entries) {
      res.json(entries);
    });
  });

  // GET route for one entry (used for edits)
  app.get("/api/entries/:id", function(req, res) {
    db.Entry.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(entry) {
      res.json(entry);
    });
  });

  // POST route for entries
  app.post("/api/entries", function(req, res) {
    /* req.body should contain the following:
    req.body.UserId: the ID of the user
    req.body.contents: the HTML content of the entry
    req.body.title: the title of the entry */
    db.Entry.create(req.body).then(function(response) {
      res.json(response);
    });
  });

  // PUT route for entries
  app.put("/api/entries", function(req, res) {
    /* req.body should contain the following:
    req.body.id: the ID of the entry
    req.body.contents: the HTML content of the entry
    req.body.title: the title of the entry */
    db.Entry.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(response) {
      res.json(response);
    });
  });

  // DELETE route for entries
  app.delete("/api/entries/:id", function(req, res) {
    db.Entry.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(response) {
      res.json(response);
    });
  });
};
