require("dotenv").config();
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");

var command = process.argv[2];
var userInput = process.argv.slice(3).join("+");

function dispatch(command) {
    switch (command) {
        case "movie-this":
            searchMovie();
            break;

    }
}

function searchMovie() {
    if(!userInput){
        var queryUrl = "http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy";
        var type = "movie";
        console.log("\nDon't know any good movies?" 
        + "\nCheck out Mr. Nobody, its on Netflix!" 
        )  
    } else {
    var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
        var type = "movie";  
    }

    axios.get(queryUrl).then(
        function (response) {
            console.log("Title of the movie: " + response.data.Title);
            console.log("Year the movie came out: " + response.data.Year);
            console.log("IMDB Rating of the movie: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
            console.log("Country where the movie was produced: " + response.data.Country);
            console.log("Language of the movie: " + response.data.Language);
            console.log("Plot of the movie: " + response.data.Plot);
            console.log("Actors in the movie: " + response.data.Actors);
        })
        .catch(function (error) {
            if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}



dispatch(command);
