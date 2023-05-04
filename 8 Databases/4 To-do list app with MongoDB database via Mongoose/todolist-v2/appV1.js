// Version 2: Replace the items and workItems arrays with MongoDB database (collections)
// See: https://mongoosejs.com/ 
// Need to run the MongoDB server via > mongod in separate terminal to start the database
// Run this via: node app.js or nodemon app.js
// Then start MongoDB server by opening up a dedicated terminal and run > mongod
// Then go to http://localhost:3000

const express = require("express");                 // npm init && npm install express
const mongoose = require("mongoose");               // NEW: npm install mongoose 
const app = express();
const conn = mongoose.createConnection("mongodb://localhost:27017/toDoDB");    // NEW: Create connection to the toDoDB database

// Create Schemas and Models for the Collections - NEW in v2
const toDoSchema = new mongoose.Schema({name: String});         // NEW: Schema (collection structure / data type)
const workSchema = new mongoose.Schema({name: String});         // NEW: Schema (collection structure / data type)
const ToDoList = conn.model("todo", toDoSchema);    // NEW: Model: Constructor for an object (document) that can be added to the "todos" (automatically pluralised) collection
const WorkList = conn.model("work", workSchema);    // NEW: Model

// Import custom node package
const dateObj = require(__dirname + "/date.js");    

// Set express() parameters
app.use(express.json());                            // OLD
app.use(express.urlencoded({ extended: true, }));   // OLD
app.set("view engine", "ejs");                      // OLD
app.use(express.static("public"));                  // OLD

// Get Date Info 
let day = dateObj.getDay();                         // OLD
let date = dateObj.getDate()[1];                    // OLD

// To do list is at base ("/") route - data based on 'items' array
app.get("/", function (req, res) {
  // NEW: READ from MongoDB database via the find() method of the ToDoList model that connects to the "todos" collection
  ToDoList.find(function(err, data){
    if (err) {
      console.log("Error: Could not READ from database. The error is: " + err); 
    } else {
        res.render("list", {
          listTitle: "To Do List", kindOfDay: day, fullDate: date, route: "/",    // OLD
          items: data, // NEW: FROM DATABASE - This is an ARRAY of JSON objects (documents) taken from the database
        });
    }
  });
});
app.post("/", function (req, res) {
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

// Work to do list is at ("/work") route - data based on 'workItems' array
app.get("/work", function (req, res) {
  WorkList.find(function(err, data){
    if (err) {
      console.log("Error: Could not READ from database. The error is: " + err);
    } else {
        res.render("list", {
          listTitle: "Work To Do List", kindOfDay: day, fullDate: date, route: "/work",   // OLD
          items: data, // NEW: data comes from the database and is an array of objects (documents) 
        });
    }
  }); 
});
app.post("/work", function (req, res) { 
  let postedItem = req.body.newItem;
  let deleteItemID = req.body.deleteItemID;

  if (postedItem !== undefined && postedItem != "") {
    // NEW: INSERT new item to the collection
    const workListItem = new WorkList ({name: postedItem });                  // NEW: document created using Model (constructor)
    workListItem.save().then(() => {                                          // NEW: Save to todos collection in the database
      console.log("Successful insertion"); 
      console.log(postedItem);
      res.redirect("/work");                                                  // Refresh page AFTER INSERT
    });    
  } else {
    // NEW: DELETE the item from the database
    WorkList.deleteOne( {_id: deleteItemID }, function(err){                  // Alternative: use function .findByIdAndRemove(id, options, callbackFunction {})
      if (err) {
        console.log(err); 
      } else {
        console.log("Successful deletion"); 
        console.log(deleteItemID);
        res.redirect("/work");                                                 // Refresh page AFTER DELETE
      }
    });
  }
});

// about page
app.get("/about", function(req, res){
    res.render("about");                            // Render the about.ejs page
});

// Set up listening port
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
