var images = ["dice1.png", "dice2.png", "dice3.png", "dice4.png", "dice5.png", "dice6.png"];

// Roll dice
var player1 = Math.floor(6*Math.random());  // generates number between 0 and 5 corresponding to index in images array
var player2 = Math.floor(6*Math.random());

// Select and place images on screen
var img1 = document.querySelector(".img1").setAttribute("src", "images/" + images[player1]);
var img2 = document.querySelector(".img2").setAttribute("src", "images/" + images[player2]);

// Change text to indicate winner
if (player1 > player2)  {
    document.querySelector("p#winner").innerText = "Player 1 wins!";
} else if (player2 > player1) {
    document.querySelector("p#winner").innerText = "Player 2 wins!";
} else {
    document.querySelector("p#winner").innerText = "We have a tie!";
}



