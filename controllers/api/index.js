const router = require('express').Router();
const ingredientRoutes = require('./ingredientRoutes');
const recipeRoutes = require('./recipeRoutes');
const userRoutes = require('./userRoutes');
const stepRoutes = require('./stepRoutes');

router.use('/ingredients', ingredientRoutes);
router.use('/recipes', recipeRoutes);
router.use('/users', userRoutes);
router.use('/steps', stepRoutes);

module.exports = router;