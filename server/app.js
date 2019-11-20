var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var userRoutes = require('./routes/UserRoutes');

var app = express();
var cors = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "accept, content-type, x-access-token, x-requested-with");
    next();
  };
  
  app.use(cors);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
console.log(app.use("/api/users",userRoutes))
app.use("/api/users",userRoutes)

module.exports = app;



