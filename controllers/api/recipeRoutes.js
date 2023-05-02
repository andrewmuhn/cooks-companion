const router = require('express').Router();
const { PassThrough } = require('stream');
const { Recipe, User, Ingredient, RecipeIngredient, Step } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const recipeData = await Recipe.findAll({
      include: [
        {
         model: User 
        },
        {
          model: Ingredient,
          through: RecipeIngredient,
        },
        {
          model: Step,
        }
      ]
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
          model: User 
        },
        {
          model: Ingredient,
          through: RecipeIngredient,
        },
        {
          model: Step,
        }
      ]
    });

    if (!recipeData) {
      res.status(404).json({ message: 'No recipe found with this id!' });
      return;
    }

    res.status(200).json(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// got this from the module 13 challenge 
router.post('/', (req, res) => {
  Recipe.create(req.body)
    .then((recipe) => {
      if (req.body.ingredientIds.length) {
        const recipeIngredientIdArr = req.body.ingredientIds.map((ingredient_id) => {
          return {
            recipe_id: recipe.id,
            ingredient_id,
          }
        });
        return RecipeIngredient.bulkCreate(recipeIngredientIdArr);
      }
      res.status(200).json(recipe);
    })
    .then((recipeIngredientIds) => res.status(200).json(recipeIngredientIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  Recipe.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((recipe) => {
      return RecipeIngredient.findAll({ where: { recipe_id: req.params.id } });
    })
    .then((recipeIngredients) => {
      const recipeIngredientIds = recipeIngredients.map(({ ingredient_id }) => ingredient_id);
      const newRecipeIngredients = req.body.ingredientIds
        .filter((ingredient_id) => !recipeIngredientIds.includes(ingredient_id))
        .map((ingredient_id) => {
          return {
            recipe_id: req.params.id,
            ingredient_id,
            };
        });
      
      const recipeIngredientsToRemove = recipeIngredients
        .filter(({ ingredient_id }) => !req.body.ingredientIds.includes(ingredient_id))
        .map(({ id }) => id);
      
      return Promise.all([
        RecipeIngredient.destroy({ where: { id: recipeIngredientsToRemove } }),
        RecipeIngredient.bulkCreate(newRecipeIngredients),
      ]);
    })
    .then((updatedRecipeIngredients) => res.json(updatedRecipeIngredients))
    .catch((err) => {
      console.log(err);
    });  
});

router.delete('/:id', async (req, res) => {
  try {
    const recipeData = await Recipe.destroy({
      where: {
        id: req.params.id,
      }
    });

    if (!recipeData) {
      res.status(404).json({ message: 'No recipe found with this id!' });
      return;
    }
    res.status(200).json(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;