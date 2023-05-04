import React, { useState } from "react";                          // Add useState import

// Method #1: Change appearance via className
/*
function App() {
  // Use State
  const [headingText, setHeadingText] = useState("Hello");        // Use the useState hook with initial value of "Hello"
  const [buttonClass, setButtonClass] = useState("");

  function handleClick() {
    console.log("Clicked");
    setHeadingText("Submitted");
  }
  
  function handleMouseover() {
    console.log("Mouseover");
    setButtonClass("buttonHover"); 
  }

  function handleMouseout() {
    console.log("Mouseout");
    setButtonClass("");
  }

  return (
    <div className="container">
      <h1>{headingText}</h1>
      <input type="text" placeholder="What's your name?" />
      <button className={buttonClass} onClick={handleClick} onMouseOver={handleMouseover} onMouseOut={handleMouseout}>Submit</button>
    </div>
  );
}
*/

// Method #2: Change appearance via the style attribute and CONDITIONAL RENDERING via the TERNARY OPERATOR
function App() {
  // Use State
  const [headingText, setHeadingText] = useState("Hello");        // Use the useState hook with initial value of "Hello"
  const [mousedOver, setMousedOver] = useState(false);

  function handleClick()      { setHeadingText("Submitted");  }
  function handleMouseover()  { setMousedOver(true);          }
  function handleMouseout()   { setMousedOver(false);         }

  return (
    <div className="container">
      <h1>{headingText}</h1>
      <input type="text" placeholder="What's your name?" />
      <button onClick={handleClick} onMouseOver={handleMouseover} onMouseOut={handleMouseout}
        style={{backgroundColor: (mousedOver) ? "black" : "white" }}
      >Submit</button>
    </div>
  );
}

// onClick, onMouseOver, onMouseOut are EVENT listeners we attach to the button

export default App;
