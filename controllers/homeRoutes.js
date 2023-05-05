const router = require('express').Router();
const withAuth = require('../utils/auth');
const {
  RecipeIngredient,
  Ingredient,
  Recipe,
  Step,
  User,
} = require('../models');

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
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Recipe,
        },
      ],
    });


    const user = userData.get({ plain: true });
    console.log(user);
    res.render('profile', {
      ...user,
      logged_in: true,

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
          model: RecipeIngredient,
          attributes: ['units', 'amount'],
        },
        {
          model: Ingredient,
          through: RecipeIngredient,
          attributes: ['name'],
        },
        {
          model: Step,
          attributes: ['step'],
        },
      ],
    });

    const recipe = recipeData.get({ plain: true });

    const allRecipeData = await Recipe.findAll();

    const allRecipes = allRecipeData.map((recipe) =>
      recipe.get({ plain: true })
    );
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
