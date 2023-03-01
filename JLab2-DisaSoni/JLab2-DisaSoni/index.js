//Import required Modules
const { request, response } = require("express");
const express =require("express");
const path =require("path");

// set up express app and port number

const app =express();
const port =process.env.PORT || 8888;

//set up template engine

app.set("views", path.join(__dirname, "views"));
app.set("view engine","pug");


//set up static files 
app.use(express.static(path.join(__dirname, "public")));


var links = [
{
    name:"Home",
    path:"/"
},
{
    name:"About",
    path:"/about"
},
{
    name:"Contact us",
    path:"/"
}
];

//page routes

app.get("/", (request,response) =>{
//response.status(200).send("Test page final");
response.render("index", { title:"Home", menu: links});
});

app.get("/about", (request,response) => {
    //response.status(200).send("Test page final");
    response.render("about", { title: "About", menu: links});
    });


app.get("/", (request,response) =>{
//response.status(200).send("Test page final");
response.render("contactus", { title:"Contact us", menu: links});
});

//set up server listening
app.listen(port, () => {
    console.log(`Listning on http://localhost:${port}`);
});