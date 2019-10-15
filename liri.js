require("dotenv").config();

let request = require("request");

// const moment = require("moment");

const fs = require("fs");

const keys = require("./keys.js");

const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);//shouldn't this be in quotes


// let omdb = (keys.omdb);//shouldn't this be in quotes
let bandsintown = (keys.bandsintown);//shouldn't this be in quotes

let userInput = process.argv[2];
let userQuery = process.argv.slice(3).join(" ");

function userCommand(userInput, userQuery) {

    switch (userInput) {
        case "concert-this":
            concertThis();
            break;
    }

    switch (userInput) {
        case "spotify-this-song":
            spotifyThisSong();
            break;
    }

    switch (userInput) {
        case "movie-this":
            movieThis();
            break;
    };


    switch (userInput) {
        case "do-what-it-says":
            doThis(userQuery);
            break;
        default:
            console.log("Please try again");
            break;
    };
};


userCommand(userInput, userQuery);

function concertThis() {
    console.log(`\n -searching for - ${userQuery}'s show!!!`);

    let queryURL = ("https://rest.bandsintown.com/artists/" + userQuery + keys.bandsInTown.bandKey);

    request(queryURL, function (error, response, body) {
    
        if (!error && response.statusCode === 200) {
    
            var JS = JSON.parse(body);
            for (i = 0; i < JS.length; i++) {
                var dTime = JS[i].datetime;
                var month = dTime.substring(5, 7);
                var year = dTime.substring(0, 4);
                var day = dTime.substring(8, 10);
                var dateForm = month + "/" + day + "/" + year
    
                console.log("\n---------------------------------------------------\n");
    
    
                console.log("Date: " + dateForm);
                console.log("Name: " + JS[i].venue.name);
                console.log("City: " + JS[i].venue.city);
                if (JS[i].venue.region !== "") {
                    console.log("Country: " + JS[i].venue.region);
                }
                console.log("Country: " + JS[i].venue.country);
                console.log("\n---------------------------------------------------\n");
    
            }
    }
    });
    



};




function spotifyThisSong() {
    console.log(`\n Searching Spotify for ${userQuery}`);

    spotify
    .search({ type: 'track', query: userQuery })
    .then(function (response) {
        console.log(response.tracks.items[0].artists[0].name);
        console.log(response.tracks.items[0].name)
        console.log(response.tracks.items[0].preview_url)
        console.log(response.tracks.items[0].album.name)

    })
    .catch(function (err) {
        console.log(err);
    });




};




function movieThis() {
    console.log(`\n searching movie ${userQuery}`);


    // var queryURL2 = "https://www.omdbapi.com/?t=" + encodeURIComponent(userQuery) + "&apikey=trilogy";
    console.log(`\n searching movie ${userQuery}`);
    if (!userQuery) {
        userQuery = "mr. nobody";
    }
    queryURL = request("http://www.omdbapi.com/?t=" + userQuery + keys.movieThis.movieKey);
    request(queryURL, function (error, response, body) {


        let userMovie = JSON.parse(body);

        let ratingsArr = userMovie.Ratings;
        // if (ratingsArr.length > 2) {

        // };

        if (!error && response.statusCode == 200) {
            console.log(`\nthe movie Title: ${userMovie.Title}\n`);
            console.log(`\nthe movie Actors: ${userMovie.Actors}\n`);
            console.log(`\nthe movie Release Year: ${userMovie.Year}\n`);
            console.log(`\nthe movie imdb rating: ${userMovie.imdbRating}\n`);
            console.log(`\nthe movie Rotten tomatoes rating: ${userMovie.imdbRating}\n`);
            console.log(`\nthe movie Country: ${userMovie.imdbRating}\n`);
            console.log(`\nthe movie Language: ${userMovie.imdbRating}\n`);
            console.log(`\nthe movie Plot: ${userMovie.imdbRating}\n`);

        } else {
            return console.log("Movie not found Error" + error)
        };

    });



};



function doThis() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) { return console.log(error); }

        let dataArr = data.split(",");


        userInput = dataArr[0];
        userQuery = dataArr[1];

        userCommand(userInput, userQuery);
    });
};
