// Set up Enviroment
require("dotenv").config();
var keys = require("./keys.js");
var spotify = newSpotify(keys.spotify);

var nodeArgs = process.argv;

console.log("nodeArgs is: " + nodeArgs);