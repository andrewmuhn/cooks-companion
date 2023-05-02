const { Step } = require('../models');

const stepData = [
  {
    step: 'Boil Macaroni: \nBring a pot of water to a boil. Cook elbow macaroni until al dente, about 8 minutes. \nTip: For a thicker mac and cheese, double the amount of macaroni.',
    recipe_id: 1,
  },
  {
    step: "Add Cheese and Macaroni: \nThe most crucial step: Add cheese! Slowly stir in Cheddar cheese until smooth and melted. We recommend you grate your own cheese because pre-shredded cheese won't incorporate into the mixture as well as block cheese.",
    recipe_id: 1,
  },
  {
    step: 'Grate cheese onto tortilla',
    recipe_id: 2,
  },
  {
    step: 'Fold tortilla in half and put onto a pan on medium/high heat. Let cook until golden brown then flip (roughly 3 to 5 mins)',
    recipe_id: 2,
  },
  {
    step: 'Repeat previous step for other side then cut into triangles and serve with your favorite hot sauce',
    recipe_id: 2,
  },
];

const seedStep = () => Step.bulkCreate(stepData);

module.exports = seedStep;
