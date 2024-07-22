function nextSequence() {
    let randomNumber = Math.floor(Math.random()*4);
    level++;
    $("h1").text("Level " + level);
    return randomNumber;
}

function playSound(name){
    let sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        return true;
    }else{
        return false;
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

$(document).one("keypress", function(){
    let randomChosenColour = buttonColors[nextSequence()];
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
});

$(".btn").on("click", function(event){
    let userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    if(checkAnswer(userClickedPattern.length-1)){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                let randomChosenColour = buttonColors[nextSequence()];
                gamePattern.push(randomChosenColour);
                animatePress(randomChosenColour);
                playSound(randomChosenColour);
                userClickedPattern = [];
            }, 1000);
        }
    }else{
        startOver();
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
            $("h1").text("Game Over, Press Any Key to Restart");
        }, 200);

        $(document).one("keypress", function(){
            $("h1").text("Press A Key to Start");
            $(document).one("keypress", function(){
                let randomChosenColour = buttonColors[nextSequence()];
                gamePattern.push(randomChosenColour);
                animatePress(randomChosenColour);
                playSound(randomChosenColour);
            });
        });
    }
});
