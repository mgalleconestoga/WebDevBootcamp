import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";



// count increases but the page is not re-rendered so you have to call render() each time (inefficient)
// We will use Hooks to make it more efficient
// Hooks must be used inside a functional component so we will copy this code to App()
/*
var count = 0;
function increase() {
  //console.log("I was clicked");
  count++;
  console.log(count);
  ReactDOM.render(
  <div className="container">
    <h1>{count}</h1>
    <button onClick={increase}>+</button>
  </div>,
  document.getElementById("root")
);
}

ReactDOM.render(
  <div className="container">
    <h1>{count}</h1>
    <button onClick={increase}>+</button>
  </div>,
  document.getElementById("root")
);

*/


// Using Hooks
ReactDOM.render(
  <App />,
  document.getElementById("root")
);