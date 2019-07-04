/*
*  purpose: chatapp
*  @file: index.js
*  @author: Snehal Patil<snehalppatil9@gmail.com>
*  @since:02/04/2019
*/
//import express
var express = require('express');
var router = express.Router();
// importing user and chat
var users = require('../controller/userController');
var chatController = require("../controller/chatController");
// var auth = require('../authentication/index');
 try{
    router.get('/getAllUsers',users.getAllUsers);
    router.get('/getUserMsg',chatController.getUserMsg);
}
catch(err)
{
    console.log("ERROR : in authorization");
}
module.exports =router
