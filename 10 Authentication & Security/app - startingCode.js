// > git init
// > npm init -y, > npm i express ejs mongoose lodash
// Start Mongo server: > mongod
// Go to http://localhost:3000
// Can go into the database by opening up another terminal and typing: > mongo  (show dbs, use <dbname>, show collections, db.<collection name>.find())

const express = require("express");                 // This is an expressJS app
const app = express();                              // Instantiate the app
const ejs = require("ejs");                         // Not sure why this is required - it was not previously ...
const _ = require("lodash");                        // 'npm install lodash'
const mongoose = require("mongoose");               // NEW: npm install mongoose

// Set express() & ejs parameters
app.use(express.json());                            // JSON encode data
app.use(express.urlencoded({ extended: true, }));   // To be able to use req.body to read submitted data from get/post requests
app.set("view engine", "ejs");                      // This is how to use EJS - after installing it via: npm install ejs
app.use(express.static("public"));                  // Use the 'public' folder is a static folder that stores our static html/css/etc files. "public" is the name of the folder with files that are publicly accessible. It is now the new root directory

// Target the various routes

app.route("/")
    .get(function(req, res){
        res.render("home"); 
    });

app.route("/login")
    .get(function(req, res){
        res.render("login"); 
    })
    .post();

app.route("/register")
    .get(function(req, res){
        res.render("register"); 
    })
    .post();

app.route("/secrets")
    .get(function(req, res){
        res.render("secrets"); 
    })
    .post();

app.route("/submit")
    .get(function(req, res){
        res.render("submit"); 
    })
    .post();

app.listen(3000, function(){
    console.log("Server started in port 3000"); 
});