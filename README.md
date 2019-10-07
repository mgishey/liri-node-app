# liri-node-app

## About the app
Liri is a command line node application that uses commands and parameters to retrieve information regarding:
* Upcoming concert dates for favorite bands/artists.
* Favorite songs.
* Favorite movies.

The `commands` are:
* `concert-this`
* `spotify-this-song`
* `movie-this`
* `do-what-it says`



## Step by Step Instructions

1. Open a terminal 
2. Navigate to the folder containg the file named `liri.js`.
3. Output will vary depending on the command run.

     **Example 1:** To get concert information, type:

    `node liri.js concert-this "band or artist"`

    Output: A list of all the dates and locations for a particular band/artist is generated. The lists vary in size for each band/artist.

    ![concert-this](/images/concert-this.png)

    **Example 2:** To get information about a song, type:

    `node liri.js spotify-this-song "song"`

    Output: A list of the artist, album, and a link to a preview of the song is generated. The list was limited to 10 responses.  It usually returns what you didn't expect.

    ![spotify-this-song-w-arg](/images/spotify-this-song-w-arg.png)

    If no artist was entered the app looks up the information for a song named "The Sign". In this case the listing with the band "Ace of Base" was listing #6.

    ![spotify-this-song-wo-arg](/images/spotify-this-song-wo-arg.png)


    **Example 3:**  To query a movie, type:

    `node liri.js movie-this "movie"`

    Output: The app will diplay information about the movie

    ![movie-this-w-arg](/images/movie-this-w-arg.png)

    If no movie was entered the app defaults to a diplay for the movie "Mr. Nobody".

    ![movie-this-wo-arg](/images/movie-this-wo-arg.png)

    **Example 4:** To read and run a command and it's parameter from a text file, type:

    `node liri.js do-what-it-says`

    Output: The system will read the text in the random.txt file and execute the commands listed in the file.

    ![do-what-it-says](/images/do-what-it-says.png)

## Technologies Used

* Javascript
* Nodejs
* Node packages
    * Node-Spotify-API
    * DotEnv
* APIs
    * Bands in Town
    * OMDB
* Git
* Github



