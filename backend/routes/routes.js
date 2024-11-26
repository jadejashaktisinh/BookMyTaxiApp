const route  = require('express').Router();
const UserSignUp = require("./auth/UserSignUp");
const UserLogin = require("./auth/UserLogin")
const DriverSignUp = require("./auth/DriverSignUp");
const DriverLogin = require("./auth/DriverLogin")
const addVehical = require("./auth/addVehical")
const verification = require("./auth/verification")

route.post('/user/singup',UserSignUp);
route.post('/user/login',UserLogin);
route.post('/driver/singup',DriverSignUp);
route.post('/driver/login',DriverLogin);
route.post('/driver/addVehical',addVehical);
route.post('/verification',verification);



module.exports = route;