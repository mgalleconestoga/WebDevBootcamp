import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

ReactDOM.render(<App />, document.getElementById("root"));

// PRACTICE: Arrow function version

//var numbers = [3, 56, 2, 48, 5];

////Map -Create a new array by doing something with each item in an array.
// const newNumbers = numbers.map(function (x) {
//   return x * 2;
// });

// Arrow function versions
//const newNumbers = numbers.map( (x) => { return x * 2; } );     // '()' required if more than one input i.e. (x, y)
//const newNumbers = numbers.map( x => x * 2 );                   // input => output form 
//console.log(newNumbers);

//////Filter - Create a new array by keeping the items that return true.
// const newNumbers = numbers.filter(function(num) {
//   return num < 10;
// });

// Arrow function versions
//const newNumbers = numbers.filter( (num) => { return num < 10; } );     // '()' required if more than one input i.e. (x, y)
//const newNumbers = numbers.filter( num => num < 10 );                     // input => output form   
//console.log(newNumbers);

//Reduce - Accumulate a value by doing something to each item in an array.
// var newNumber = numbers.reduce(function (accumulator, currentNumber) {
//     return accumulator + currentNumber;
// })

// Arrow function versions
//const sum = numbers.reduce((accumulator, currentNumber) => { return accumulator + currentNumber });   // '()' required if more than one input i.e. (x, y)
//const sum = numbers.reduce((accumulator, currentNumber) => accumulator + currentNumber);
//console.log(sum);

////Find - find the first item that matches from an array.
// const newNumber = numbers.find(function (num) {
//   return num > 10;
// })

// Arrow function versions
//const newNumber = numbers.find((num) => { return num > 10 });
//const newNumber = numbers.find(num => num > 10);
//console.log(newNumber);


////FindIndex - find the index of the first item that matches.
// const newNumber = numbers.findIndex(function (num) {
//   return num > 10;
// })

// Arrow function versions
//const newNumber = numbers.findIndex((num) => { return num > 10 });
//const newNumber = numbers.findIndex(num => num > 10);
//console.log(newNumber);