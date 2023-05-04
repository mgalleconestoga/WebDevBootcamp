/**************** Objects *****************/
// Select DOM elements
var w = document.querySelector(".w");
var a = document.querySelector(".a");
var s = document.querySelector(".s");
var d = document.querySelector(".d");
var j = document.querySelector(".j");
var k = document.querySelector(".k");
var l = document.querySelector(".l");

// Create audio objects that will call a play() method
var w_aud = new Audio('sounds/crash.mp3');
var a_aud = new Audio('sounds/kick-bass.mp3');
var s_aud = new Audio('sounds/snare.mp3');
var d_aud = new Audio('sounds/tom-1.mp3');
var j_aud = new Audio('sounds/tom-2.mp3');
var k_aud = new Audio('sounds/tom-3.mp3');
var l_aud = new Audio('sounds/tom-4.mp3');

/**************** Functions *****************/
// Functions to call when MOUSE events are triggered
function playw() { w_aud.play(); }
function playa() { a_aud.play(); }
function plays() { s_aud.play(); }
function playd() { d_aud.play(); }
function playj() { j_aud.play(); }
function playk() { k_aud.play(); }
function playl() { l_aud.play(); }

// Function to call when KEYBOARD events are triggered
function whichKey(e) {
    switch(e.key) {
        case 'w':
            playw();
            break;
        case 'a':
            playa();
            break;
        case 's':
            plays();
            break;
        case 'd':
            playd();
            break;
        case 'j':
            playj();
            break;
        case 'k':
            playk();
            break;    
        case 'l':
            playl();
            break;
        default:
            // Do nothing
    }
}

/**************** Event listeners *****************/
// Add mouse event listeners
w.addEventListener('click', playw, false);
a.addEventListener('click', playa, false);
s.addEventListener('click', plays, false);
d.addEventListener('click', playd, false);
j.addEventListener('click', playj, false);
k.addEventListener('click', playk, false);
l.addEventListener('click', playl, false);

// Add keyboard event listeners
window.addEventListener('keypress', function(e) { whichKey(e) }, false);