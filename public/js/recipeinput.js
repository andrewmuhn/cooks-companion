const pushRecipeName = () => {
   let viewRecipeName = document.getElementById("view-recipe-name");
   let newRecipeNameEl = document.createElement("h6");

   let newRecipeName = document.getElementById("recipe-name").value;

   newRecipeNameEl.textContent = newRecipeName;
   viewRecipeName.appendChild(newRecipeNameEl);
};


const pushIngredData = () => {
  let viewIngred = document.getElementById("view-ingredients");
  let newIngredLi = document.createElement("li");

        
  let inputIngredient = document.getElementById("inputText").value.trim();
  let inputNumber = document.getElementById("inputNumber").value.trim();
  let inputFraction = document.getElementById("inputFraction").value.trim();
  let inputUnit = document.getElementById("inputUnit").value.trim();

  let text = inputIngredient + " " + inputNumber + " " + inputFraction + " " + inputUnit;
        
  let node = document.createTextNode(text);
    newIngredLi.appendChild(node);
    viewIngred.appendChild(newIngredLi);
};


const pushStepData = () => {
      let viewSteps = document.getElementById("view-steps");
      let newStepsLi = document.createElement("li");

      let recipeSteps = document.getElementById("recipe-steps").value;

      newStepsLi.textContent = recipeSteps;
      viewSteps.appendChild(newStepsLi);
};


const newFormHandler = async (event) => {

  event.preventDefault();

   

  const name = document.querySelector('#recipe-name').value.trim();
  const ingredients = document.querySelector('#recipe-ingredients').value.trim();
  const steps = document.querySelector('#recipe-instructions').value.trim();

  if (name && ingredients && steps) {
    const response = await fetch(`/api/recipe`, {
      method: 'POST',
      body: JSON.stringify({ name, ingredients, steps }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/recipe');
    } else {
      alert('Failed to create recipe');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/recipes/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete recipe');
    }
  }
};

document.querySelector('.new-recipe-form')
.addEventListener('submit', newFormHandler, );

document.querySelector('.recipe-list')
.addEventListener('click', delButtonHandler);

document.querySelector('#push-recipe-name')
.addEventListener('click', pushRecipeName);

document.querySelector('#push-ingred-name')
.addEventListener('click', pushIngredData);

document.querySelector('#push-step-data')
.addEventListener('click', pushStepData);



