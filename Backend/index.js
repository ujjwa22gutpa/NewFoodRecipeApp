require("dotenv").config();
const express = require("express");
const cors = require('cors');
const authRouter = require('./Routes/authRoutes.js');
const recipeRouter = require("./Routes/recipeRouter.js")
const bodyParser = require("body-parser");
require('./Models/dbModels');
require("./Models/userModels.js");

const app = express();
const PORT = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(cors());

app.get('/:id',recipeRouter); // for getting the recipe by id 
app.post('/',recipeRouter);// for creating a new Recipe
app.put('/:id',recipeRouter);//to edit the recipe
app.delete('/:id',recipeRouter);// to delete the recipe
app.get('/recipe',recipeRouter);// getting all the recipes
app.post('/login',authRouter);
app.post('/signup',authRouter);


app.listen(PORT,(req,res)=>{
    console.log(`server is running on port ${PORT}`)
})