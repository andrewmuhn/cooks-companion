const { Ingredient } = require('../models');

const ingredientData = [
  {
    name: 'Cheddar Cheese',
    unit: 'oz',
    category: 'dairy',
  },
  {
    name: 'Macaroni Noodles',
    unit: 'oz',
    category: 'dry goods',
  },
  {
    name: 'Tortilla',
    unit: 'num',
    category: 'bread',
  },
];

const seedIngredients = () => Ingredient.bulkCreate(ingredientData);

module.exports = seedIngredients;
