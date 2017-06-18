// var express = require('express');
// var app = express();
var app = require('./express');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({ secret: "this is secret!"}));

app.use(passport.initialize());
app.use(passport.session());


// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

// require ("./test/app.js")(app);

require('./assignment/app');

require('./public/project/server/app');

// require('./public/project/indeed.service.server');

var port = process.env.PORT || 3000;

app.listen(port);