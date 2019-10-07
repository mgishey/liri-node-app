// Set up Enviroment
require("dotenv").config();

// Variables
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var option = process.argv[3];
const axios = require("axios");

// Swith statement to determine which function to run
switch (command) {
  case "spotify-this-song":
    spotifySong();
    break;
  case "concert-this":
    concertThis();
    break;
  case "movie-this":
    movieThis();
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  default: console.log("USAGE:")
    console.log("\n" + "liri.js" + " <command>" + "\n" +
      "<spotify-this-song>" + " song" + "\n" +
      "<concert-this>" + " concert" + "\n" +
      "<movie-this>" + " movie" + "\n" +
      "<do-what-it-says>" + "\n\n");
}


// Function to read the random.txt file for commands and arguments
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    option = dataArr[1];
    option = option.replace(/"/g, "");
    spotifySong();
  });
}

// Function to list concerts for a particular band/artist
function concertThis() {
  if (!option) {
    console.log("Enter a band or artist");
  } else {
    axios.get("https://rest.bandsintown.com/artists/" + option + "/events?app_id=codingbootcamp").then(
      function (response) {
        console.log("**** Upcoming Concerts for " + option + " ****");
        var cr = response.data;
        for (i = 0; i < cr.length; i++) {
          console.log((i + 1) + ":");
          console.log("Venue: " + cr[i].venue.name);
          console.log("City: " + cr[i].venue.city + ", " + cr[i].venue.country);
          var dateStr = cr[i].datetime.slice(0, 10);
          dateArr = dateStr.split("-");
          console.log("Date: " + dateArr[1] + "-" + dateArr[2] + "-" + dateArr[0]);
          console.log("---------------------");
        }
        console.log("*** " + i + " " + option + " concerts found ***");
        console.log("\n\n");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

// Function to list information for a certain song
function spotifySong() {
  if (!option) {
    option = "The Sign";
    artist = "Ace of Base";
  }
  spotify.search({ type: 'track', query: option, limit: 10 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var rs = data.tracks.items;
    console.log("**** Displaying results for " + option + "****");
    console.log("length: " + rs.length);
    for (i = 0; i < rs.length; i++) {
      console.log((i + 1) + ":");
      console.log("Artist(s): " + rs[i].artists[0].name);
      console.log("Song: " + rs[i].name);
      console.log("Preview URL: " + rs[i].preview_url);
      console.log("Album: " + rs[i].album.name);
      console.log("--------------")
    }
  });
}

function movieThis() {
  if (!option) {
    option = "Mr. Nobody";
    console.log("***If you haven't watched 'Mr. Nobody', then you should: <http://www.imdb.com/title/tt0485947>");
    console.log("It's on Netlix!***" + "\n");
  }
  axios.get("http://www.omdbapi.com/?t=" + option + "&y=&plot=short&apikey=trilogy").then(
    function (response) {
      var mr = response.data;
      console.log("Title: " + mr.Title);
      console.log("Rating: " + mr.imdbRating);
      console.log("Rotten Tomatoes Rating: " + mr.Ratings[1].Value);
      console.log("Country Where Produced: " + mr.Country);
      console.log("Language: " + mr.Language);
      console.log("Plot: " + mr.Plot);
      console.log("Actors: " + mr.Actors + "\n\n\n");
    })
    .catch(function (error) {
      console.log(error);
    });
}
