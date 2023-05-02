const { RecipeIngredient } = require('../models');

const recipeIngredientData = [
  {
    recipe_id: 1,
    ingredient_id: 1,
  },
  {
    recipe_id: 1,
    ingredient_id: 2,
  },
  {
    recipe_id: 2,
    ingredient_id: 1,
  },
  {
    recipe_id: 2,
    ingredient_id: 3,
  },
];

const seedRecipeIngredient = () =>
  RecipeIngredient.bulkCreate(recipeIngredientData);

module.exports = seedRecipeIngredient;
