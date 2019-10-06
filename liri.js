// Set up Enviroment for spotify
require("dotenv").config();
var fs = require("fs");
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
    "<spotify-this-song>" + " song" + "\n" +
    "<concert-this>" + " concert" + "\n" +
    "<movie-this>" + " movie" + "\n" +
    "<do-what-it-says>" + "\n\n");
}

/*
4. `node liri.js do-what-it-says`

  * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

  * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

  * Edit the text in random.txt to test out the feature for movie-this and concert-this.
*/

function doWhatItSays() {

  fs.readFile("random.txt", "utf8", function (error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    // We will then print the contents of data
    console.log(data);

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(", ");

    // We will then re-display the content as an array for later use.
    console.log(dataArr);
  });
}

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
        console.log("\n\n");

      })
      .catch(function (error) {
        console.log(error);
      });
  }
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