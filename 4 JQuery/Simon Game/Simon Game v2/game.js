// alert("It works");       // Test connectivity to this file
// $('h1').text("It works");   // Test jQuery library connectivity

/************** Variables ************************************/
var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor; 
var gamePattern = [];
var redSound = new Audio("sounds/red.mp3");
var blueSound = new Audio("sounds/blue.mp3");
var greenSound = new Audio("sounds/green.mp3");
var yellowSound = new Audio("sounds/yellow.mp3");
var wrongSound = new Audio("sounds/wrong.mp3");
var pressedButtonColor;
var currIndex = 0;


/************** Functions ************************************/
function nextSequence() {
    // Show the current level
    $("#level-title").text("Level " + gamePattern.length);                      // Increment the level and show user

    // Generate a random number between 0 and 3 to select index in buttonColors (0: "red", 1: "blue", 2: "green", 3: "yellow")
    var randomNumber = Math.floor(Math.random() * 4); 

    // Choose a random index (color) in the buttonColors array
    randomChosenColor = buttonColors[randomNumber];

    // Add the new color to the gamePattern array
    gamePattern.push(randomChosenColor); 
}

function showPattern() {
    for(let i=0; i < gamePattern.length; i++) {
        // Select button and animate it for 200ms, for 1000ms on each button
        setTimeout( function(){
            // Show animation and play sound
            $("#" + gamePattern[i]).addClass("pressed");                   
            playSound($("#" + gamePattern[i]).attr("id"));              // Play the sound associated with the color
            // Reset button
            setTimeout( function() {                                    // Use anonymous function in callback so it does not call it immediately 
                $("#" + gamePattern[i]).removeClass("pressed")
            }, 200);                
        }, 1000 * (i+1));                                               // The setTimeout from each loop are basically called at the same time (JS is non sequential) so need to give a different delay                                 
    }
}

function animate(color) {
  // Show animation and play sound
  $("#" + color).addClass("pressed");

  playSound($("#" + color).attr("id")); // Play the sound associated with the color
  // Reset button
  setTimeout(function () {
    // Use anonymous function in callback so it does not call it immediately
    $("#" + color).removeClass("pressed");
  }, 200);
}

function playSound(color) {
    switch(color) {
        case "red":
            redSound.play();
            break;
        case "blue":
            blueSound.play();
            break;
        case "green":
            greenSound.play();
            break;
        case "yellow":
            yellowSound.play();
            break;
        case "wrong":
            wrongSound.play();
            break;
        default:
            // Do not play anything
    }
}

function gameOver() {
    $("#level-title").text("Game Over");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
      $("#level-title").text("Press A Key to Start");
    }, 3000);
    currIndex = 0;
    gamePattern = [];                                               // Reset gamepattern array
    gamePattern.length = 0;                                         // Reset gamePattern (this is the current level)
    console.log("The gamePattern has been reset");                  // Test
}

/************** Event Listeners (only registered ONCE - do not put inside another function or event listener) ************************************/
$(".btn").on("click", function () {                                         // Listen for presses on all buttons
  pressedButtonColor = this.id;                                             // Save id (unique) of current button pressed
  animate(pressedButtonColor);                                              // Animate the pressed button
  playSound(pressedButtonColor);                                            // Play its sound
  if (pressedButtonColor == gamePattern[currIndex]) {
    currIndex++;                                                            // If pressed button matches expected button then move to the next one expected
    if (currIndex == gamePattern.length) {                                  // If reach end of sequence then add another button        
      console.log("Correct. Next pattern is ...");
      currIndex = 0;                                                        // Reset the index sionce pattern starts from the beginning
      nextSequence();                                                       // Push another color to the gamePattern array
      console.log(gamePattern);                                             // Test (remove otherwise can cheat using the pattern shown here)
      showPattern();                                                        // Show the full pattern
    }
  } else {
    // Game over & reset
    gameOver();
  }
});        

$(document).on("keydown", function(){                               // Chrome policy that user must interact with DOM before sounds can play
    if(gamePattern.length == 0) {                                   // Only add new colors and show sequence when it is the first iteration
        nextSequence();
        showPattern();
        console.log(gamePattern);
    }
});