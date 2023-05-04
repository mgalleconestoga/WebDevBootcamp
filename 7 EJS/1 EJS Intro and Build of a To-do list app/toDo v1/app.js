const express = require("express"); // npm init && npm install express
const app = express();

// Import custom node package
const dateObj = require(__dirname + "/date.js");    // custom node module OBJECT (object has methods getDate() and getDay())

// Set express() parameters
app.use(express.json());                            // JSON encode data
app.use(express.urlencoded({ extended: true, }));   // To be able to use req.body to read submitted data from get/post requests
app.set("view engine", "ejs");                      // This is how to use EJS - after installing it via: npm install ejs
app.use(express.static("public"));                  // Use the 'public' folder as a static folder. "public" is the name of the folder with files that are publicly accessible. It is now the new root directory

// Lists for TWO web pages (regular 'to-do' list and 'work to-do list') that BOTH use list.ejs as a template)
let items = ["Buy food", "Cook food", "Eat food"]; // Array to store new items for to-do list. Items added via post requests from app.post() [after redirect to app.get()]
let workItems = ["Build tech", "Make websites", "Sell shares"]; // Array for work to-do list

// Get Date Info 
let day = dateObj.getDay();                         // similar data as getDate()[0], just created a new function getDay() to show how multiple functions are included in the object created / require()'ed from a custom module 
let date = dateObj.getDate()[1];

// To do list is at base ("/") route - data based on 'items' array
app.get("/", function (req, res) {
  // Use EJS to render based on the template (run code here and pass result to EJS template). Note can also run code in the EJS file as well.
  res.render("list", {
    // res.render() is a method of the res object that connects to EJS files inside the 'views' folder
    listTitle: "To Do List",
    kindOfDay: day, // list refers to the file list.ejs which is in views/list.ejs  (MUST be in a foler called 'views')
    fullDate: date, // Full date string
    newItems: items, // passed the redirect() from app.post()
    route: "/", // target for action in the form
  });
});
app.post("/", function (req, res) {
  let postedItem = req.body.newItem;
  if (postedItem != "") {
    items.push(req.body.newItem); // store the value in global variable item
  }
  res.redirect("/"); // redirect to the home route keeping the value of item and passing to res.render()
});

// Work to do list is at ("/work") route - data based on 'workItems' array
app.get("/work", function (req, res) {
  // Use EJS to render based on the template (run code here and pass result to EJS template). Note can also run code in the EJS file as well.
  res.render("list", {
    // res.render() is a method of the res object that connects to EJS files inside the 'views' folder
    listTitle: "Work To Do List",
    kindOfDay: day, // list refers to the file list.ejs which is in views/list.ejs  (MUST be in a foler called 'views')
    fullDate: date, // Full date string
    newItems: workItems, // passed the redirect() from app.post()
    route: "/work", // target for action in the form. Alternative is for the button in the form to have a dufferent name/value pair which identifies the array to add the new data to
  });
});
app.post("/work", function (req, res) {             // *** Alternative to having separate app.post() calls is to have the form post to the ("/") route and then add the data to the correct array depending on the 'route' value submitted by the form (allows for single yet complex app.post("/") )
  let postedItem = req.body.newItem;
  if (postedItem != "") {
    workItems.push(req.body.newItem); // store the value in global variable item
  }
  res.redirect("/work"); // redirect to the work route keeping the value of item and passing to res.render()
});

// about page
app.get("/about", function(req, res){
    res.render("about");                            // Render the about.ejs page
});

// Set up listening port
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
