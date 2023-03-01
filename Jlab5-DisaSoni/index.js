const express = require("express");
const path = require("path");

const libraries = require("./components/libraries/library");

const app = express();
const port = process.env.PORT || "8888";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


app.use(express.static(path.join(__dirname, "public")));

app.get("/", async(request, response) => {
    let data = await libraries.loadLocations();
    response.render("index", { title: "Home", libraries: data });
});
app.get("/library/:id", async(request, response) => {
    let getData = await libraries.getLibraryById(request.params.id);
    console.log(`The getData: ${getData}`);
    response.render("library", { title: "Library", library: getData });
});

//server listening
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});