const route  = require('express').Router();
const UserSignUp = require("./auth/UserSignUp");
const UserLogin = require("./auth/UserLogin")
const DriverSignUp = require("./auth/DriverSignUp");
const DriverLogin = require("./auth/DriverLogin")

route.get('/user/singup',UserSignUp);
route.get('/user/login',UserLogin);
route.get('/driver/singup',DriverSignUp);
route.get('/driver/login',DriverLogin);


module.exports = route;