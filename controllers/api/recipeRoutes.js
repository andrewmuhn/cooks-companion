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
          // attributes: ['unit', 'amount'],
          as: 'ingredients',
        },
        {
          model: Step,
          attributes: ['step'],
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

router.post('/', withAuth, async (req, res) => {
  // {
  //   name: 'Lasagna',
  //   user_id: 3,
  //   ingredients: [
  //     {
  //       name: 'mozzerella cheese',
  //       unit: 'cup',
  //       amount: 2,
  //     },
  //     {
  //       name: 'lasagna noodles',
  //       unit: 'oz',
  //       amount: 16,
  //     },
  //   ],
  //   steps: ['step 1 is', 'step 2 ...', 'step 3'],
  // };
  if (!req.body.name) {
    res
      .status(400)
      .json({ message: 'Missing "name" in request body' });
    return;
  }

  try {
    // * Create Recipe
    const recipeData = {
      user_id: req.session.id,
      name: req.body.name,
    };
    const recipe = await Recipe.create(recipeData);

    // if there are ingredients create them and the relation to the recipe via recipe_ingredient
    if (req.body.ingredients.length) {
      // Find all existing ingredients and their names.
      const existingIngredients = await Ingredient.findAll();
      const existingIngredientNames = existingIngredients.map(
        (ingredient) =>
          ingredient.dataValues.name.trim().toLowerCase()
      );
      // * Create Ingredients that didn't already exist
      const newIngredients = [];
      // checks if the ingredient from req.body already exists in the DB. if it doesn't then it adds it to the arr newIngredients to be created.
      req.body.ingredients.forEach(async (ingredient) => {
        if (!existingIngredientNames.includes(ingredient.name)) {
          newIngredients.push(ingredient.name);
        }
      });
      // takes the newIngredients and adds the extra attrtibute, category
      const newIngredientsArr = newIngredients.map((name) => {
        return {
          name: name,
          category: 'test',
        };
      });
      const createIngredients = await Ingredient.bulkCreate(
        newIngredientsArr
      );

      // * Create Recipe Ingredients relationships
      const allIngredients =
        existingIngredients.concat(createIngredients);

      // for each ingredient in the req.body find it's id from allIngredients then return the recipe_id as the id of the recipe created earlier the ingredient_id as the ingredient.id just found and the extra data atttributes for the req.body
      const recipeIngredientsArr = req.body.ingredients.map(
        (ingredient) => {
          let ingredientId;
          for (let i = 0; i < allIngredients.length; i++) {
            const ingredientObj = allIngredients[i];
            if (
              ingredientObj.dataValues.name.trim().toLowerCase() ===
              ingredient.name.trim().toLowerCase()
            ) {
              ingredientId = ingredientObj.dataValues.id;
            }
          }
          return {
            recipe_id: recipe.id,
            ingredient_id: ingredientId,
            unit: ingredient.unit,
            amount: ingredient.amount,
          };
        }
      );

      const createRecipeIngredients =
        await RecipeIngredient.bulkCreate(recipeIngredientsArr);
    }

    // If there are steps create them
    if (req.body.steps.length) {
      console.log(req.body.steps);
      const recipeStepsArr = req.body.steps.map((step) => {
        return {
          recipe_id: recipe.id,
          step: step,
        };
      });
      const createRecipeSteps = await Step.bulkCreate(recipeStepsArr);
    }
    res.status(200).json({ message: 'Recipe Created!' });
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
