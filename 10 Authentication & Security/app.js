// > git init
// > npm init -y, > npm i express ejs mongoose lodash mongoose-encryption dotenv md5 bcrypt passport passport-local passport-local-mongoose express-session passport-google-oauth20 passport-facebook passport-linkedin-oauth2 mongoose-findorcreate
// Start Mongo server: > mongod
// Go to http://localhost:3000
// Can go into the database by opening up another terminal and typing: > mongo  (show dbs, use <dbname>, show collections, db.<collection name>.find())

require("dotenv").config();                         // Level 2.5 (need to place at top of file) > npm i dotenv, > touch .env  (Hidden environment variables file to keep secrets), touch .gitignore, echo .env > .gitignore (prevent .env from being added to git so it is not uploaded to GitHub etc.). There is a template .gitignore file for various types of projects (e.g. Google: Node.gitignore) https://github.com/github/gitignore/blob/main/Node.gitignore that you can copy. 
const express = require("express");                 // This is an expressJS app
const ejs = require("ejs");                         // Not sure why this is required - it was not previously ...
const _ = require("lodash");                        // > npm install lodash
const mongoose = require("mongoose");               // > npm install mongoose
const encrypt = require("mongoose-encryption");     // Level 2 > npm i mongoose-encryption  - Used for the encryption in Level 2 Encryption as well as for Authentication in Level 3?
const md5 = require("md5")                          // Level 3 > npm i md5  - Used to hash passwords (see: https://www.npmjs.com/package/md5  for details)
const bcrypt = require("bcrypt");                   // Level 4 > npm i bcrypt - Used for Salting and hashing (see: https://www.npmjs.com/packages/bcrypt). 
                                                    // Note: bcrypt version must be compatible with the version of node you are using (see docs). Only 'Stable' versions are supported
                                                    // If need to downgrade your version of Node (if you are not on a stable release or get errors after trying to install bcrypt) to latest stable release
                                                    // install nvm (node version manager). To do this go to https://github.com/nvm-sh/nvm/blob/master/README.md to see how to install the latest version
                                                    // curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash     (version number changes usually). After install then restart your  terminal.
                                                    // > nvm install <latest version number> 
const saltRounds = 10;                              // Level 4: See explanation of salt rounds for bcrypt in Level 4 below
const session = require("express-session");         // Level 5 > npm install express-session
const passport = require("passport");               // Level 5 > npm install passport  (see: www.passportjs.org/docs/)
const passportLocalMongoose = require("passport-local-mongoose"); // Level 5 > npm install passport-local-mongoose passport-local
const GoogleStrategy = require("passport-google-oauth20").Strategy; // Level 6 (OAuth) > npm install passport-google-oauth20.  It is configured as a Passport Strategy
const FacebookStrategy = require("passport-facebook").Strategy;      // Level 6 (OAuth) > npm install passport-facebook  (for details see 'strategies' at https://www.passportjs.org/packages/  ). Instructions at: https://goldplugins.com/documentation/wp-social-pro-documentation/how-to-get-an-app-id-and-secret-key-from-facebook/
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;  // Level 6 (OAuth) > npm install passport-linkedin-oauth2
const findOrCreate = require("mongoose-findorcreate"); // Level 6: callback function to find or create a new user after authentication  > npm install mongoose-findorcreate

// Instantiate the app
const app = express();                              

// Set express() & ejs parameters
app.use(express.json());                            // JSON encode data
app.use(express.urlencoded({ extended: true, }));   // To be able to use req.body to read submitted data from get/post requests
app.set("view engine", "ejs");                      // This is how to use EJS - after installing it via: npm install ejs
app.use(express.static("public"));                  // Use the 'public' folder is a static folder that stores our static html/css/etc files. "public" is the name of the folder with files that are publicly accessible. It is now the new root directory

app.use(session({                                   // Level 5: 'session' comes from the require("express-session"). This must be placed before createConnection() and at the end of the app.use() list 
    secret: "ALongSecretString",                    // This string can be stored in our .env file
    resave: false, 
    saveUninitialized: false                        // See documentation at: https://www.npmjs.com/package/express-session
}));
app.use(passport.initialize());                     // Level 5: Method used to initialize passport for authentication (initializes the passport package)
app.use(passport.session());                        // Level 5: Method used to initialize passport to set up sessions (use passport for dealing with sessions)

// Set up accounts database (email and password) 
const conn = mongoose.createConnection("mongodb://localhost:27017/userDB"); // Create LOCAL connection to the userDB database 
const userSchema = new mongoose.Schema({
    email: String, 
    password: String, 
    googleId: String,                                // Level 6: Added to use OAuth with Google ID
    facebookId: String,                              // Level 6: Added to use OAuth with Facebook ID (need developer account - not yet working)
    linkedInId: String,                              // Level 6: Added to use OAuth with LinkedIn ID
    secret: String                                   // The secret submitted by the user   
});   

///////////////////////// Authentication Levels - comment out all but one level //////////////////////////////
//-Level 1 username and password only               // Username and password in clear text

//-Level 2: Encrypted passwords                     // Using mongoose-encryption (https://www.npmjs.com/package/mongoose-encryption) - Encrypted passwords (see www.cryptii.com for simple examples) 
//const secret = "ThisIsTheSecretEncryptionKey!";   // The secret key used for encryption (Never do this). 
                                                    // WARNING: Someone could get access to this file and see the key (E.g. if this is published to github then people can get these keys and decrypt the database)
                                                    // Problem will be solved by using environment variables (Level 2.5 - dotenv package and .env file)
//userSchema.plugin(encrypt, {secret: secret, encryptedFields: ['password'] }); // IMPORTANT: Must add the plugin to the Schema BEFORE creating the MODEL. 
                                                    // Adding a mongoose-encrypt as a plugin to userSchema to extend its functionality. 
                                                    // This one uses the secret to encrypt only the "password" field of the database. 
                                                    // It automatically calls encrypt on save() and decrypt on find() so you dont have to do anything
                                                    // Comment out this plugin to remove Level 2 Encryption and use Level 1
                                                    // No change in code below (vs. Level 1) since using the plugin automatically calls encrypt on save() and decrypt on find() so you dont have to do anything
    //-Level 2.5: Using Environment Variables (inside a .env file) to HIDE the secret key (See .env file for the format) instead of keeping keys in app.js
    //console.log(process.env.API_KEY);             // How to access environment variables
    //const secret = process.env.SECRET;            // Get the key from the .env file
                                                    // If publishing to Heroku there is a specific way to enter these 'config variables' into the dashboard

//-Level 3: Hashing the password (a one way operation) - Store the hashed password and compare it to hash of password input by user
    //-Method does not have a vulnerable encryption/decryption key to worry about
    //-Uses the hash function md5() to hash the password, then compare hashed passwords 
    //-Uncomment the Level 3 lines of code below to see it in action
    //-Up to level 3 can be hacked/leaked easily by:
    //      - Comparing hashes of common passwords to the hashes stored in the database to figure out the password
    //      - Use a GPU (20,000,000,000 MD5 hashes/s) to create hashes of all words in a dictionary (dictionary attack), telephone numbers in phonebook (directory attack), various combinations of characters and compare them to the hashes in the database to figure out the password
    //      - Use databases of hashes of common passwords and compare (Google search the hash itself to get the match)
    //      - Cool website to check password strength: http://www.password-checker.online-domain-tools.com

//-Level 4: Salting and Hashing passwords with bcrypt instead of MD5
//          - A salt is a random set of characters added to the end of the password 
//          - Combining the password and a random 'salt' to generate the hash means that the same password will not generate the same hash (harder for hacker to crack via comparison to datasets of hashes of known words)
//          - Both the 'salt' and the 'hash' are stored in the database (no passwords stored)
//          - Use bcrypt instead of MD5 since GPU's can generate 20 billion MD5 hashes/s but only 17k bcrypt hashes/s 
//            so it is harder to crack by brute force. Even with salting a hacker can generate datasets of the hashes 
//            of combination of passwords and salts. Using bcrypt makes it take longer (e.g. 3s vs 8 months).\
//          - 'salt rounds' - You can add the salt to the end of the hash and then rehash. Each time you do this is a new salt round. hash = password + salt, then hash = hash(hash + salt) recursivley. 

//-Level 5 (can use in conjunction with Level 6): Cookies and Sessions
//          - In Chrome you can see the cookies stored in your browser by going to Settings and searching for Cookies. There is an option to 'See all cookies and site data'
//          - Cookies have Session Token, Session ID that correspond to data on the server.
//          - Session Cookies: A session is a period of time when user is authenticated and logged into a website. Session cookies enable you to stay logged in, until they are destroyed.
//          - We will use 'Passport.js' to add cookies and maintain/destroy sessions
//          - To use it we will use our constant 'session'
userSchema.plugin(passportLocalMongoose);       // Add the passportLocalMongoose plugin to userSchema so that it is given the methods to salt and hash the passwords and to connect to the database (see plugin we used in Level 2 for another example of plugins)

//-Level 6: OAuth - Open Authorization
//          - Open standard for token-based authorization
//          - Permission to access a social network account - Main capability: sign-in manually or *** login with (facebook, gmail, linked-in, etc.)***
//          - Additional capability: Get request to social network for users/emails connected with an account so can add users
//          - Delegate the task of authentication to Google, Facebook, etc. using the username/password for those accounts
//          - 1. Granular Access: details can be provided
//          - 2. Read and/or write access
//          - 3. Revoke access - Third party should have capability to de-authorize access from their website/side
//          - Setup Steps: PassportJS.org is used - see 'strategies' at https://www.passportjs.org/packages/ ((E.g. Google auth register application (as described at https://www.passportjs.org/packages/passport-google-oauth20/) on the Google website: https://console.cloud.google.com/projectselector2/apis/dashboard?pli=1&supportedpurview=project )
//          - Step 1. Creating an Application: Go to OAuth consent screen to complete details. Then click on credentials > + Create Credentials > OAuth client ID. > Web application. For Authorized Javascript origins use: http://localhost:3000 (temp) and for Authorized redirect URI use: http://localhost:3000/auth/google/secrets. Once created you sill get a Client ID and client secret from Google. Copy these to the .env file 
//          - Step 2. Redirect to third party site to log in (site they trust like Google login)
//          - Step 3. User reviews permissions
//          - Step 4. Auth code (Ticket - short term validity) sent to our website 
//          - Step 5. Use Auth code to request Access Token (long term validity)
// Callback function plugin - used to find or create a new user after authentication by third party (Google)
userSchema.plugin(findOrCreate);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const User = conn.model("user", userSchema);        // Model (constructor) that connects to the "users" collection (automatically all lower case and pluralized)

// Levels 5+: Configure the User using passport-local configurations (see the docs for Level 5)
passport.use(User.createStrategy());                // User creation strategy. Authenticate based on userSchema content 
//passport.serializeUser(User.serializeUser());       // Serialize user session - create cookies with user ID (local authentication only)
//passport.deserializeUser(User.deserializeUser());   // De-serialize user session - open cookies to reveal contents (identification) (local authentication only)
passport.serializeUser(function(user, done){        // Level 5/6 - Any kind of authentication (local/third party)
    done(null, user.id);                            // Saves based on _id field in database
});         
passport.deserializeUser(function(id, done){        // Level 5/6 - Any kind of authentication (local/third party)
    User.findById(id, function(err, user) {         // Finds user by _id in our local database (creates it if none of the fields match) and then provides the user data back
        done(err, user);
    });
});     

// Level 6: OAuth (Google OAuth example) - Use the Google Strategy for loging in our user
// Google
passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/secrets",            // This was input into the Google API dashboard - Where the user is redirected back to on our site once authenticated
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"      // Handles deprecation of Google+. This gets the info from 'userInfo' (another endpoint on Google) instead of their Google+ account, which is deprecated
    }, 
    function(accessToken, refreshToken, profile, cb) {                       // Callback that gives us the accessToken, profile from Google
        //console.log(profile);                                              // Log the data we get back from Google after user is authenticated. You will see the Google ID here (this will be saved to our database)
        User.findOrCreate({ googleId: profile.id }, function (err, user) {   // Callback function that you must either create or you can use a mongoose package with this name (has same format as shown here)
            return cb(err, user);                                            // The mongoose npm package findorcreate could be used and you could keep this code unchanged by simply installing, requiring and installing it as a plugin to the schema
        });                                                                  // > npm install mongoose-findorcreate, require("mongoose-findorcreate")
    }                                                                        // The user data is returned after authentication in the cb() and the user is added to our database using mongoose
));                                                                          // findOrCreate() is doing a search based on googleId. If it does not find the googleId in the database then it will create a new entry

// Facebook - Need Facebook developer account (see .env file and enter the data once set up)
/*
passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,   
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/secrets"            // This must be input into the Facebook API dashboard - Where the user is redirected back to on our site once authenticated
    }, 
    function(accessToken, refreshToken, profile, cb) {                       // Callback that gives us the accessToken, profile from Facebook
        //console.log(profile);                                                // Log the data we get back from Facebook after user is authenticated. You will see the Facebook ID here (this will be saved to our database)
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {   // Callback function that you must either create or you can use a mongoose package with this name (has same format as shown here)
            return cb(err, user);                                            // The mongoose npm package findorcreate could be used and you could keep this code unchanged by simply installing, requiring and installing it as a plugin to the schema
        });                                                                  // > npm install mongoose-findorcreate, require("mongoose-findorcreate")
    }                                                                        // The user data is returned after authentication in the cb() and the user is added to our database using mongoose
));     
*/   

// LinkedIn: see: https://www.passportjs.org/packages/passport-linkedin-oauth2/  and https://www.linkedin.com/pulse/how-get-signin-linkedin-work-taric-andrade/
// Created testLoginApp on LinkedIn: https://www.linkedin.com/company/84800416/admin/ 
passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,                                    // Need to set up at LinkedIn developer: https://www.linkedin.com/developers/apps/new  
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/linkedin/secrets",            // This was input into the LinkedIn API dashboard (Authorized redirect URLs) - Where the user is redirected back to on our site once authenticated
    scope:['r_emailaddress', 'r_liteprofile'],
    }, 
    function(accessToken, refreshToken, profile, cb) {                       // Callback that gives us the accessToken, profile from Google
        process.nextTick(function(){
            //console.log(profile.id);                                              // Log the data we get back from Google after user is authenticated. You will see the Google ID here (this will be saved to our database)
            User.findOrCreate({ linkedInId: profile.id }, function (err, user) {   // Callback function that you must either create or you can use a mongoose package with this name (has same format as shown here)
                return cb(err, user);                                            // The mongoose npm package findorcreate could be used and you could keep this code unchanged by simply installing, requiring and installing it as a plugin to the schema
            });
        });
                                                                          // > npm install mongoose-findorcreate, require("mongoose-findorcreate")
    }                                                                        // The user data is returned after authentication in the cb() and the user is added to our database using mongoose
));                                                                          // findOrCreate() is doing a search based on googleId. If it does not find the googleId in the database then it will create a new entry


// Routes
/* ********************************************************************************************* */
app.route("/")
    .get(function(req, res){
        res.render("home"); 
    });

app.route("/register")
    .get(function(req, res){
        res.render("register"); 
    })
    .post(async function(req, res){                                         // Make asynchronous (use asynch/await for bcrypt)                           
        // PASSWORDS (comment out all levels but the one used)
        //const password = req.body.password;                               // Level 1 and 2 (Level 2: encrypt plugin encrypts automatically called on save(), decrypts automatically on find())
        //const password = md5(req.body.password);                          // Level 3 - Hashing the password                              
        //const password = await bcrypt.hash(req.body.password, saltRounds);// Level 4 - Hashed password - Hashing and salting with a number of saltRounds (can use await since the library returns a promise allowing for async/await to be used). https://stackoverflow.com/questions/48799894/trying-to-hash-a-password-using-bcrypt-inside-an-async-function
        
        // Save new user to database (Levels 1-4)
        /*
        const newUser = new User({"email": req.body.username , "password": password });      // Data from form submitted  
        newUser.save(function(err){                                                 
            if (!err) {
                console.log("User " + req.body.username + " successfully added");
                res.render("secrets");
            } else {
                console.log("Error adding user: " + err); 
            }
        });
        */

        // Level 5+ (can use in conjunction with Level 6): Sessions (uses passport-local-mongoose to salt and hash)
        User.register({username: req.body.username}, req.body.password, function(err, user) {   // Add User/password to database. No error (err) if successful. The register() method comes from the passport-local-mongoose plugin (don't need to create and save the new user or interact with Mongoose directly if we use the plugin - it is already built into the method)
            if (err) {
                console.log(err);
                res.redirect("/register"); 
            } else {                                                                // No error - successful login. Save the Session Cookie. Session cookie matches one that exists on the server. 
                passport.authenticate("local")(req, res, function(){                // Authenticate locally using username/password db
                    res.redirect("/secrets");                                       // Direct them to the secrets route - this route must exist
                });
            }
        });            
    });

app.route("/login")
    .get(function(req, res){
        res.render("login"); 
    })
    .post(function(req, res){
        // Password entered by user
        //const enteredPassword = req.body.password;                            // Levels 1-2 (Level 2: encrypts automatically called on save(), decrypts automatically on find())
        //const enteredPassword = md5(req.body.password);                       // Level 3 - Hashing the password 
        //const enteredPassword = req.body.password;                            // Level 4 - Salting and Hashing with bcrypt
        
        // Levels 1-4: Password stored in database (compare to enteredPassword)  
        /*                                         
        User.findOne({"email": req.body.username }, async function(err, foundUser){    // asynchronous to use async/await with bcrypt         
            if (!err) {
                if (foundUser) {
                    // if(enteredPassword == foundUser.password) {                // Levels 1-3 
                    //     console.log("Username and password are correct");         
                    //     res.render("secrets");
                    // } 
                    
                    // Callback function syntax                                   // Level 4
                    // bcrypt.compare(req.body.password, foundUser.password, function(err, result) { // Level 4 - Salting and Hashing with bcrypt. Returns 'true' if match    
                    //     if(result == true) {
                    //         console.log("Username and password are correct");         
                    //         res.render("secrets");
                    //     } else {
                    //         console.log("Credentials are incorrect"); 
                    //         res.redirect("/");
                    //     }
                    // }); 
                
                    // Alternative: Async/await syntax                            // Level 4
                    // const result = await bcrypt.compare(req.body.password, foundUser.password);   // This function has access to saltRounds from the .hash() operation
                    // if(result == true) {
                    //     console.log("Username and password are correct");         
                    //     res.render("secrets");
                    // } else {
                    //     console.log("Credentials are incorrect"); 
                    //     res.redirect("/");
                    // }
                } else {
                    console.log("User not found");
                }
            } else {
                console.log(err); 
            }
        });
        */ 
    
        // Level 5 and up: Sessions (passport-local-mongoose used for authenticating via salting and hashing)
        const user = new User({ username: req.body.username, password: req.body.password}); 
        req.login(user, function(err){                                              // Login method from passport (passes user info to the request (req) object. No error (err) if successful login
            if (err) {
                console.log(err);                   
            } else {
                passport.authenticate("local")(req, res, function(){                // Authenticate locally using the username/password db and save a Session Cookie based on the req. Callback is triggered if successful 
                    res.redirect("/secrets");                                       // Success = direct to the /secrets route - this route must exist
                });
            } 
        });                                
    });

// Level 6 (OAuth route): Details at www.passportjs.org/packages/passport-google-oauth20/
// Google
app.get("/auth/google",                                                              // Needs to use app.get() and not app.route()
        passport.authenticate("google", { scope: ["profile"] }));                    // This line of code brings up a popup that allows the user to authenticate to their Google user account - Get Google profile info. On success, google will redirect user back to our website
                                                                                     // Upon sign-in the user is redirected to the 'Authorized redirect URI' that we set up in Google, in this case: '/auth/google/secrets'
app.get("/auth/google/secrets",                                                      // This must match the redirect URI
        passport.authenticate("google", { failureRedirect: "/login"}),               // After Google authenticates the user (user isAuthenticated() also in Passport and a session is set up) the user is directed to the secrets page. Failure route sends them back to "/login"
        function(req, res) {
            // Successful authentication, redirect to secrets page
            res.redirect("/secrets");
});
// Facebook
app.get("/auth/facebook",                                                            // Needs to use app.get() and not app.route()
        passport.authenticate("facebook", { scope: ["profile"] }));                  // This line of code brings up a popup that allows the user to authenticate to their Facebook user account - Get Facebook profile info. On success, Facebook will redirect user back to our website
                                                                                     // Upon sign-in the user is redirected to the 'Authorized redirect URI' that we set up in Facebook, in this case: '/auth/facebook/secrets'
app.get("/auth/facebook/secrets",                                                    // This must match the redirect URI
        passport.authenticate("facebook", { failureRedirect: "/login"}),             // After Google authenticates the user (user isAuthenticated() also in Passport and a session is set up) the user is directed to the secrets page. Failure route sends them back to "/login"
        function(req, res) {
            // Successful authentication, redirect to secrets page
            res.redirect("/secrets");
});
//LinkedIn - see: https://www.passportjs.org/packages/passport-linkedin-oauth2/
app.get("/auth/linkedin",                                                            // Needs to use app.get() and not app.route()
        passport.authenticate("linkedin", { state: true }),                          // This line of code brings up a popup that allows the user to authenticate to their LinkedIn user account - Get LinkedIn profile info. On success, LinkedIn will redirect user back to our website
        function(req, res){
            // This function is not called since request is sent to LinkedIn to suthenticate
        });                                                                          
                                                                                     // Upon sign-in the user is redirected to the 'Authorized redirect URI' that we set up in LinkedIn, in this case: '/auth/linkedin/secrets'
app.get("/auth/linkedin/secrets", passport.authenticate("linkedin", {                // This must match the redirect URI
    successRedirect: "/secrets", 
    failureRedirect: "/login"      
}));                                                                                  // After LinkedIn authenticates the user (user isAuthenticated() also in Passport and a session is set up) the user is directed to the secrets page. Failure route sends them back to "/login"
        



// Display all the secrets submitted
app.route("/secrets")
    .get(function(req, res){
        User.find({secret:{$ne: null}}, function(err, foundUsers) {                    // Check the users collection and find fields where 'secrets' field is not equal to null
            if (err) {
                console.log(err);
            } else {
                if(foundUsers) {
                    res.render("secrets", {usersWithSecrets: foundUsers });            // Pass to secrets page via ejs 
                }
            }
        });                   
        
    });

// Level 5 and up (This route should only exist for level 5 and up)
app.route("/logout")
    .get(function(req, res){
        req.logout();                                       // logout() method from Passport (www.passportjs.org/docs/logout). This destroys  the session cookie so you can't see protected content.
        res.redirect("/");
    });



// Level 5 & 6 can use this code - don't render directly
app.route("/submit")
    .get(function(req, res){
        // Check if the user is authenticated/logged in
        if(req.isAuthenticated()) {                         // If user is authenticated/logged in by Passport
            res.render("submit"); 
        } else {
            res.redirect("/login");
        }
    })
    .post(function(req, res){
        // Submit a new secret to the secrets database
        const submittedSecret = req.body.secret; 

        // Find current user and save to their file
        //console.log(req.user);                                          // Stores the currently logged in user info
        User.findById(req.user.id, function(err, foundUser){              // Get the user with the currently logged in ID
            if (err) {
                console.log(err);
            } else {
                if(foundUser) {
                    foundUser.secret = submittedSecret;                     // Set the 'secret' to the text submitted in the post is saved (see userSchema for fields in collection)
                    foundUser.save(function() {                             // Save the user data to the document in the collection
                        res.redirect("/secrets");                           // Redirect them back to the secrets page
                    });                                       
                }
            }
        }); 
    });


app.listen(3000, function(){
    console.log("Server started in port 3000"); 
});
