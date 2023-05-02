const router = require("express").Router();
const { Ingredient } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const IngredientData = await Ingredient.create({
      name: req.body.name,
      unit: req.body.unit,
      category: req.body.unit,
    });

    res.status(200).json(IngredientData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
