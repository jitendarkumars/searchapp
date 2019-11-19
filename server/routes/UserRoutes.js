
var express = require('express');
var router = express.Router();
var AuthController = require('../controller/AuthController')

router
  .route("/signup").post(AuthController.signup)
  

module.exports = router;

