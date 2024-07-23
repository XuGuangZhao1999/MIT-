//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))
const port = 3000;
let bAuth = false;

function checkAuth(req, res, next) {
    if (req.body.password === "ILoveProgramming") {
        bAuth = true;
    }else{
        bAuth = false;
    }
    next();
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(checkAuth);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
    if(bAuth) {
        res.sendFile(__dirname + "/public/secret.html");
    }else{
        res.redirect("/");
    }
});