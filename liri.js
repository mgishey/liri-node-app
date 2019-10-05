// Set up Enviroment for spotify
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
 
  // variable for root of search
var rs = data.tracks.items[0];
//console.log(rs);

console.log(rs.album.name);
console.log(rs.artists[0].name);
console.log(rs.name);
console.log(rs.preview_url);


});


console.log("Hello??");