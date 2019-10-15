# LIRI Bot
<br>
### Problem

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.
LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.


<br>
### Overview of how the app is organized

CLI App

   * Inside of `random.txt` put the following in with no extra characters or white space:

     * spotify-this-song,"I Want it That Way"

6. Make a JavaScript file named `liri.js`.

7. At the top of the `liri.js` file, add code to read and set any environment variables with the dotenv package:


```js
require("dotenv").config();
```

8. Add the code required to import the `keys.js` file and store it in a variable.

```js
  var keys = require("./keys.js");
```
  
* You should then be able to access your keys information like so

  ```js
  var spotify = new Spotify(keys.spotify);
  ```

9. Make it so liri.js can take in one of the following commands:

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

<br>
### start-to-finish instructions on how to run the app

1. `node liri.js concert-this <artist/band name here>`

   * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

     * Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY")

    * **Important**: There is no need to sign up for a Bands in Town `api_id` key. Use the `codingbootcamp` as your `app_id`. For example, the URL used to search for "Celine Dion" would look like the following:

      * `https://rest.bandsintown.com/artists/celine+dion/events?app_id=codingbootcamp`

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window

     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from

   * If no song is provided then your program will default to "The Sign" by Ace of Base.



Include screenshots, gifs or videos of the app functioning
5. Contain a link to a deployed version of the app


<br>
### Technologies used in the app


   * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

   * [Axios](https://www.npmjs.com/package/axios)

     * You'll use Axios to grab data from the [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

   * [Moment](https://www.npmjs.com/package/moment)

   * [DotEnv](https://www.npmjs.com/package/dotenv)

<br>
### Meet the developer and role in the app development

My name is Alex I am a bootcamp student whose coding work can be seen here:

I designed this app using existing APIs and packages listed in the technology section. I utilized nodejs to collect user input data from the command line and collect data from the SDKs and view the relevant information in the console in a simple and intuitive way.
