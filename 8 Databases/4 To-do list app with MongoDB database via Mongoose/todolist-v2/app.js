// Version 2: Replace the items and workItems arrays with MongoDB database (collections)
// See: https://mongoosejs.com/ 
// Need to run the MongoDB server via > mongod in separate terminal to start the database
// Run this via: node app.js or nodemon app.js
// Then start MongoDB database server by opening up a dedicated terminal and run > mongod  (mongodb://localhost:27017)
// Then go to the webpage served by app.js at: http://localhost:3000

// NOTE: Simplified app.js to focus on using Express Route Parameters to make custom lists depending on the route (previous version is in appV1.js)

const express = require("express");                 // npm init && npm install express
const mongoose = require("mongoose");               // NEW: npm install mongoose 
const app = express();
// const conn = mongoose.createConnection("mongodb://localhost:27017/toDoDB");    // NEW: Create LOCAL connection to the toDoDB database
const conn = mongoose.createConnection("mongodb+srv://admin-michael:ILovePasswords@cluster0.3ppk9.mongodb.net/toDoDB?retryWrites=true&w=majority"); // NEW: Create REMOTE connection to the toDoDB database

const _ = require("lodash");                        // NEW: npm install lodash    // Ensure first letter of collection name is always capitalized no matter if user types the capital

// Set express() parameters
app.use(express.json());                            // OLD
app.use(express.urlencoded({ extended: true, }));   // OLD
app.set("view engine", "ejs");                      // OLD
app.use(express.static("public"));                  // OLD

// Create Schema that is common for all lists 
const Schema = new mongoose.Schema({name: String});     // OLD    

// To do list is at base ("/") route - data based on 'items' array
app.get("/", function (req, res) {
  const ToDoList = conn.model("todo", Schema);          // OLD - Model that connects to "todos" collection
  // NEW: READ from MongoDB database via the find() method of the ToDoList model that connects to the "todos" collection
  ToDoList.find(function(err, data){
    if (err) {
      console.log("Error: Could not READ from database. The error is: " + err); 
    } else {
        res.render("list", {
          listTitle: "To Do List", route: "/",    // OLD
          items: data, // NEW: FROM DATABASE - This is an ARRAY of JSON objects (documents) taken from the database
        });
    }
  });
});
app.post("/", function (req, res) {
  const ToDoList = conn.model("todo", Schema);                            // OLD 
  let postedItem = req.body.newItem;
  let deleteItemID = req.body.deleteItemID;
  
  if (postedItem !== undefined && postedItem != "") {
    // NEW: INSERT new item to the collection
    const listItem = new ToDoList ({name: postedItem });                  // NEW: document created using Model (constructor)
    listItem.save().then(() => {                                          // NEW: Save to todos collection in the database
      console.log("Successful insertion"); 
      console.log(postedItem) 
      res.redirect("/");                                                  // Refresh page AFTER INSERT
    });    
  } else {
    // NEW: DELETE the item from the database
    ToDoList.deleteOne( {_id: deleteItemID }, function(err){
      if (err) {
        console.log(err); 
      } else {
        console.log("Successful deletion"); 
        console.log(deleteItemID);
        res.redirect("/");                                                // Refresh page AFTER DELETE
      }
    });
  }
});

// Create CUSTOM lists via Express Route Parameters - Just type in a name in the address bar after the "/"
/*************************************************************************************************************** */
app.get("/:listName", function (req, res) {                     // listName can be anything we want. If the collection with that name does not exist, then it is created
  // Access the string in ':listName' via:  req.params.ParamName
  const listName = _.capitalize(req.params.listName);           // NEW: Used lodash to capitalize first letter of string). ALSO: Could check a database of allowed listName's to limit the collections created
  const customList = conn.model(listName, Schema);              // NEW: Create a new Model/collection with listName (in the address) in the database (if it does not already exist)

  customList.find(function(err, data){
    if (err) {
      console.log("Error: Could not READ from database. The error is: " + err);
    } else {
        res.render("list", {
          listTitle: listName, route: "/" + listName,   
          items: data,                                          // NEW: data comes from the database and is an array of objects (documents) 
        });
    }
  });
});

app.post("/:listName", async function (req, res) {              // NEW: Made callback 'async' so could use 'await' in DELETE operation
  // Access the string in ':listName' via:  req.params.ParamName
  const listName = _.capitalize(req.params.listName);           // NEW: Used lodash to capitalize first letter of string). ALSO: Could check a database of allowed listName's to limit the collections created
  const customList = conn.model(listName, Schema);

  const postedItem = req.body.newItem;
  const deleteItemID = req.body.deleteItemID;

  if (postedItem !== undefined && postedItem != "") {
    // NEW: INSERT new item to the collection
    const customListItem = new customList ({name: postedItem });// NEW: document created using Model (constructor)
    customListItem.save().then(() => {                          // NEW: Save to todos collection in the database
      console.log("Successful insertion"); 
      console.log(postedItem);
      res.redirect("/" + listName);                             // Refresh page AFTER INSERT
    });    
  } else if(deleteItemID !== undefined && deleteItemID != "") {
    // NEW: DELETE the item from the database
    // Here is a ANOTHER way to delete and check for errors - NEED TO MAKE THE CALLBACK in app.post() async !!!
    const result = await customList.deleteOne( {_id: deleteItemID });           // NEED TO MAKE THE CALLBACK in app.post() async !!!
    if (result.deletedCount != 1) {
      console.log("Error: item does not exist in collection");
      res.redirect("/" + listName);  
    } else {
      console.log("Successful deletion"); 
      console.log(deleteItemID);
      res.redirect("/" + listName);                                             // Refresh page AFTER DELETE
    }

    /*
    // OLD WAY (using callback function inside deleteOne())
    customList.deleteOne( {_id: deleteItemID }, function(err){                  // Alternative: use function .findByIdAndRemove(id, options, callbackFunction {})
      if (err) {
        console.log(err); 
      } else {
        console.log("Successful deletion"); 
        console.log(deleteItemID);
        res.redirect("/" + listName);                                           // Refresh page AFTER DELETE
      }
    });
    */
  } else {
    console.log("You did not insert or delete to your list");
    res.redirect("/" + listName);                                               // Neither delete nor add to database
  }
});

// about page
app.get("/about", function(req, res){
    res.render("about");                            // Render the about.ejs page
});

// Set up listening port 
let port = process.env.PORT; // (This is for Heroku)
if (port == null || port == "") { 
  port = 3000; 				// This is for local testing
}
app.listen(port, function () {
  console.log("Server started on port: " + port);
});

