import express from "express";

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.get("/contact", (req, res) => {
    res.send("Contact Page");
});

app.get("/about", (req, res) => {
    res.send("About Page");
});