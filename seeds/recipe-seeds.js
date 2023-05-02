const { Recipe } = require('../models');

const recipeData = [
  {
    name: 'Simple Macaroni and Cheese',
  },
  {
    name: 'Fire Quesadilla',
  },
];

const seedRecipe = () => Recipe.bulkCreate(recipeData);

module.exports = seedRecipe;
