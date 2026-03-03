const recipeModel = require("../Models/recipeModel");

const addRecipe = async (req, res) => {
  const { tittle, ingrediants, instructions, time, image } = req.body;
  if (!tittle || !ingrediants || !instructions || !time) {
    return res.status(400).json({
      message: "All fields are required",
      success: false,
    });
  }
  let recipe = null;
  if (image) {
    recipe = new recipeModel({
      tittle,
      ingrediants,
      instructions,
      time,
      image,
    });
  } else {
    recipe = new recipeModel({ tittle, ingrediants, instructions, time });
  }
  await recipe.save();
  res.status(200).json({
    message: "Recipe added successfully",
    success: true,
    recipe,
  });
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
    const { tittle, ingrediants, instructions, time, image } = req.body;
    const id = req.params.id;
    const recipe = await recipeModel.findById(id);
    if (!recipe) {
      return res.status(404).json({
        message: "Didn't get the recipe ",
        success: false,
      });
    }
   await recipeModel.findByIdAndUpdate(id, req.body, { new: true });
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

module.exports = { Recipes, Recipe, editRecipe, addRecipe, deleteRecipe };
