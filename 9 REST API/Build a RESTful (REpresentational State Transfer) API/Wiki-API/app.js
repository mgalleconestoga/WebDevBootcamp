// Create database using the MongoDB CRUD commands (Section 26 document) or by using the GUI Editor 'Robo 3T'. CRUD Commands are better though.
// Start MongoDB server > mongod
// Setup DB: > mongo,  > use wikiDB, > db.articles.insertOne({title: "First article" content: "this is the first article" }) do this a few times to add content to db
// > git init, git add . , > git commit -m "Message"
// > npm init -y && npm install express && npm install ejs && npm install mongoose && npm install lodash
// > nodemon app.js (ctrl-c to exit)

const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");           // Use mongoose for database connectivity
const _ = require("lodash");    
//const bodyParser = require("body-parser");

const app = express();                          // Create a new app instance using express

app.set('view engine', 'ejs');                  // ejs files are in the 'views' folder - NOT USED IN THIS API
app.use(express.static("public"));              // Static common files (html, css, etc) are stired in the 'public' folder - NOT USED IN THIS API
app.use(express.urlencoded({ extended: true, }));   // To be able to use req.body etc.

// Create connection to the wikiDB Database and a Schema (data type/object definition for the collection in the database) 
const conn = mongoose.createConnection("mongodb://localhost:27017/wikiDB");    // NEW: Create LOCAL connection to the wikiDB database 
const Schema = new mongoose.Schema({title: String, content: String});     // NEW: Each document (object) has a title and a content section 

// Create a Model that uses the connection and schema
const Article = conn.model("article", Schema);  // Model (constructor) that connects to the "articles" collection (automatically all lower case and pluralized)

// Original way using app.get() or app.post() etc
/********************************************************************************************** */
/*
// GET all the articles 
app.get("/articles", function(req,res){
    Article.find({}, function(err, data){       // No conditions {} means find ALL
        if (err) {
            console.log("Error getting all the articles: \n" + err)
        } else {
            console.log(data); 
            res.send(data);             // Output to browser
        }
    });
});

// POST a new article (Can use 'Postman' (www.getpostman.com or https://www.postman.com/downloads/) to send post requests to test API without having to use a form in the browser)
app.post("/articles", function(req,res){
    const newArticle = new Article ({title: req.body.title, content: req.body.content}); // Data from body of post request (recieved data is in the body of the post request - can do this in postman) where keys are name=title, name=content
    newArticle.save(function(err) {                                 // Can see the new data in the browser by making a GET request
        if (!err) {
            res.send("Successful insertion into database");         // A response to the post request is expected - you can see this in the 'Body' tab of the response in Postman
        } else {
            res.send("Error deleting all articles: " + err);
        }
    });    
});

// DELETE all articles
app.delete("/articles", function(req, res){  
    Article.deleteMany({}, function(err){                           // No conditions {}
        if (!err) {
            res.send("Success, deleted all articles in collection");
        } else {
            res.send("Error deleting all articles: " + err);
        }
    }); 
});
*/
/************************************************************************************************ */

// NEW: Creating 'chainable route handlers' using app.route() method - allows you to respond to .get(), .post(), etc. for a specific route
/************************************************************************************************************************************** */
// Example
/*
app.route("/specialarticle")
    .get    (function (req, res){ res.send("GET special article" )      })
    .post   (function (req, res){ res.send("POST special article")      })
    .delete (function (req, res){ res.send("DELETE special article")    })
    .put    (function (req, res){ res.send("PUT special article")       })
    .patch  (function (req, res){ res.send("PATCH special article")     });         // Semicolon for last one to signal the end of the statement
*/
/*************************************************************************************************************************************** */


/////////////////////////////////Requests Targeting ALL articles///////////////////////////////////////
// NEW: Modify Original way above to use 'chainable route handlers' using app.route() method - This is more commonly used
/**************************************************************************************************************************************** */
app.route("/articles")
    .get(function(req,res){
        Article.find({}, function(err, data){       // No conditions {} means find ALL
            if (err) {
                res.send("Error getting all the articles: \n" + err)
            } else {
                //console.log(data); 
                res.send(data);             // Output to browser
            }
        });
    })
    .post(function(req,res){
        const newArticle = new Article ({title: _.capitalize(_.lowerCase(req.body.title)), content: req.body.content}); // Data from body of post request (recieved data is in the body of the post request - can do this in postman) where keys are name=title, name=content
        newArticle.save(function(err) {                                 // Can see the new data in the browser by making a GET request
            if (!err) {
                res.send("Successful insertion into database");         // A response to the post request is expected - you can see this in the 'Body' tab of the response in Postman
            } else {
                res.send("Error deleting all articles: " + err);
            }
        });    
    })
    .delete(function(req, res){  
        Article.deleteMany({}, function(err){                           // No conditions {}
            if (!err) {
                res.send("Success, deleted all articles in collection");
            } else {
                res.send("Error deleting all articles: " + err);
            }
        }); 
    }); 

/**************************************************************************************************************************************** */

/////////////////////////////////Requests Targeting SPECIFIC articles///////////////////////////////////////
// SPECIFIC Routes (can use _id or title to specify a particular item in the collection to GET, POST, DELETE, PUT, PATCH etc.)
/**************************************************************************************************************************************** */
app.route("/articles/:articleTitle")        // Same route that applies for all HTTP verbs (GET, POST, DELETE, PUT etc)
    .get(function(req, res){                // GET a specific article
        Article.findOne({title: _.capitalize(_.lowerCase(req.params.articleTitle))}, function(err, data){
            if (data) {
                res.send(data);             // Send data to client/browser 
            } else {
                res.send("No articles matching title");   
            }
        });
    })
    .put(function (req, res){               // PUT a specific article (REPLACE an ENTIRE specific article. Note: title and content (the data) are provided in the Body of the request (can do from form or postman)
        Article.replaceOne(                 // could also use .update() and specify overwrite: true 
            {title: _.capitalize(_.lowerCase(req.params.articleTitle))},                        // search filter
            {title: _.capitalize(_.lowerCase(req.body.title)), content: req.body.content},      // new values (must provide data for ALL fields - everything gets replaced) - E.g. change both title and content)
            function(err, data){                                                                // callback
                if (!err) {
                    res.send("Success, replaced article: " + _.capitalize(_.lowerCase(req.params.articleTitle)) + " in collection");  
                } else {
                    res.send("Error replacing article: " + err);
                }
        });
    })                                  
    .patch(function (req, res){             // PATCH a specific article (UPDATE PART OF a specific article - E.g. just the content not the title). Note: title and content (the data) are provided in the Body of the request (can do from form or postman)
        Article.updateOne(                  // Can use .update() with $set as an alternative
            {title: _.capitalize(_.lowerCase(req.params.articleTitle))},                        // search filter conditions
            {content: req.body.content},                                                        // new values - if want to change everything you can enter req.body here                                                 
            function(err, data){                                                                // callback
                if (!err) {
                    res.send("Success, updated article: " + _.capitalize(_.lowerCase(req.params.articleTitle)) + " in collection");  
                } else {
                    res.send("Error updating articles: " + err);
                }
        });
    })
    .delete(function(req,res){              // Could also delete using _id:<specific id> instead of title:articleName
        Article.deleteOne(
            {title: _.capitalize(_.lowerCase(req.params.articleTitle))},                        // search filter conditions
            function(err){                                                                      // callback
                if (!err) {
                    res.send("Success, deleted article: " + _.capitalize(_.lowerCase(req.params.articleTitle)) + " in collection");  
                } else {
                    res.send("Error deleting all articles: " + err);
                }
        }); 
    });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(3000, function(){
    console.log("Server started on port 3000");
});