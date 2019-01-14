require("dotenv").config();

var keys = require("./keys.js");

var axios = require("axios");

const lolcatjs = require('lolcatjs');

var Spotify = require('node-spotify-api');

var command = process.argv[2];

var fs = require('fs');


// Spotify function
function spotification(){
  // code block

// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the song name
var songName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {
    songName = songName + "+" + nodeArgs[i];
  }
  else {
    songName += nodeArgs[i];
  }
}

if (songName === ""){
  songName = "(I saw) The Sign"
}

console.log(songName)

var spotify = new Spotify(keys.spotify);

spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

console.log("Artist's Name: " + data.tracks.items[0].artists[0].name); 
console.log("Name of Song: " + data.tracks.items[0].name); 
console.log("Preview: " + data.tracks.items[0].preview_url); 
console.log("Name of Album: " + data.tracks.items[0].album.name); 
});

}

function concertThis(){
  // Store all of the arguments in an array
  var nodeArgs = process.argv;

  // Create an empty variable for holding the movie name
  var bandName = "";

  // Loop through all the words in the node argument
  // And do a little for-loop magic to handle the inclusion of "+"s
  for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
      bandName = bandName + "+" + nodeArgs[i];
    }
    else {
      bandName += nodeArgs[i];
    }
  }

  console.log("Here's some upcoming concerts!")

  axios
    .get("https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp")
    .then(function (response) {
      for (let i = 0; i < response.data.length; i++) {
        const element = response.data[i];
        console.log('\n' + response.data[i].venue.name);
        console.log(response.data[i].venue.city);
        console.log(response.data[i].datetime);
      }
    }
    )
  }

  function movieThis(){
    // code block
    // Store all of the arguments in an array
    var nodeArgs = process.argv;
    // Create an empty variable for holding the movie name
    var movieName = "";
    // Loop through all the words in the node argument
    // And do a little for-loop magic to handle the inclusion of "+"s
    for (var i = 3; i < nodeArgs.length; i++) {
      if (i > 3 && i < nodeArgs.length) {
        movieName = movieName + "+" + nodeArgs[i];
      }
      else {
        movieName += nodeArgs[i];
      }
    };
    // Then run a request with axios to the OMDB API with the movie specified, with an if loop 
    // to provide for the user potentially not inputting information
    if (movieName !== "") {
      var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
      axios.get(queryUrl).then(
        function (response) {
          console.log("Your movie: " + response.data.Title + ", " + response.data.Year + ", imdb Rating: " + response.data.imdbRating + ", Rotten Tomatoes rating: " + response.data.Ratings[1].Value + ", " + response.data.Country + ", " + response.data.Language + ", " + response.data.Plot + " " + response.data.Actors);
        }
      );
    }
  
    else {
      console.log("If you haven't watched 'Mr. Nobody,' then you should: <http://www.imdb.com/title/tt0485947/>")
      console.log("It's on Netflix!")
    }
  }

  // The do-what-it-says function
  function random(){
    // code block
    var content;
    fs.readFile('./random.txt', function read(err, data) {
        if (err) {
            throw err;
        }
        content = data.toString();
        spotification(content);
    });
  }


function liri(){

// Switch function to decide between commands
switch (command) {
  // Here's the concert code
  case "concert-this":
    concertThis();
    break;

  // Here's the Spotify code
  case "spotify-this-song":
    spotification();
    break;

  // Here's the OMDB code
  case "movie-this":
    movieThis();
  break;

  // Here's the rando code
  case "do-what-it-says":
    random()
    break;
  default:
    // code block
    console.log("That's not an option. Please choose a valid option.")
}

// End liri function
}

liri();