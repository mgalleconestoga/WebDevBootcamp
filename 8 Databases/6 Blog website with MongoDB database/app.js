//jshint esversion:6
// To run 1. Start MongoDB server in a new terminal > mongod 2. Start the app in another terminal > node app.js or nodemon app.js
// 3. Go to http://localhost:3000
// 4. Can go into the database by opening up another terminal and typing: > mongo  (show dbs, use <dbname>, show collections, db.<collection name>.find())

const express = require("express");                 // This is an expressJS app
const app = express();                              // Instantiate the app
const ejs = require("ejs");                         // Not sure why this is required - it was not previously ...
//const { forEach } = require("lodash");              // This was automatically added after 'npm install lodash'
const _ = require("lodash");                        // 'npm install lodash'
const mongoose = require("mongoose");               // NEW: npm install mongoose

// Set express() parameters
app.use(express.json());                            // JSON encode data
app.use(express.urlencoded({ extended: true, }));   // To be able to use req.body to read submitted data from get/post requests
app.set("view engine", "ejs");                      // This is how to use EJS - after installing it via: npm install ejs
app.use(express.static("public"));                  // Use the 'public' folder is a static folder that stores our static html/css/etc files. "public" is the name of the folder with files that are publicly accessible. It is now the new root directory

// Import custom Node package that contains the data
const dataObj = require(__dirname + "/data.js");    // Import the module and create object with the getData() function

// NEW: Create connection to the Database
const conn = mongoose.createConnection("mongodb://localhost:27017/journal");    // NEW: Create LOCAL connection to the journal database

// NEW: Create Schema that is common for all lists 
const Schema = new mongoose.Schema({title: String, content: String});     // NEW: Each document (object) has a title and a content section 

// Get the starting / static data (using the custom Node package data.js) for the website
let obj = dataObj.getData();
let postObjects = obj[0];                           // Data array for 'home' page 
let aboutObjects = obj[1];                          // Data array for 'about' page
let contactObjects = obj[2];                        // Data array for 'contact' page

// NEW: Model that connects to the "blogs" (pluralized automatically) collection in the "journal" database 
const BlogEntry = conn.model("blog", Schema); 

// Get for ("/") home route - render based on 'template'
app.get("/", function(req, res) {
  // NEW: Read data from the MongoDB database via the find() method
  BlogEntry.find(function(err, data){
    if (err) {
      console.log("Error: could not READ from database. The error is: " + err);
    } else {
      res.render("template", {
        posts: postObjects,                      // These are the default starting data objects
        entries: data                            // These are entries from the DATABASE (an array of documents (JSON Objects)) 
      });                                        // 'entries' array is passed via EJS to 'template.ejs' 
    }
  });
});

// Get for '/compose' route ('compose.ejs') which creates new entries to enter into the database
app.get("/compose", function(req, res) {
  res.render("compose"); 
});
app.post("/compose", function(req, res) {
  // Get the data from the form on the compose page and enter it into the database
  const newPost = new BlogEntry ({title: _.capitalize(_.lowerCase(req.body.title)), content: req.body.content}); // Note that _id is automatically a key
  newPost.save().then( () => {
    console.log("Successful insertion into database"); 
    console.log(req.body.title);
    res.redirect("/");                                 // Posted data to the form page is redirected to the home page 
  });
});

// CUSTOM ROUTES
// This gets and shows the FULL/EXPANDED individual blog post content from the home page - to get the blog posts using the ':' variable indicator - render based on separate page - 'post.ejs' to see full post
app.get("/posts/:postTitle", function(req, res){         // This reponds to any get request for this path with any number for *
  // :postTitle is a parameter (variable) of req.params that stores the text that comes after the '/posts/'

  BlogEntry.findOne( {title: _.capitalize(_.lowerCase(req.params.postTitle))}, function(err, data){   // lowerCase() replaces %20 with spaces. Capitalize makes the first letter of trhe string capitalized
    if (err) {
      console.log("Error: could not READ from database. The error is: " + err);
    } else {
      res.render("post", {
        entry: data                           // These are entries from the DATABASE (an array of documents (JSON Objects)) 
      });                                     // 'entries' array is passed via EJS to 'template.ejs' 
    }
  });
});
app.post("/posts/:postTitle", function(req, res){   // Assume posts to a specific entry are DELETE operations
  //console.log(req.body.deleteItemID);       // Data from the page
  BlogEntry.deleteOne( {_id: req.body.deleteItemID}, function(err) {
    if (err) {
      console.log(err); 
    } else {
      console.log("Successful deletion"); 
      //console.log(req.body.deleteItemID);
      res.redirect("/");                      // Redirect to home page AFTER DELETE
    }
  });
  
});

// Get for '/contact' route - render based on 'template'
app.get("/contact", function(req, res) {
  res.render("template", {
    posts: aboutObjects
  }); 
});

// Get for '/about' route - render based on 'template'
app.get("/about", function(req, res) {
  res.render("template", {
    posts: contactObjects
  }); 
});

// Listen for incoming requests on port 3000
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
