const router = require('express').Router();
const withAuth = require('../utils/auth');
const { RecipeIngredients, Ingredients } = require('../models');

router.get('/', async (req, res) => {
  try {
    res.render('home', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const allRecipeData = await Recipe.findAll();

    const recipes = allRecipeData.map((recipe) =>
      project.get({ plain: true })
    );

    res.render('profile', {
      ...recipes,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/recipe/:id', withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: RecipeIngredients,
          attributes: ['units', 'amount'],
        },
        {
          model: Ingredients,
          through: RecipeIngredients,
          attributes: ['name'],
        },
      ],
    });
    const allRecipeData = await Recipe.findAll();

    const allRecipes = allRecipeData.map((recipe) =>
      project.get({ plain: true })
    );

    const recipe = recipeData.get({ plain: true });
    res.render('profile', {
      ...allRecipes,
      ...recipe,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

module.exports = router;
