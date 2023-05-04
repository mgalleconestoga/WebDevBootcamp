/* To-do list app
 * Author: Michael Galle
 *
 */

/* Initial setup terminal commands */ 
// npm init
// npm install express ejs

// Variables
let list = [];                                              // Empty to-do list

// Custom module code
const dayname = require(__dirname + "/day.js");

// Boiler plate app startup code
const express = require("express");
const app = express();

app.use(express.json());                                    
app.use(express.urlencoded({extended: true}));              // Get data submitted in get/post requests via req.body object
app.use(express.static("public"));                          // Place supporting files (e,g images, CSS, JS files) in a location (i.e. 'public' folder that static files (html/css/javascript) can be served from - 'public' is the name of the folder with files that are publicly accessible. It is now the new root directory

app.set('view engine', 'ejs');                              // Set the view engine of the app to ejs

// Server code 
app.get("/", function(req, res){
    // Background code (hidden)
    /*
        var today = new Date();
    var curDay = today.getDay();                                // Method of Date object to get day of week
    var day = ""; 
    switch (curDay) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
    
        default:
            day = "Error";
            console.log("Error: current day is equal to " + day); 
            break;
    }
    if(curDay === 6 || curDay === 0) {
        // Single line of text
        //res.send("<h1>Yay! It's the weekend</h1>");      
        
        // Multiple lines of text
        //res.write("<h1>Yay! It's the weekend</h1>");
        //res.write("<p>I don't have to work</p>");
        //res.send();

        // Single File (different html file depending on day) - problem need multiple html files (repetitive)
        //res.sendFile(__dirname + "/weekend.html");    
        
        // Use EJS (Embedded JavaScript http://ejs.co) template so single file can be used regarless of day (less work)
        day = "Weekend";        // See res.render() after the if-else block

    } else {
        // Single line of text
        //res.send("<h1>It's a workday</h1>");

        // Multiple lines of text
        //res.write("<h1>It's a workday</h1>");
        //res.write("I have to do work, booooo");
        //res.send();

        // Single File (different html file depending on day) - problem need multiple html files (repetitive)
        //res.sendFile(__dirname + "/weekday.html");                

        // Use EJS (Embedded JavaScript http://ejs.co) template so single file can be used regarless of day (less work)
        day = "Weekday";
        
    }
    res.render('list', {dayOfWeek: day});  // render uses the view engine above to render list.ejs which must be in the 'views' folder
                                           // Data is passed in JSON object with name:value pairs
    */

    let day = dayname.getDate();                            // This runs the getDay() of the module
    //let day = dayname.getDate();                          // This runs the getDate() of the module
    
    // Render template and pass data via JSON object
    res.render('list', {
        dayOfWeek: day,
        myList: list
    });

});

app.post("/", function(req, res){    
    list.push(req.body.newItem); 
    // Rirect back tom home route to re-render (as a get() request)
    res.redirect("/");                                             
});

app.get("/about", function(req,res){
    res.render('about');
});

app.listen(3000, function() {
    console.log("Server started, listening on port 3000"); 
});