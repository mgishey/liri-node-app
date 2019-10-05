// Set up Enviroment for spotify
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var option = process.argv[3];

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
  spotify.search({ type: 'track', query: option, limit: 1 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    // variable for root of search
    var rs = data.tracks.items[0];
    if (rs === undefined) {
      console.log("No song by that name!");
      //insert code to go here for snagging "The Sign"
    } else {
      console.log(rs);
      console.log("Artist(s): " + rs.artists[0].name);
      console.log("Song: " + rs.name);
      console.log("Preview URL: " + rs.preview_url);
      console.log("Album: " + rs.album.name);
    }
  });
}


console.log("Hello??");