const { Ingredient } = require('../models');

const ingredientData = [
  {
    name: 'Cheddar Cheese',
    category: 'dairy',
  },
  {
    name: 'Macaroni Noodles',
    category: 'dry goods',
  },
  {
    name: 'Tortilla',
    category: 'bread',
  },
];

const seedIngredients = () => Ingredient.bulkCreate(ingredientData);

module.exports = seedIngredients;
