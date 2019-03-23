var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

//Specifiy default engine as handlebars
app.set("view engine", "handlebars");
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);

// Connect to the Mongo DB

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraperdb";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// build database data from scraped youtube data
axios.get("https://www.youtube.com").then(function(response) {
  // Load the Response into cheerio and save it to a variable
  var $ = cheerio.load(response.data);

  // An empty array to save the data that we'll scrape
  $("h3").each(function(i, element) {
    var video = {};
    video.title = $(this).text();
    video.url = $(this)
      .children("a")
      .attr("href");
    if (video.url !== undefined) {
      video.youtubeID = video.url.slice(9, video.url.length);
      // Create a new video in the database
      db.Video.create(video).catch(function(err) {
        console.log(err);
      });
    }
  });
});

// Routes
app.get("/", function(req, res) {
  // load all new videos and playlist videos
  db.Video.find({})
    .then(function(video) {
      db.Playlist.find({})
        .then(function(playlists) {
          res.render("index", { video, playlists });
        })
        .catch(function(err) {
          console.log(err);
        });
    })
    .catch(function(err) {
      console.log(err);
    });
});

app.post("/playlist", function(req, res) {
  console.log(req.body);
  db.Playlist.create(req.body)
    .then(function() {
      res.redirect("/");
    })
    .catch(function(err) {
      console.log(err);
    });
});

app.post("/playlist/:id", function(req, res) {
  db.Playlist.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { list: req.body.videoId } }
  )
    .then(function() {
      console.log(list);
    })
    .catch(function(err) {
      console.log(err);
    });
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!" + " http://localhost:3000/");
});
