const router = require('express').Router();
const { Step } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newStepData = await Step.create({
      step: req.body.step,
    });

    res.status(200).json(newStepData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.get("/", async (req,res) => {
//     try{
//         const dbStepData = await Step.findAll()
//         res.status(200).json(err);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })

// router.get("/:id", async (req, res) => {
//   try {
//     const dbStepData = await Step.findByPk(req.params.id);

//     if (!dbStepData) {
//       res.status(404).json({ message: "No steps match that id!" });
//       return;
//     }
//     res.status(200).json(dbStepData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.put('/:id', async (req, res) => {
  try {
    const updateStep = await Step.update(
      {
        step: req.body.step,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(updateStep);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Step.destroy({
      where: {
        id: req.params.id,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
