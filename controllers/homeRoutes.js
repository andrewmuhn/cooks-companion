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

router.get('/recipes/:id', withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Ingredient,
          through: RecipeIngredient,
          as: 'ingredients',
        },
        {
          model: Step,
          attributes: ['step'],
        },
      ],
    });

    const recipe = await recipeData.get({ plain: true });

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Recipe,
        },
      ],
    });
    // console.log(recipe.ingredients);
    const user = userData.get({ plain: true });
    res.render('recipedisplay', {
      ...user,
      recipe,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/recipe_input', withAuth, async (req, res) => {
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
    // console.log(user);
    res.render('recipeinput', {
      ...user,
      logged_in: true,
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
