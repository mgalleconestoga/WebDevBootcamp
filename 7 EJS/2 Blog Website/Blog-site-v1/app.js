// npm init
// npm i express body-parser ejs
// npm i -g npm && npm i --save lodash (install Lodash per lodash.com) 
// Note: If you download a project from GitHub and you get the package.json file then all you have to do is type > npm install
//       This will install all the dependencies listed and yo udon't have to add them individually as above

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));                     // Alternative: app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

// Variables
const posts = [];
const _ = require('lodash');                                            // Load the full lodash build

// Home
app.get("/", function(req, res){
  res.render("home", {content: homeStartingContent,
                      posts: posts
  });                                                 
});

// About
app.get("/about", function(req, res){
  res.render("about", {content: aboutContent});                                                 
});

// Contact
app.get("/contact", function(req, res){
  res.render("contact", {content: contactContent});                                                 
});

// Compose
app.get("/compose", function(req, res){
  res.render("compose");                                                 
});

app.post("/compose", function(req, res){
  let postObject = { 
    title: req.body.postTitle,
    content: req.body.postContent,
    truncatedContent: _.truncate(req.body.postContent, {'length': 100, 'separator': ' '})  
  };
  //console.log(postObject);
  posts.push(postObject);                       // Array of objects 
  res.redirect("/");                                                           
});

// Make a page for each post. The post title is used. 
app.get("/post/:title", function(req, res){     // Express route parameter indicated by ':'. Note you can have multiple parameters.
  // Find the post with the title
  const requestedTitle = _.lowerCase(req.params.title); // value input in browser or html link (This is an express 'route parameter')
  posts.forEach(function(post){
    const storedTitle =  _.lowerCase(post.title);        // Use lodash so that title capitalization and hyphens do not matter
    if(requestedTitle === storedTitle) {              
      res.render("post", {
        title: post.title, 
        content: post.content
      });
    } 
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
