const router = require('express').Router();
const {
  Recipe,
  User,
  Ingredient,
  RecipeIngredient,
  Step,
} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const recipeData = await Recipe.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Ingredient,
          through: RecipeIngredient,
        },
        {
          model: Step,
        },
      ],
    });
    res.status(200).json(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
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
          as: 'recipe_ingredients',
        },
        {
          model: Step,
        },
      ],
    });

    if (!recipeData) {
      res
        .status(404)
        .json({ message: 'No recipe found with this id!' });
      return;
    }

    res.status(200).json(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// got this from the module 13 challenge
router.post('/', async (req, res) => {
  // {
  //   name: "Lasagna",
  //   user_id: 3,
  //   ingredients: [mozzerella cheese, lasagna noodles],
  //   steps: ['step 1 is', 'step 2 ...', 'step 3']
  // }
  if (!req.body.name) {
    res
      .status(400)
      .json({ message: 'Missing "name" in request body' });
    return;
  }

  try {
    const recipe = await Recipe.create(req.body);
    const existingIngredients = await Ingredient.findAll();
    const existingIngredientNames = existingIngredients.map(
      (ingredient) => ingredient.dataValues.name.trim().toLowerCase()
    );
    console.log(existingIngredientNames);
    console.log(req.body.ingredients);
    const newIngredients = [];
    if (req.body.ingredients.length) {
      req.body.ingredients.forEach(async (ingredient) => {
        if (!existingIngredientNames.includes(ingredient)) {
          newIngredients.push(ingredient);
        }
      });
      console.log(newIngredients);
      const newIngredientsArr = newIngredients.map((name) => {
        return {
          name: name,
          category: 'test',
        };
      });
      const createIngredients = await Ingredient.bulkCreate(
        newIngredientsArr
      );

      // const recipeIngredientIdArr = req.body.ingredient.map(
      //   (ingredient_id) => {
      //     return {
      //       recipe_id: recipe.id,
      //       ingredient_id,
      //     };
      //   }
      // );
      // return RecipeIngredient.bulkCreate(recipeIngredientIdArr);
      res.status(204);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, (req, res) => {
  Recipe.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((recipe) => {
      return RecipeIngredient.findAll({
        where: { recipe_id: req.params.id },
      });
    })
    .then((recipeIngredients) => {
      const recipeIngredientIds = recipeIngredients.map(
        ({ ingredient_id }) => ingredient_id
      );
      const newRecipeIngredients = req.body.ingredientIds
        .filter(
          (ingredient_id) =>
            !recipeIngredientIds.includes(ingredient_id)
        )
        .map((ingredient_id) => {
          return {
            recipe_id: req.params.id,
            ingredient_id,
          };
        });

      const recipeIngredientsToRemove = recipeIngredients
        .filter(
          ({ ingredient_id }) =>
            !req.body.ingredientIds.includes(ingredient_id)
        )
        .map(({ id }) => id);

      return Promise.all([
        RecipeIngredient.destroy({
          where: { id: recipeIngredientsToRemove },
        }),
        RecipeIngredient.bulkCreate(newRecipeIngredients),
      ]);
    })
    .then((updatedRecipeIngredients) =>
      res.json(updatedRecipeIngredients)
    )
    .catch((err) => {
      console.log(err);
    });
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!recipeData) {
      res
        .status(404)
        .json({ message: 'No recipe found with this id!' });
      return;
    }
    res.status(200).json(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
