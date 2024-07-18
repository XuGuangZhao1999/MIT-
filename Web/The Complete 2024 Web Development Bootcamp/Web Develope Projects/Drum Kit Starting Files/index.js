function audioBundler(buttonIndex){
    let audio = new Audio();
    switch(buttonIndex){
        case "w":
            audio.src = "sounds/tom-1.mp3";
            break;
        case "a":
            audio.src = "sounds/tom-2.mp3";
            break;
        case "s":
            audio.src = "sounds/tom-3.mp3";
            break;
        case "d":
            audio.src = "sounds/tom-4.mp3";
            break;
        case "j":
            audio.src = "sounds/snare.mp3";
            break;
        case "k":
            audio.src = "sounds/crash.mp3";
            break;
        case "l":
            audio.src = "sounds/kick-bass.mp3";
            break;
        default:
            console.log(buttonIndex);
    }
    audio.play();
}

function buttonAnimation(buttonIndex){
    let activeButton = document.querySelector("." + buttonIndex);
    activeButton.classList.add("pressed");
    setTimeout(function(){
        activeButton.classList.remove("pressed");
    }, 100);
}

let buttons = document.querySelectorAll('.drum');

for(let it of buttons){
    it.addEventListener("click", function(){
        let buttonIndex = this.innerHTML;
        audioBundler(buttonIndex);
        buttonAnimation(buttonIndex);
    });
}

document.addEventListener("keydown", function(event){
    audioBundler(event.key);
    buttonAnimation(event.key);
})