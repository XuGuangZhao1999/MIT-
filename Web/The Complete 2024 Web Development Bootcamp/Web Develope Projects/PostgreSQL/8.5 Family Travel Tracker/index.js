import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "981108@Shi",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisisted(user_id) {
  const result = await db.query("SELECT country_code FROM visited_countries WHERE user_id = $1", [user_id]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function getUsers() {
  const result = await db.query("SELECT * FROM users");
  return result.rows;
}

let users = await getUsers();
let currentUserId = 0;
if (users.length > 0){
  currentUserId = users[0].id;
}

app.get("/", async (req, res) => {
  let countries = [];
  if(currentUserId !== 0){
    countries = await checkVisisted(currentUserId);
  }
  console.log(countries);
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: users.find((user) => user.id == currentUserId).color,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  if(req.body["add"] === "new"){
    res.render("new.ejs");
    return;
  }
  currentUserId = req.body["user"];
  res.redirect("/");
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  let name = req.body["name"];
  let color = req.body["color"];
  await db.query("INSERT INTO users (name, color) VALUES ($1, $2)", [name, color]);
  users = await getUsers();
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
