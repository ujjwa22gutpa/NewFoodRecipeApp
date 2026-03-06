const route = require('express').Router();
const {signUpValidation, loginValidation} = require('../Middleware/authValidation')
const {signUp , login, currentUser} = require('../Controller/AuthController');
const { idValidation } = require('../Middleware/recipeValidations');


route.post('/login',loginValidation,login);
route.post('/signup',signUpValidation,signUp);
route.get('/user/:id',idValidation,currentUser);

module.exports = route;