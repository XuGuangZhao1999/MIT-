const fs = require("node:fs");

fs.readFile("message.txt", "utf8", (err, data)=>{
    if(err){
        console.error(err);
    }else{
        console.log(data);
    }
});