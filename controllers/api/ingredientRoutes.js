const router = require("express").Router();
const { Ingredient } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const newIngredientData = await Ingredient.create({
      name: req.body.name,
      unit: req.body.unit,
      category: req.body.unit,
    });

    res.status(200).json(newIngredientData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const dbIngredientData = await Ingredient.findByPk(req.params.id);

    if (!dbIngredientData) {
      res.status(404).json({ message: "No Ingredient matches that id!" });
      return;
    }
    res.status(200).json(dbIngredientData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateIngredient = await Ingredient.update(
      {
        id: req.body.id,
        name: req.body.name,
        unit: req.body.unit,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(updateIngredient);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Ingredient.destroy({
      where: {
        id: req.params.id,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
