
var express = require('express');
var router = express.Router();
var AuthController = require('../controller/AuthController')

router
 .post("/signup",AuthController.signup)
 .get("/login",AuthController.login)
  
  

module.exports = router;

