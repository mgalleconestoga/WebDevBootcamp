
/******  Use Native node modules (built-in) see: https://nodejs.org/api/ *********/
const fs = require("fs");            // CJS based import
//import fs from "fs";               // ESM based import - need to change file extension to .mjs for this to work

fs.copyFileSync("test.txt", "testCopy.txt");

/******  Use NPM (non native packages) by using NPM: see https://www.npmjs.com ******/
// > npm init       (at command line inside the folder where we want to install npm packages)
// > npm install <pkg>      (at command line inside the folder to install a specific package)


// > npm install superheroes            -- See that it is now a dependency in package.json
var superheroes = require("superheroes");
var hero = superheroes.random();

// > npm install supervillains
var supervillains = require("supervillains"); 
var villain = supervillains.random();

console.log(hero + " will now fight " + villain);



