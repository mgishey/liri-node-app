// Set up Enviroment for spotify
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var option = process.argv[3];
const axios = require("axios");

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
  default: console.log("\n" + "liri.js" + " <command>" + "\n" +
    "<spotify-this-song>" + "\n" +
    "<concert-this>" + "\n" +
    "<movie-this>" + "\n" +
    "<do-what-it-says>" + "\n\n");
}

function spotifySong() {
  var songName = process.argv[3];
  if (!songName) {
    songName = "The Sign";
    artist = "Ace of Base";
  }
  spotify.search({ type: 'track', query: songName, limit: 1 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    // variable for root of search
    var rs = data.tracks.items[0];
    //console.log(rs);
    console.log("Artist(s): " + rs.artists[0].name);
    console.log("Song: " + rs.name);
    console.log("Preview URL: " + rs.preview_url);
    console.log("Album: " + rs.album.name);

  });
}

function movieThis() {
  var movie = process.argv[3];
  axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
    function (response) {
      //console.log(response);
      var mr = response.data;
      console.log(mr);
      /*
      * Title of the movie.
         * Year the movie came out.
         * IMDB Rating of the movie.
         * Rotten Tomatoes Rating of the movie.
         * Country where the movie was produced.
         * Language of the movie.
         * Plot of the movie.
         * Actors in the movie. */
        
      console.log("Title: " + mr.Title);
      console.log("Rating: " + mr.imdbRating);
      console.log("Rotten Tomatoes Rating: " + mr.Ratings[1].Value);
      console.log("Country Where Produced: " + mr.Country);
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}
console.log("Hello??");