import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  port: 5432,
  password: "981108@Shi",
  database: "world",
});

async function getVisitedCountries() {
  let result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach((country)=>{countries.push(country.country_code)});

  return countries;
}

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  let countries = await getVisitedCountries();
  res.render("index", {total: countries.length, countries: countries});
});

app.post("/add", async (req, res) => {
  try{
    let country = req.body.country.toLowerCase();
    if(country === ""){
      throw new Error("Please enter a country");
    }
    let result = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%'", [country]);
    if(result.rows.length !== 0){
      try{
        await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [result.rows[0].country_code]);
      }catch(e){
        throw new Error("Country has already been added, try again");
      }
    }else{
      throw new Error("Country does not exist, try again");
    }
    res.redirect("/");
  }catch(e){
    let countries = await getVisitedCountries();
    res.render("index", {error: e.message, total: countries.length, countries: countries});
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
