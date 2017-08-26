var keys = require('./keys.js');

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var request = require('request');

var fs = require('fs');

var action = process.argv[2];

var value = process.argv[3];

var spotify = new Spotify(keys.spotifyKeys);

var client = new Twitter(keys.twitterKeys);

switch (action) {
    case 'my-tweets' :
      MyTweets();
      break;
    case 'spotify-this-song':
      spotifythissong();
      break;
    default:
    case 'movie-this':
      movieThis();
      break;
   	case "do-what-it-says":
	  dowhatitsays();
	  break;	
}

//twitter function

function MyTweets() {

  var params = { screen_name: 'rdronam', count: 20};

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
	if (!error) {
      for (var i = 0; i < tweets.length; i++) {
       console.log(tweets[i].created_at);
       console.log(' ');
       console.log(tweets[i].text);
   }
    }
  });
}

// spotify function 

function spotifythissong() {
	if (!value)  {
		// The Sign by Ace of Base
		spotify
			.request('https://api.spotify.com/v1/tracks/3DYVWvPh3kGwPasp7yjahc')
			.then(function(data) {
				console.log('Artist: ' + data.album.artists[0].name);
				console.log('Song Name: ' + data.name);
				console.log('Preview Link: ' + data.preview_url);
				console.log('Album Name: ' + 	data.album.name);
			})
			.catch(function(err) {
				console.error('Error occurred: ' + err); 
			});
		}
	else {
		//Manual Song Search
		spotify
			.search({ type: 'track', query: value, limit: 1 })
			.then(function(response) {
				console.log('Artist: ' + response.tracks.items[0].album.artists[0].name);
				console.log('Song Name: ' + response.tracks.items[0].name);
				console.log('Preview Link: ' + response.tracks.items[0].preview_url);
				console.log('Album Name: ' + response.tracks.items[0].album.name);
			})
			.catch(function(err) {
				console.log(err);
			});
	}
}

// imdb search
function movieThis() {
	if (!value) {
    value = "Mr Nobody";
  }
  var urlHit = "http://www.omdbapi.com/?t=" + value + "&y=&plot=full&tomatoes=true&apikey=40e9cece";
  request(urlHit, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var jsonData = JSON.parse(body);
      console.log("Title: " + jsonData.Title);
      console.log("Year: " + jsonData.Year);
      console.log("Rated: " + jsonData.Rated);
      console.log("IMDB Rating: " + jsonData.imdbRating);
      console.log("Country: " + jsonData.Country);
      console.log("Language: " + jsonData.Language);
      console.log("Plot: " + jsonData.Plot);
      console.log("Actors: " + jsonData.Actors);
      console.log("Rotton Tomatoes URL: " + jsonData.tomatoURL);
    }
  });
}

//random.txt flie

function dowhatitsays() {
	fs.readFile('random.txt', "utf8", (err, data) => {
		var dataArr = data.trim().split(',');
		process.argv[2] = dataArr[0];
		process.argv[3] = dataArr[1];
		console.log(dataArr[0]);
		console.log(dataArr[1]);
		spotify
			.search({ type: 'track', query: dataArr[1], limit: 1 })
			.then(function(response) {
				console.log('Artist: ' + response.tracks.items[0].album.artists[0].name);
				console.log('Song Name: ' + response.tracks.items[0].name);
				console.log('Preview Link: ' + response.tracks.items[0].preview_url);
				console.log('Album Name: ' + response.tracks.items[0].album.name);
			})
			.catch(function(err) {
				console.log(err);
			});
	})
}


