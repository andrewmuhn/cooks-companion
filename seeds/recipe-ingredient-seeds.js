const { RecipeIngredient } = require('../models');

const recipeIngredientData = [
  {
    recipe_id: 1,
    ingredient_id: 1,
    unit: 'oz',
    amount: 2,
  },
  {
    recipe_id: 1,
    ingredient_id: 2,
    unit: 'oz',
    amount: 16,
  },
  {
    recipe_id: 2,
    ingredient_id: 1,
    unit: 'oz',
    amount: 3,
  },
  {
    recipe_id: 2,
    ingredient_id: 3,
    unit: 'num',
    amount: 1,
  },
];

const seedRecipeIngredient = () =>
  RecipeIngredient.bulkCreate(recipeIngredientData);

module.exports = seedRecipeIngredient;
