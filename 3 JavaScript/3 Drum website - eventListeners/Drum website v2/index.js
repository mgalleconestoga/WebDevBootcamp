/************************** Functions ******************/
function playSound(character) {
    switch (character) {
        case "w":
            audioCrash.play(); 
            break;

        case "a":
            audioKick.play();
            break;

        case "s":
            audioSnare.play(); 
            break;

        case "d":
            audioTom1.play();
            break;
        case "j":
            audioTom2.play();
            break;
        case "k":
            audioTom3.play(); 
            break;
        case "l":
            audioTom4.play(); 
            break;
            
        default:
            // play nothing
            break;
    }
}

function buttonAnimation(character) {
    var keys = ["w", "a", "s", "d", "j", "k", "l"];   
    var btnpressed = document.querySelector("." + character); 
    if (keys.includes(character)) {
        btnpressed.classList.add("pressed"); 
        setTimeout(function() { btnpressed.classList.remove("pressed"); }, 100);       // Return color to original after 3 seconds
    }
}

function handleClick(e) {
    // Use 'this' to determine which object triggered the 'click' event                    
    playSound(this.innerHTML);  
    buttonAnimation(this.innerHTML);
}

function handleKeyPress(e) {
    //console.log(e.key); 
    playSound(e.key);
    buttonAnimation(e.key);
}

/*************************** Objects ********************/ 
var w = document.querySelectorAll(".drum");                 // select all drum objects using a Nodelist
var audioCrash = new Audio('sounds/crash.mp3');
var audioKick = new Audio('sounds/kick-bass.mp3'); 
var audioSnare = new Audio('sounds/snare.mp3'); 
var audioTom1 = new Audio('sounds/tom-1.mp3'); 
var audioTom2 = new Audio('sounds/tom-2.mp3'); 
var audioTom3 = new Audio('sounds/tom-3.mp3'); 
var audioTom4 = new Audio('sounds/tom-4.mp3'); 

/************************ Event listeners ***************/
for( var i = 0; i < w.length; i++) {
    w[i].addEventListener('click', handleClick, false);     // Click event on each button
}
document.addEventListener('keydown', handleKeyPress);       // keypress events

