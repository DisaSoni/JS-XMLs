const Express = require("express");
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");

const PORT = 8888;
const MONGODB_URI = "mongodb+srv://Disa:Disa@cluster0.orkchxd.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(MONGODB_URI);

const app = Express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(Express.static(path.join(__dirname, 'public')));

// app.use(Express.urlencoded({extended: true}));
// app.use(Express.json());

app.get("/", (request, response) => {
    response.render('index', { title: "Meow~Meow Home" });
});
app.get("/contact", (request, response) => {
    response.render("contact", { title: "Meow~Meow Contact Us" });
});
app.get("/shop", async(request, response) => {
    const database = await connection();
    let shops = database.collection("cats");
    const data = await shops.find({}).toArray();
    response.render('shop', { data: data, title: "Meow~Meow Shop" });

});
app.get("/*", (request, response) => {
    response.send({ error: 'ERROR 404 PAGE NOT FOUND >.<' })
});

async function connection() {
    await client.connect();
    return client.db("assignments");
}


app.listen(PORT, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`http://localhost:${PORT}`);
    }
})