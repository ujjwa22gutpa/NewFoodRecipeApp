require("dotenv").config();
const express = require("express");
const cors = require('cors');
const path = require('path');
const authRouter = require('./Routes/authRoutes.js');
const recipeRouter = require("./Routes/recipeRouter.js")
const bodyParser = require("body-parser");
require('./Models/dbModels');
require("./Models/userModels.js");

const app = express();
const PORT = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public'))); // serve static files from the "public" directory

app.get('/recipe/:id',recipeRouter); // for getting the recipe by id 
app.post('/recipe/addRecipe',recipeRouter);// for creating a new Recipe
app.put('/recipe/:id',recipeRouter);//to edit the recipe
app.delete('/recipe/:id',recipeRouter);// to delete the recipe
app.get('/recipe',recipeRouter);// getting all the recipes
app.post('/login',authRouter);
app.post('/signup',authRouter);
app.get('/user/:id',authRouter);


app.listen(PORT,(req,res)=>{
    console.log(`server is running on port ${PORT}`)
})