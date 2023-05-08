let ingredientInstance = 1;
let instructionInstance = 1;
const unitOptionsArr = [
  'tsp',
  'tbsp',
  'cup(s)',
  'qt',
  'gal',
  'lb',
  'oz',
  'pinch',
  '',
];
let options = '';
for (let i = 0; i < unitOptionsArr.length; i++) {
  const option = unitOptionsArr[i];
  options += `<option value='${option}'/>`;
}

const addIngredient = (event) => {
  event.preventDefault();
  // Create new input fields for ingredient, number, and unit
  let ingredientInput = document.createElement('input');
  ingredientInput.id = 'ingredient-name' + ingredientInstance;
  ingredientInput.class = 'ingredient-name';
  ingredientInput.type = 'text';
  ingredientInput.name = 'ingredient';
  ingredientInput.setAttribute('class', 'recipe-input');

  let ingredientLabel = document.createElement('label');
  ingredientLabel.setAttribute =
    ('for', 'ingredient-name' + ingredientInstance);
  ingredientLabel.innerHTML = 'Ingredient: ';

  let numberInput = document.createElement('input');
  numberInput.id = 'number-input' + ingredientInstance;
  numberInput.class = 'number-input';
  numberInput.type = 'number';
  numberInput.name = 'number';
  numberInput.setAttribute('class', 'recipe-input');
  numberInput.setAttribute('class', 'number-input');
  
  

  let numberLabel = document.createElement('label');
  numberLabel.setAttribute =
    ('for', 'number-name' + ingredientInstance);
  numberLabel.innerHTML = 'Number: ';

  let unitInput = document.createElement('input');
  unitInput.id = 'unit-input' + ingredientInstance;
  unitInput.class = 'unit-input';
  unitInput.setAttribute('list', 'unit-options' + ingredientInstance);
  unitInput.name = 'unit';
  unitInput.setAttribute('class', 'recipe-input');
  unitInput.setAttribute('class', 'unit-input');

  let unitOptions = document.createElement('datalist');
  unitOptions.id = 'unit-options' + ingredientInstance;
  unitOptions.innerHTML = options;

  let unitLabel = document.createElement('label');
  unitLabel.setAttribute = ('for', 'unit-name' + ingredientInstance);
  unitLabel.innerHTML = 'Units: ';

  // Create a new div to hold the input fields
  let inputContainer = document.createElement('div');
  inputContainer.appendChild(ingredientLabel);
  inputContainer.appendChild(ingredientInput);
  inputContainer.appendChild(numberLabel);
  inputContainer.appendChild(numberInput);
  inputContainer.appendChild(unitLabel);
  inputContainer.appendChild(unitInput);
  inputContainer.appendChild(unitOptions);

  // Append the new input fields to the ingredient-container div
  let container = document.getElementById('ingredient-container');
  container.appendChild(inputContainer);

  ingredientInstance++;
};

const addStep = (event) => {
  event.preventDefault();

  let instructionStep = document.createElement('input');
  instructionStep.type = 'text';
  instructionStep.name = 'step';
  instructionStep.id = 'recipe-step' + instructionInstance;
  instructionStep.classList.add('recipe-input');
  instructionStep.setAttribute('class', 'recipe-input');
  instructionStep.setAttribute('id', 'recipe-steps');

  let stepContainer = document.createElement('div');
  stepContainer.appendChild(instructionStep);

  let container = document.getElementById('step-container');
  container.appendChild(stepContainer);

  instructionInstance++;
};

const handleFormSubmit = async (event) => {
  event.preventDefault();
  const recipeName = document
    .querySelector('#recipe-name')
    .value.trim();
  const ingredients = document.querySelectorAll(
    'input[name="ingredient"]'
  );
  const units = document.querySelectorAll('input[name="unit"]');
  const numbers = document.querySelectorAll('input[name="number"]');

  const ingredientArr = [];
  ingredients.forEach((ingredient, i) => {
    ingredientArr.push({
      name: ingredient.value.trim(),
      unit: units[i].value.trim(),
      amount: numbers[i].value.trim(),
    });
  });

  const steps = document.querySelectorAll('input[name="step"]');

  stepArr = [];
  steps.forEach((step) => {
    stepArr.push(step.value.trim());
  });

  console.log(recipeName);
  console.log(ingredientArr);
  console.log(stepArr);

  let recipeData;
  if (recipeName && stepArr && ingredientArr) {
    recipeData = {
      name: recipeName,
      ingredients: ingredientArr,
      steps: stepArr,
    };
  }
  console.log(recipeData);
  const response = await fetch('/api/recipes/', {
    method: 'POST',
    body: JSON.stringify(recipeData),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/profile');
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector('#add-ingredient')
  .addEventListener('click', addIngredient);

document
  .querySelector('#add-step')
  .addEventListener('click', addStep);

document
  .querySelector('.new-recipe-form')
  .addEventListener('submit', handleFormSubmit);
