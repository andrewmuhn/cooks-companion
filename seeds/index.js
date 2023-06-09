const seedUsers = require('./user-seeds');
const seedRecipes = require('./recipe-seeds');
const seedSteps = require('./step-seeds');
const seedIngredients = require('./ingredient-seeds');
const seedRecipeIngredients = require('./recipe-ingredient-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedRecipes();
  console.log('\n----- RECIPES SEEDED -----\n');

  await seedSteps();
  console.log('\n----- STEPS SEEDED -----\n');

  await seedIngredients();
  console.log('\n----- INGREDIENTS SEEDED -----\n');

  await seedRecipeIngredients();
  console.log('\n----- RECIPE INGREDIENTS SEEDED -----\n');

  process.exit(0);
};

seedAll();
