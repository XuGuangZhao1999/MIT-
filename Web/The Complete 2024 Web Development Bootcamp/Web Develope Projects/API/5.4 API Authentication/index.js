import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "xuguangzhao";
const yourPassword = "123456";
const yourAPIKey = "8225bd79-599d-44dd-8578-d37227255496";
const yourBearerToken = "52d2e335-eea2-44c8-9e63-876e0d0029ba";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  try {
    const response = await axios.get(API_URL + "random");
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      content: "Can't get some secrets.",
    });
  }
});

app.get("/basicAuth", (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
  axios.get(API_URL + "all?page=2", {
    auth: {
      username: yourUsername,
      password: yourPassword,
    },
  }).then(function (response){
    res.render("index.ejs", { content: JSON.stringify(response.data)});
  }).catch(function (error){
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      content: "Can't get some secrets.",
    });
  });
});

app.get("/apiKey", (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  try {
    const response = axios.get(`${API_URL}filter?score=5&apiKey=${yourAPIKey}`);
    response.then((result) => {
      res.render("index.ejs", { content: JSON.stringify(result.data) });
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      content: "Can't get some secrets.",
    });
  }
});

app.get("/bearerToken", (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
  axios.get(API_URL + "secrets/42", {
    headers: {
      Authorization: `Bearer ${yourBearerToken}`,
    }
  }).then(function (response){
    res.render("index.ejs", { content: JSON.stringify(response.data)});
  }).catch(function (error){
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      content: "Can't get some secrets.",
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
