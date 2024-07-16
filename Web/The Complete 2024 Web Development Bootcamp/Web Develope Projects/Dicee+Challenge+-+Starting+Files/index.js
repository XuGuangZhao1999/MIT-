onload = function() {
    // Create two random numbers between 1 and 6.
    let randomNum0 = Math.floor(Math.random() * 6) + 1;
    let randomNum1 = Math.floor(Math.random() * 6) + 1;

    // Change the dice images to the corresponding random numbers.
    let dicees = document.querySelectorAll("img");
    let dicee0 = dicees[0];
    let dicee1 = dicees[1];

    dicee0.setAttribute("src", "./images/dice" + randomNum0 + ".png");
    dicee1.setAttribute("src", "./images/dice" + randomNum1 + ".png");
    
    // Change the h1 text to the winner.
    let h1 = document.querySelector("h1");
    let winner = "Draw!";
    if(randomNum0 > randomNum1){
        winner = "🚩 Player 1 Wins!";
    }else if(randomNum0 < randomNum1){
        winner = "Player 2 Wins! 🚩";
    }

    h1.textContent = winner;

    // Change the h1 text back to "Refresh.
    setTimeout(() => {
       h1.textContent = "Refresh Me!"; 
    }, 2000);
};