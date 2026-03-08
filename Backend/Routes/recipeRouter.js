const router = require("express").Router();
const multer = require("multer");
const {
  Recipes,
  Recipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
} = require("../Controller/recipeController");
const {
  recipeValidation,
  idValidation,
} = require("../Middleware/recipeValidations");

const { upload } = require("../Middleware/upload");

router.get("/recipe", Recipes); // getting all the recipes


router.get("/recipe/:id", idValidation, Recipe); // for getting the recipe by id

router.post("/recipe/addRecipe",upload.single("image"), addRecipe); // for creating a new Recipe

router.put("/recipe/:id",idValidation, upload.single("image"), editRecipe); //to edit the recipe

router.delete("/recipe/:id",idValidation, deleteRecipe); // to delete the recipe

module.exports = router;
