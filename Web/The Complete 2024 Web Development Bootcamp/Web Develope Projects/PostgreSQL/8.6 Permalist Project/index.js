import express from "express";
import bodyParser from "body-parser";
import pg from "pg"

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "981108@Shi",
  database: "permalist"
});
db.connect();

async function getItems(){
  let result = await db.query("SELECT * FROM items;");
  console.log(result);

  return result.rows;
}

let items = [];

app.get("/", async (req, res) => {
  items = await getItems();

  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  await db.query("INSERT INTO items (title) VALUES ($1);", [req.body.newItem]);
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  await db.query("UPDATE items SET title=$1 WHERE id=$2;", [req.body.updatedItemTitle, req.body.updatedItemId]);
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  await db.query("DELETE FROM items WHERE id=$1;", [req.body.deleteItemId]);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
