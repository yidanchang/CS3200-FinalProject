var express = require('express');
var app = express();
// var app = require('./express');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
// app.use(session({ secret: "this is secret!"}));
app.use(session({
    secret: "this is the secret",
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


// configure a public directory to host static content
// app.use(app.express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

var connectionString = 'mongodb://127.0.0.1:27017/cs3200_project'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds135912.mlab.com:35912/heroku_6f8zz41j'; // user yours
}

var mongoose = require("mongoose");
mongoose.connect(connectionString);

require ("./test/app.js")(app, mongoose);


// require ("./test/app.js")(app);


require('./project/app.js')(app, mongoose);

var port = process.env.PORT || 4000;

app.listen(port);