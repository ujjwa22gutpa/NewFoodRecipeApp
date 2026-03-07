const router = require("express").Router();
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

router.get("/recipe", Recipes); // getting all the recipes


router.get("/:id", idValidation, Recipe); // for getting the recipe by id

router.post("/addRecipe",addRecipe); // for creating a new Recipe

router.put("/:id",idValidation, editRecipe); //to edit the recipe

router.delete("/:id",idValidation, deleteRecipe); // to delete the recipe

module.exports = router;
