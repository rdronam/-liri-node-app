var keys = require('./keys.js');

var Twitter = require('twitter');

var spotify = require('spotify');

var request = require('request');

var action = process.argv[2];

var value = process.argv[3];

switch (action) {
    case 'my-tweets' :
      Tweets();
      break;
    case 'spotify-this-song':
      spotifythissong();
      break;
    default:
}

function Tweets() {

  var client = new Twitter(keys.twitterKeys);

  var params = {screen_name: 'rdronam', count: 20};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (i = 0; i < data.statuses.length; i++)
      console.log(data.statuses[i].text);
    }
  });

}

var spotifythissong = function(songName) {

  spotify.search({ type: 'track', query: 'songName' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    
    var songs = data.tracks.items;
    for(var i=0; i<songs.length; i++) {
      console.log(i);
      console.log('artist(s):' + songs[i].artists.map(getArtistsNames));
      console.log('song name:' + songs[i].name);
      console.log('preview song:' + songs[i].preview_url);
      console.log('album:' + songs[i].album.name);
      console.log('____________');
    }

  });

}