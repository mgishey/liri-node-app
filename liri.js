// Set up Enviroment
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
//let spotId = spotify.credentials.id;
//let spotSecret = spotify.credentials.secret;
 
spotify.search({ type: 'track', query: 'i want it that way', limit: 1}, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 

console.log(data.tracks.items);

});


console.log("Hello??");