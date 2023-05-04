import React from "react";

function add(n1, n2) {
  return n1 + n2;
}

function multiply(n1, n2) {
  return n1 * n2;
}

function subtract(n1, n2) {
  return n1 - n2;
}

function divide(n1, n2) {
  return n1 / n2;
}

//export default add; // The default export - There can only be one default
export { add, multiply, subtract, divide }; // Other things we can export
