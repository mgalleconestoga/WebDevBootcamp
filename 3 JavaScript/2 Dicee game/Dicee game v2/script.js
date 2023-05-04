// Generate random numbers between 1 and 6 for each player
var p1 = Math.floor(Math.random() * 6) + 1; 
var p2 = Math.floor(Math.random() * 6) + 1; 

// Select dom elements to display dice
var p1_img = document.querySelector(".img1");
var p2_img = document.querySelector(".img2");

// Change src attributes for the images
p1_img.setAttribute("src", "images/dice" + p1.toString() + ".png");
p2_img.setAttribute("src", "images/dice" + p2.toString() + ".png");

// Select the title to display the winner
var results = document.querySelector("h1");

// Display the winner
if (p1 > p2) {
    results.innerText = "🚩 Player 1 wins!"
} else if (p1 === p2) {
    results.innerText = "🏳️Tie game!";
} else {
    results.innerText = "🚩Player 2 wins!"
}
