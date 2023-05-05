const User = require('./User');
const Recipe = require('./Recipe');
const RecipeIngredient = require('./RecipeIngredient');
const Ingredient = require('./Ingredient');
const Step = require('./Step');

User.hasMany(Recipe, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Recipe.belongsTo(User, {
  foreignKey: 'user_id',
});

Recipe.hasMany(Step, {
  foreignKey: 'recipe_id',
  onDelete: 'CASCADE',
});

Recipe.hasMany(RecipeIngredient, {
  foreignKey: 'recipe_id',
});

Step.belongsTo(Recipe, {
  foreignKey: 'recipe_id',
});

Recipe.belongsToMany(Ingredient, {
  foreignKey: 'recipe_id',
  through: {
    model: RecipeIngredient,
    unique: false,
  },
  as: 'ingredients',
});

Ingredient.belongsToMany(Recipe, {
  foreignKey: 'ingredient_id',
  through: {
    model: RecipeIngredient,
    unique: false,
  },
  as: 'recipes_with_ingredient',
});

// * These are extra relationships if we create the "pantry" option where a user can have ingredients
// User.hasMany(Ingredient, {
//   foreignKey: 'user_id',
// });

// Ingredient.belongsTo(User, {
//   foreignKey: 'user_id',
// });

module.exports = { User, Recipe, Ingredient, Step, RecipeIngredient };
