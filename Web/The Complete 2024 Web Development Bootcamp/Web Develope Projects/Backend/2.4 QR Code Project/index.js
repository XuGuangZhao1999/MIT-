/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "node:fs";

inquirer.prompt([{"name": "url", "message": "Please enter a URL: "}])
    .then((answers) => {
        let qr_url = qr.image(answers["url"], { type: "png" });
        qr_url.pipe(fs.createWriteStream("qr.png"));

        fs.writeFile("qr.txt", answers["url"], (error) => {
            if (error) {
                console.log(error);
            }
        });
    })
    .catch((error) => {
        console.log(error);
    });