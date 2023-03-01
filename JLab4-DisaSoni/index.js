//import required modules
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const trakt = require("./modules/trakt/api");

//set up Express app
const app = express();
const port = process.env.PORT || 8888;

//define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//setup public folder
app.use(express.static(path.join(__dirname, "public")));

//PAGE ROUTES
app.get("/", async(request, response) => {
    let moviesList = await trakt.getTrendingMovie();
    response.render("index", { title: "movies", movies: moviesList });
});

app.get("/shows", async(request, response) => {
    let showsList = await trakt.getPopularShows();
    console.log(showsList);
    response.render("shows", { title: "shows", shows: showsList });
});


//set up server listening
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});