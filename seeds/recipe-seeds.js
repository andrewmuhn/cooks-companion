const { Recipe } = require('../models');

const recipeData = [
  {
    name: 'Simple Macaroni and Cheese',
    user_id: 2,
  },
  {
    name: 'Fire Quesadilla',
    user_id: 1,
  },
];

const seedRecipe = () => Recipe.bulkCreate(recipeData);

module.exports = seedRecipe;
