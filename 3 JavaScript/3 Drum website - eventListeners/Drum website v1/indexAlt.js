/**************** Selectors and objects *****************/
// Select DOM elements and create audio objects
var drums = document.querySelectorAll(".drum");
var drumAud = [];
for(let i=0; i < drums.length; i++) {       
    drumAud[i] = new Audio('soundsAlt/' + i + '.mp3');
}

/************************ Functions ***********************/
function PlayIt(character) {
    switch(character) {
        case 'w':
            drumAud[0].play();
            break;
        case 'a':
            drumAud[1].play();
            break;
        case 's':
            drumAud[2].play();
            break;
        case 'd':
            drumAud[3].play();
            break;
        case 'j':
            drumAud[4].play();
            break;
        case 'k':
            drumAud[5].play();
            break;    
        case 'l':
            drumAud[6].play();
            break;
        default:
            // Do nothing
    } 
}

function buttonAnimation(character) {
 //console.log(character);
 var pressed = document.querySelector("." + character);
 pressed.classList.add("pressed");
 var delayInMilliseconds = 100;        // 0.1 seconds
 setTimeout(function() {
    pressed.classList.remove("pressed"); // use anonymous function in 'callback', otherwise the remove() function will be called immediately due to the brackets
 }, delayInMilliseconds);
 
}

/**************** Event listeners and anonymous functions *****************/
// Mouse
for (let i=0; i < drums.length; i++) {
    // MUST use 'let' (block scoped variable) so that 'i' has the value 
    // within each iteration of the loop. (i.e. a new binding for 'i' in each iteration of the loop)
    // I initially used 'var' but the problem with that is that 
    // it has function scope and the value of 'i' used when the 'click'
    // event is registered will be the final value (i.e. drums.length) 
    // and drumsAud[i === drums.length] is not defined
    // *** I used chatGPT to determine the issue ***      
    drums[i].addEventListener('click', function(e) {
        console.log(e);
        //this.style.color = "white";          // 'this' is the object (drum) that triggered the event
        
        //drumAud[i].play();                 // Initial method to play audio (requires 'let' be used to scope 'i' with block level scope)     
        // Alternative: Play the audio determined by the InnerHTML value of 'this' object that triggered the event
        var buttonInnerHTML = this.innerHTML;  // e.g. 'w', 'a', 's', 'd', 'j', 'k', 'l'
        buttonAnimation(buttonInnerHTML);
        PlayIt(buttonInnerHTML);
        
    }, false);
}

// Keyboard 
document.addEventListener('keydown', function(e) { 
    console.log(e);
    buttonAnimation(e.key);
    PlayIt(e.key); 
}, false);


