const route = require('express').Router();
const {signUpValidation, loginValidation} = require('../Middleware/authValidation')
const {signUp , login} = require('../Controller/AuthController')


 route.post('/login',loginValidation,login);
route.post('/signup',signUpValidation,signUp);

module.exports = route;