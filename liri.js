require("dotenv").config();

var keys = require("./keys.js");

var axios = require("axios");

artist = "Backstreet Boys"

//   * You should then be able to access your keys information like so

//   ```js
//   var spotify = new Spotify(keys.spotify);
//   ```

// Make a switch function for Step 9 in the instructions

var command = process.argv[2];

switch (command) {

  // Here's the concert code
  case "concert-this":
    console.log("concert this!")
    axios
      .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
      .then(function (response) {
        // What's not working is here. I don't know how to make the var key in function structure to work.
        for (var key in response) {
          // Spit out all venues in response
          console.log(venue);
        }
      })
    // code block
    break;


  // Here's the Spotify code
  case "spotify-this-song":
    console.log("spotify this song!")
    // code block
    break;


  // Here's the OMDB code
  case "movie-this":
    console.log("movie this!")
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
    }
    // Then run a request with axios to the OMDB API with the movie specified, with an if loop 
    // to provide for the user potentially not inputting information
    if (movieName !== ""){
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(
      function (response) {
        console.log(response.data.Ratings[1].Source)
        console.log("Your movie: " + response.data.Title + ", " + response.data.Year + ", imdb Rating: " + response.data.imdbRating  + ", Rotten Tomatoes rating: " + response.data.Ratings[1].Value  + ", " + response.data.Country   + ", " + response.data.Language  + ", " + response.data.Plot   + " " + response.data.Actors  );
      }
    );
  }
  else {
    console.log ("If you haven't watched 'Mr. Nobody,' then you should: <http://www.imdb.com/title/tt0485947/>")
    console.log("It's on Netflix!")
  }
    break;


  // Here's the rando code
  case "do-what-it-says":
    console.log("do what it says!")
    // code block
    break;
  default:
    // code block
    console.log("That's not an option. Please choose a valid option.")
}