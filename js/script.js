//perosnalise API key generated from https://www.themoviedb.org
const API_KEY = "1584370642bcd2caa5eaac1d180c2593";

//Configuration for the image - provides info about the images sizes that we can use and additinal info.
const config_url = `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`;

//the secured image base url taken out from the image configuration data above.
const image_url = "https://image.tmdb.org/t/p/";

//main url to fetch movie info as per the imdb id provided
const url = `https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}&append_to_response=credits`; //this api call will provide the movie details based on the movie id - here the movie id is imdb id which is hard coded as 580. along with the general details we have appended extra query to get the cast and crew details

//fetching the configuration for the images
fetch(config_url)
  .then(data => data.json())
  .then(data => {
    console.log(data); // by logging the data to console we can view the image configuration that we can use.
  });

fetch(url)
  .then(data => data.json())
  .then(data => {
    function getMoviePoster() {
      let movie_poster_url = image_url + "w185" + data.poster_path;
      let movie_poster = document.createElement("img");
      movie_poster.src = movie_poster_url;
      movie_poster.id = movie_poster;
      document.getElementById("image-wrapper").appendChild(movie_poster);
    }

    getMoviePoster();

    document.getElementById("movie-title").innerHTML =
      "Movie Title: " + data.original_title;
    document.getElementById("movie-director").innerHTML =
      "Director: " + data.credits.crew[0].name;

    let cast_array = data.credits.cast.slice(0, 5); //only selecting the top 5 cast of the array
    for (const value of cast_array) {
      //looping through each value and appending it to the div with id cast
      let cast_heading = document.createElement("h3");
      document.getElementById("cast").appendChild(cast_heading).innerHTML =
        value.name + "  as  " + value.character;
    }
  });
