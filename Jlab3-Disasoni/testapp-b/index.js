//import required modules
const express = require("express");
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");

//Mongo config stuff
const dbUrl = "mongodb://127.0.0.1:27017";
const client = new MongoClient(dbUrl);

//set up Express app
const app = express();
const port = process.env.PORT || 8888;

//define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//setup public folder
app.use(express.static(path.join(__dirname, "public")));

//convert form data to JSON for easier use
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*var links = [
  {
    name: "Home",
    path: "/"
  },
  {
    name: "About",
    path: "/about"
  }
];*/

//PAGE ROUTES
app.get("/", async (request, response) => {
  const links = await getLinks();
  response.render("index", { title: "Home", menu: links });
});
app.get("/about", async (request, response) => {
 const  links = await getLinks();
  response.render("about", { title: "About", menu: links });
});
app.get("/admin/menu", async (request, response) => {
 const  links = await getLinks();
  response.render("menu-list", { title: "Menu links admin", menu: links });
});
app.get("/admin/menu/add", async (request, response) => {
  const links = await getLinks();
  response.render("menu-add", { title: "Add menu link", menu: links });
});
app.get("/admin/menu/edit", async (request, response) => {
   const links = await getLinks();
   const editLinkData = await getSingleLink(request.query.linkId);
  
  //  if (request.query.linkId) { 
  //   let linkToEdit = await getSingleLink(request.query.linkId);
  //   let links = await getLinks();

  response.render("menu-edit", { title: "Edit menu link", menu: links, editLink: editLinkData});
  //  } else{
  //   response.redirect("/admin/menu");
  //  }
});

//FORM PROCESSING PATHS
app.post("/admin/menu/add/submit", async (request, response) => {
  //for a POST form, the data is retrieved through the body
  //request.body.<field_name>

  //.console.log(request.body)

  let newLink = {
    weight: request.body.weight,
    path: request.body.path,
    name: request.body.name
  };
  await addLink(newLink);
  response.redirect("/admin/menu");
});
app.get("/admin/menu/delete", async (request, response) => {
  //for a GET form, the data is passed in request.query
  //request.query.<field_name>
  await deleteLink(request.query.linkId);
  response.redirect("/admin/menu");
});


app.post("/admin/menu/edit/submit", async (request, response) => {
  //get the id
   const editss = request.body.linkId;
   console.log(editss);

  
 

  //get the weight/path/name values from the form and use for a document to update
  let updatedata = 
  {
    weight: request.body.weight, 
    path: request.body.path,
    name: request.body.name
    
  };
  await editLink(editss, updatedata);

  //run editLink()
  response.redirect("/admin/menu");
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

//MONGO FUNCTIONS
/* Function to connect to DB and return the "testdb" database. */
async function connection() {
  await client.connect();
  db = client.db("testdb");
  return db;
}
/* Function to select all documents from menuLinks. */
async function getLinks() {
  db = await connection();
  var results = db.collection("menuLinks").find({});
  res = await results.toArray(); //convert to an array
  return res;
}
/* Function to insert a new document into menuLinks. */
async function addLink(link) {
  db = await connection();
  await db.collection("menuLinks").insertOne(link);
  console.log("link added");
}
/* Function to delete one document by id. */
async function deleteLink(id) {
  db = await connection();
  const deleteIdFilter = { _id: new ObjectId(id) };
  const result = db.collection("menuLinks").deleteOne(deleteIdFilter);
  if (result.deletedCount === 1)
    console.log("delete successful");
}

/* Function to select a single document from menuLinks. */
async function getSingleLink(id) {
  db = await connection();
  const editIdFilter = { _id: new ObjectId(id) };
  const result = await db.collection("menuLinks").findOne(editIdFilter);
  //console.log(result);
  return result;
}
/* Function to update a given link */
async function editLink(id, updatedata) {
  db = await connection();
  //https://www.mongodb.com/docs/drivers/node/current/usage-examples/updateOne/
  
   
   
   const edit=  { _id: new ObjectId(id) };
   const updateIdFilter = await db.collection("menuLinks").updateOne(edit, {$set: updatedata });
    console.log(" updated result");

}


