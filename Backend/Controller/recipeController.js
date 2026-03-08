const recipeModel = require("../Models/recipeModel");
const path = require('path');

const addRecipe = async (req, res) => {
  const { tittle, ingrediants, instructions, time, user_id } = req.body;
  console.log(req.user_id);
  
  if (!tittle || !ingrediants || !instructions || !time) {
    return res.status(400).json({
      message: "All fields are required",
      success: false,
    });
  }

  if (!req.file) {
    return res.status(400).json({
      message: "Image is required",
      success: false,
    });
  }

  try {
    const imageFilename = req.file.filename;
    
    const recipe = new recipeModel({
      tittle,
      ingrediants,
      instructions,
      time,
      image: imageFilename,
      user_id
    });
    
    await recipe.save();
    res.status(200).json({
      message: "Recipe added successfully",
      success: true,
      recipe,
    });
  } catch (error) {
    console.error('Error adding recipe:', error);
    res.status(500).json({
      message: "Internal Server Problem",
      success: false,
      error: error.message,
    });
  }
  
};

const Recipes = async (req, res) => {
  try {
    const recipes = await recipeModel.find();
    res.status(200).json({
      message: "All Recipes",
      success: true,
      recipes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Problem",
      success: false,
    });
  }
};

const Recipe = async (req, res) => {
  try {
    const id = req.params.id;
    const recipe = await recipeModel.findById(id);
    if (!recipe) {
      return res.status(403).json({
        message: "Didn't get the requested recipe",
        success: false,
      });
    }
    res.status(200).json({
      message: "Found Successfully",
      success: true,
      recipe,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server problem",
      success: false,
    });
  }
};

const editRecipe = async (req, res) => {
  try {
    const id = req.params.id;
     if(!req.file){
      return res.status(400).json({
        message:"Didn't Upload the photo"
      })
    }

    const recipe = await recipeModel.findById(id);
    if (!recipe) {
      return res.status(404).json({
        message: "Didn't get the recipe ",
        success: false,
      });
    }
   const filename = req.file.filename;
   await recipeModel.findByIdAndUpdate(id, { ...req.body, image: filename }, { new: true });
    res.status(200).json({
      message: "Recipe Updated Successfully!!",
      success: true,

    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Problem",
      success: false,
    });
  }
};

const deleteRecipe = async (req, res) => {
  const id = req.params.id;
  const recipe = await recipeModel.findById(id);
  if (!recipe) {
    return res.status(403).json({
      message: "Didn't get the requested recipe",
      success: false,
      
    });
  }
  await recipeModel.findByIdAndDelete(id);
  res.status(200).json({
    message: "Recipe Deleted SuccessFully!!",
    success: true,
  });
};



// Backend/Controller/AuthController.js mein add karo
const toggleFavorite = async (req, res) => {
  try {
    const userId = req.body.user_id; // frontend se aayega
    const recipeId = req.params.id;   // URL se aayega
    
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User nahi mila",
        success: false
      });
    }

    // Check karo ki already favorite hai ya nahi
    const isFavorited = user.favorites.includes(recipeId);

    if (isFavorited) {
      // Agar favorite hai to hatao
      user.favorites = user.favorites.filter(fav => fav.toString() !== recipeId);
    } else {
      // Agar favorite nahi hai to add karo
      user.favorites.push(recipeId);
    }

    await user.save();
    res.status(200).json({
      message: isFavorited ? "Removed from favorites" : "Added to favorites",
      success: true,
      isFavorited: !isFavorited
    });
  } catch (error) {
    res.status(500).json({
      message: "Kuch error ho gaya",
      success: false
    });
  }
};



module.exports = { Recipes, Recipe, editRecipe, addRecipe, deleteRecipe, toggleFavorite};
