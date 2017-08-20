//variables to call the information from the keys.js file which stores the twitter access keys needed for the twitter option of this app
var keys = require('./keys.js');
var twitterKeys = keys.twitterKeys;

//sets up the variables of all of the different things required to properly run this node app
var fs = require('fs');
var prompt = require('prompt');
var Twitter = require('twitter');
var Spotify = require('spotify');
var request = require('request');
var colors = require("colors/safe");

//takes in the user input that calls the option you want
var userInput = '';

// //takes in the user input for the spotify & movie options
var userSelection = '';

//options that the user can choose from
var myTweets = 'tweets';
var songs = 'spotify-this-song';
var movies = 'movie';
var doWhat = 'surprise';