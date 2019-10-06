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
    var concert = process.argv[3];
    concertThis();
    break;
  case "movie-this":
    var movie = process.argv[3];
    movieThis();
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  default: console.log("\n" + "liri.js" + " <command>" + "\n" +
    "<spotify-this-song>" + " song" + "\n" +
    "<concert-this>" + " concert" + "\n" +
    "<movie-this>" + " movie" + "\n" +
    "<do-what-it-says>" + "\n\n");
}
/*
 1. `node liri.js concert-this <artist/band name here>`
   * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

     * Name of the venue
     * Venue location
     * Date of the Event (use moment to format this as "MM/DD/YYYY")
*/

function concertThis() {
  axios.get("https://rest.bandsintown.com/artists/" + option + "/events?app_id=codingbootcamp").then(
    function (response) {
      console.log(response.data[0]);

    })
    .catch(function (error) {
      console.log(error);
    });
}

function spotifySong() {

  if (!option) {
    option = "The Sign";
    artist = "Ace of Base";
  }
  spotify.search({ type: 'track', query: option, limit: 1 }, function (err, data) {
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
  if (!option) {
    option = "Mr. Nobody";
  }
  axios.get("http://www.omdbapi.com/?t=" + option + "&y=&plot=short&apikey=trilogy").then(
    function (response) {
      // assign data root
      var mr = response.data;
      //  log out relevant data
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


console.log("Hello??");