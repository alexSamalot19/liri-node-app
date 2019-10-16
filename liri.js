// Require node packages
require("dotenv").config();

let request = require("request");

const moment = require("moment");

const fs = require("fs");

const keys = require("./keys.js");

// Initialize APIs
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

let bandsInTown = (keys.bandsInTown.bandKey);

let omdbMovie = (keys.movieThis.movieKey);

// CLI inputs for logic and search term
let userInput = process.argv[2];
let userQuery = process.argv.slice(3).join(" ");



// Logic for the correct API based on CLI
function userCommand(userInput, userQuery) {

    switch (userInput) {
        case "concert-this":
            concertThis();
            break;

        case "spotify-this-song":
            spotifyThisSong();
            break;

        case "movie-this":
            movieThis();
            break;

        case "do-what-it-says":
            doThis(userQuery);
            break;
        default:
            console.log("Please try again");
            break;
    };
};

userCommand(userInput, userQuery);


// Bands in Town API
function concertThis() {
    console.log(`\nSearching for ${userQuery}'s Show!!!`);

    let queryURL = ("https://rest.bandsintown.com/artists/" + userQuery + bandsInTown);

    request(queryURL, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            var JS = JSON.parse(body);
            for (i = 0; i < JS.length; i++) {
                var dTime = moment(JS[i].datetime).format("MM/DD/YYYY hh:00 A");

                console.log("\n---------------------------------------------------\n");
                console.log("Date: " + dTime);
                console.log("Name: " + JS[i].venue.name);
                console.log("City: " + JS[i].venue.city);
                if (JS[i].venue.region !== "") {
                    console.log("Country: " + JS[i].venue.region);
                }
                console.log("Country: " + JS[i].venue.country);
                console.log("\n---------------------------------------------------\n");

            }
        } else {
            return console.log("Artist not found error:  " + error)
        };
    });

};



//Spotify API
function spotifyThisSong() {
    console.log(`\n Searching Spotify for ${userQuery}`);
    if (!userQuery) {
        userQuery = "The Sign Ace of Base"
    };

    spotify.search({ type: 'track', query: userQuery, limit: 1 }, function (err, data) {

        if (err) {
            return console.log('Error:' + err);
        };

        let spotifyArr = data.tracks.items;
        for (i = 0; i < spotifyArr.length; i++) {

            console.log("\n---------------------------------------------------\n");
            console.log(`\n Artists: ${data.tracks.items[i].album.artists[0].name}`);
            console.log(`\n Song: ${data.tracks.items[i].name}`);
            console.log(`\n Spotify Link: ${data.tracks.items[i].external_urls.spotify}`);
            console.log(`\n Album: ${data.tracks.items[i].album.name}`);
            console.log("\n---------------------------------------------------\n");
        };

    });

};



// OMDB API 
function movieThis() {
    console.log(`\n Searching Movie: ${userQuery}!`);
    if (!userQuery) {
        userQuery = "mr. nobody";
    }
    queryURL = request("http://www.omdbapi.com/?t=" + encodeURI(userQuery) + omdbMovie);

    request(queryURL, function (error, response, body) {

        let userMovie = JSON.parse(body);

        let ratingsArr = userMovie.Ratings;

        if (!error && response.statusCode == 200) {

            console.log("\n---------------------------------------------------\n");
            console.log(`\nMovie Title: ${userMovie.Title}`);
            console.log(`\nActors: ${userMovie.Actors}`);
            console.log(`\nRelease Year: ${userMovie.Year}`);
            console.log(`\nIMDB rating: ${userMovie.imdbRating}`);
            console.log(`\nRotten Tomatoes rating: ${userMovie.imdbRating}`);
            console.log(`\nCountry: ${userMovie.imdbRating}`);
            console.log(`\nMovie Language: ${userMovie.imdbRating}`);
            console.log(`\nMovie Plot: ${userMovie.imdbRating}`);
            console.log("\n---------------------------------------------------\n");

        } else {
            return console.log("Movie not found error:  " + error)
        };

    });

};



// Let the dev decide
function doThis() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) { return console.log(error); }

        let dataArr = data.split(",");

        userInput = dataArr[0];
        userQuery = dataArr[1];

        userCommand(userInput, userQuery);
    });
};
