import express from 'express';

const app = express();
const port = 3000;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res)=>{
    let date = new Date();
    let no = date.getDay();
    let sentence = "";
    if(no === 0 || no === 6){
        sentence = "It's the weekend, It's time to have fun!";
    }else{
        sentence = "It's a weekday, It's time to work hard!";
    }
    res.render("index.ejs", {dateStr: sentence});
});