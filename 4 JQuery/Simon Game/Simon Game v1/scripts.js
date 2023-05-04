/**** Variables *****/
var arr = ["green", "red", "yellow", "blue"];       // Option colors for pattern array
var patternArr = [];                                // Random pattern array
var index = 0;                                      // Index in patternArr
var level = 1;                                      // Game level
var sound = new Audio();                            // sound object

/**** Functions *****/
function gameOver() {
  level = 1; 
  patternArr = [];
  index = 0; 
  $("#level-title").text("Game Over"); 
  $("body").addClass("game-over");
  playSound("wrong");
  setTimeout(function() { $("#level-title").text("Press A Key to Start");  }, 3000); 
  setTimeout(function() {$("body").removeClass("game-over");}, 3000 );
} 

function playSound(color) {
  sound.src = "sounds/" + color + ".mp3"; 
  sound.play();
}

function ButtonPress(event) {                   // Event listener function for button presses
  // Play sound associated with the color pressed
  //console.log(event.data.color);
  //console.log(typeof(event.data.color));
  playSound(event.data.color);
  
  // Show press animation
  $("#" + event.data.color).addClass("pressed");
  setTimeout(function () {
    $("#" + event.data.color).removeClass("pressed");
  }, 250);

  // Test input against pattern
  if(event.data.color == patternArr[index]) {
      // If this is last input to the current pattern then go to the next level 
      if (index == patternArr.length - 1) {
        level++; 
        index = 0;
        $("#level-title").text("Level " + level);
        addToPattern();
        showPattern();
      } else {
          index++;          // Else increment the index pointer to check the next input
      }
  } else {
        gameOver();
  }
}

function addToPattern() {
  var randomIndex = Math.floor(4 * Math.random()); // Generate number from 0 to 3
  patternArr.push(arr[randomIndex]);
}

function showPattern() {
    var timeout = 1000;                                    
    for(let j = 0; j < patternArr.length; j++) {        // Use 'let' so that the 'j' variable increments with each iteration 
                                                        // (JavaScript is synchronous so the setTimeout functions do not block) 
                                                        // This means that if 'var' is used then ALL the function() calls by setTimeout() 
                                                        // use the value of j that occurs after the 'for' loop has ended - when j = patternArray.length. 
                                                        // By using 'let', even though the function calls occur after the for loop has ended,
                                                        // the calls are made using the value that j would have been with each iteration in the loop. 
        setTimeout(function() {$("#" + patternArr[j]).addClass("pressed");}, timeout);  // timeout is an offset period
        console.log(patternArr[j]);
        setTimeout(function() {playSound(patternArr[j]);}, timeout);
        
        setTimeout(function () {
          $("#" + patternArr[j]).removeClass("pressed");
        }, timeout + 250); 
        
        timeout += 1000;
    }
}

// Start the game
$(document).on("keydown", function() {
    addToPattern(); 
    showPattern(); 
    $("#level-title").text("Level " + level);
});

/**** Event listeners *****/
for (var k = 0; k < arr.length; k++) {
  $("#" + arr[k]).on("click", { color: arr[k] }, ButtonPress); // how you pass data to the on function
}
