// This is a JSX file - Note that index.html has <script src="../src/index.js" type="text/JSX"></script> with JSX file type
// These examples were run on codesandbox.io with react and react-dom dependencies
// Many of t hese examples have been forked to my codesandbox account

// npm init -y
// npm install react react-dom 

import React from "react";                  // ES6 version of var React = require("react"); 
import ReactDOM from "react-dom";

// JSX allows us to insert HTML into JavaScript
/************************************************************************** */
ReactDOM.render(<h1>Hello World!</h1>, document.querySelector("#root"));
ReactDOM.render(
    <div>
      <h1>My List</h1>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>
    ,
    document.querySelector("#root") 
  );

// JSX allows us to insert HTML & JavaScript Expressions (Expressions that evaluate to something (e.g. 5*2) but not statements (e.g. if .. else)) into JavaScript
/************************************************************************************************* */
import React from "react";                  // ES6 version of var React = require("react"); 
import ReactDOM from "react-dom";
const fname = "Michael"; 
const lname = "Galle";
const number = 9;
const newNumber = 10;
ReactDOM.render(
    <div>
        <h1>Hello {fname} {lname}!</h1>
        <h1>Hello {fname + " " + lname}!</h1>
        <h1>Hello { `${fname} ${lname}` }!</h1>             
        <p>Your lucky number is {number}</p>
        <p>Luck number times {newNumber} = {number * newNumber} </p>
        <p>A random number is {Math.floor(Math.random() * 10)}</p>
    </div>
    , 
    document.getElementById("root")
);
// Note: backtic ` is produced via Fn + ESC

// Some practice
/*
import React from "react";
import ReactDOM from "react-dom";

const name = "Michael";
var currentDate = new Date();
var year = currentDate.getFullYear();
ReactDOM.render(
  <div>
    <p>Created by {name}</p>
    <p>Copyright &copy; {year} </p>
  </div>,
  document.querySelector("#root")
);
*/

// JSX Attributes and Styling React Elements
/********************************************************************* */
import React from "react";
import ReactDOM from "react-dom";

    // Service called Lorem Picsum that generates filler images (can be random or specific). The 200 is the width in px
    // For details on usage see: https://picsum.photos/ 
const RandImage = "https://picsum.photos/200";     
const RandImageGS = "https://picsum.photos/200?grayscale"; 

ReactDOM.render(
  <div>
    <h1 className="heading" contentEditable="true" spellCheck="false">
      My Favourite Foods
    </h1>
    <ul>
      <li>Bacon</li>
      <li>Jamon</li>
      <li>Noodles</li>
    </ul>
    <div>
        <img className="food-img" alt="bacon" src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-190621-air-fryer-bacon-0035-landscape-pf-1567632709.jpg?crop=0.645xw:0.967xh;0.170xw,0.0204xh&resize=480:*" />
        <img className="food-img" alt="jamon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Jam%C3%B3n_de_Guijuelo_004_%28cropped%29_4.3.JPG/1200px-Jam%C3%B3n_de_Guijuelo_004_%28cropped%29_4.3.JPG" />
        <img className="food-img" alt="noodles" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Mama_instant_noodle_block.jpg/1200px-Mama_instant_noodle_block.jpg" />
        <img src={RandImage + "?blur=6"} alt="blur" />
        <img src={RandImageGS} alt="grayscale" />
    </div>
  </div>,
  document.getElementById("root")
);

// HTML attribute 'class' is 'className' in JavaScript/JSX. It is the preferred way to style the elements using CSS files.
// Note that 'styles.css' and 'index.js' are linked to by index.html

// HTML attributes must be converted to camelcase in JSX files
// E.g. The HTML attribute 'contenteditable' must be converted to 'contentEditable' (camelcase)
// E.g. The HTML attribute 'spellcheck' must be converted to 'spellCheck' (camelcase)

// Can also insert JavaScript as an attribute - See RandImage above



// Inline styles (values for style attribute must be provided as JavaScript objects)
/************************************************************************************* */
// Class based styling using CSS files is reccommended
// Using inline styling like this useful if you want to trigger
// a change in style on the fly (i.e. customStyle.color = "green") without changing the HTML

import React from "react";
import ReactDOM from "react-dom";

// style attribute in JSX must be a JavaScript object
const attr = { color: "red" };

// Note: CSS styles are in kebab case (e.g. font-size)
// but to use them in JavaScript objects they must be converted to camelCase (e.g. fontSize)
var customStyle = {
  color: "orange",
  fontSize: "25px", // convert font-size to camelCase
  border: "1px solid black" // convert value to a "string"
};

// Something changes ...
customStyle.color = "green"; // Change in attributes value without changing the HTML

// Note that JavaScript variables are entered into HTML uising the {} brackets (see below)
ReactDOM.render(
  <div>
    <h1 style={attr}>Hello World!</h1>
    <h1 style={{ color: "blue" }}>Hello World!</h1>
    <h1 style={customStyle}>Custom Styled Header</h1>
  </div>,
  document.getElementById("root")
);

// React styling practice
/*************************************************************************** */
//Create a React app from scratch.
//Show a single h1 that says "Good morning" if between midnight and 12PM.
//or "Good Afternoon" if between 12PM and 6PM.
//or "Good evening" if between 6PM and midnight.
//Apply the "heading" style in the styles.css
//Dynamically change the color of the h1 using inline css styles.
//Morning = red, Afternoon = green, Night = blue.

/*
import React from "react";
import ReactDOM from "react-dom";

let greeting = "Good";
const date = new Date(); // Uses current date and time since no arguments provided. For a specific time you can provide a date and time (i.e. Date(year, month, day, time (24 hour)))
const time = date.getHours();

// inline CSS style - converted to JSON format (camelCase) from CSS (kebab case) - From styles.css
const customStyle = {    // Object pointer (JSON object) so can be const since it stores a memory location
  color: "red" // color: red;
  //fontSize: "50px", // font-size: 50px;         -- Already part of heading class so dont need
  //fontWeight: "bold", // font-weight: bold;     -- Already part of heading class so dont need
  //borderBottom: "5px solid black" //border-bottom: 5px solid black;   -- Already part of heading class so dont need
};

if (time < 12) {
  greeting = greeting + " morning";
  customStyle.color = "red";
} else if (time > 12 && time < 18) {
  greeting = greeting + " afternoon";
  customStyle.color = "green";
} else {
  greeting = greeting + " evening";
  customStyle.color = "blue";
}

ReactDOM.render(
  <div>
    <h1 className="heading" style={customStyle}>
      {greeting} it is {time}
    </h1>
  </div>,
  document.getElementById("root")
);
*/

// React Components - Breaking code into smaller components makes it easier to understand and reuse - Key benefit of React components
/************************************************************************************************************************* */
import React from "react";
import ReactDOM from "react-dom";

// Custom Components
//import Heading from "./components/Heading";
//import List from "./components/List";

// ReactDOM.render(
//   <div>
//     <Heading />
//     <List />
//   </div>,
//   document.getElementById("root")
// );

// Custom Components - More common structure is to wrap everything in App.jsx
import App from "./components/App";

ReactDOM.render(<App />, document.getElementById("root"));


// React Components - practice (https://codesandbox.io/s/react-components-practice-forked-dzefl9?file=/src/index.js:0-157)
/************************************************************************************************************************* */
/*
// Heading.jsx (inside /components)
import React from "react";

function Heading() {
  const date = new Date();
  const currentTime = date.getHours();

  let greeting;

  const customStyle = {
    color: ""
  };

  if (currentTime < 12) {
    greeting = "Good Morning";
    customStyle.color = "red";
  } else if (currentTime < 18) {
    greeting = "Good Afternoon";
    customStyle.color = "green";
  } else {
    greeting = "Good Night";
    customStyle.color = "blue";
  }

  return (
    <h1 className="heading" style={customStyle}>
      {greeting}
    </h1>
  );
}

export default Heading;

// App.jsx - inside /components
import React from "react";
import Heading from "./Heading";

function App() {
  return <Heading />;
}

export default App;

// index.js
import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

ReactDOM.render(<App />, document.getElementById("root"));

*/


// Import, export and modules
/********************************************************************************************** */
//Import the add, multiply, subtract and divide functions
//from the calculator.js file.
//If successful, your website should look the same as the Final.png

import React from "react";
import ReactDOM from "react-dom";

//import add from "./calculator";               // add is the default export
//import { add, multiply, subtract, divide } from "./modules/calculator";       // specific exports by name of function

// ReactDOM.render(
//   <ul>
//     <li>{add(1, 2)}</li>
//     <li>{multiply(2, 3)}</li>
//     <li>{subtract(7, 2)}</li>
//     <li>{divide(5, 2)}</li>
//   </ul>,
//   document.getElementById("root")
// );

import * as MathFn from "./modules/calculator"; // alternative - import everything as an object (mathFn - or whatever you want to name it) with methods
ReactDOM.render(
  <ul>
    <li>{MathFn.add(1, 2)}</li>
    <li>{MathFn.multiply(2, 3)}</li>
    <li>{MathFn.subtract(7, 2)}</li>
    <li>{MathFn.divide(5, 2)}</li>
  </ul>,
  document.getElementById("root")
);




