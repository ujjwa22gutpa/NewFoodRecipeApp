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


router.get("/:id", idValidation, Recipe); // for getting the recipe by id

router.post("/addRecipe",upload.single("image"), addRecipe); // for creating a new Recipe

router.put("/:id",idValidation, editRecipe); //to edit the recipe

router.delete("/:id",idValidation, deleteRecipe); // to delete the recipe

module.exports = router;
