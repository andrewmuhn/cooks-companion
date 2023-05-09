const checkbox = document.querySelector('#metricCheckbox');
const ingredientsImperialArr = document.querySelectorAll(
  '.ingredient-imperial'
);
const ingredientsMetricArr = document.querySelectorAll(
  '.ingredient-metric'
);

const checkboxHandler = () => {
  if (checkbox.checked) {
    for (let i = 0; i < ingredientsMetricArr.length; i++) {
      const ingredientMetric = ingredientsMetricArr[i];
      const ingredientImperial = ingredientsImperialArr[i];
      ingredientMetric.classList.remove('none');
      ingredientImperial.classList.add('none');
    }
  } else {
    for (let i = 0; i < ingredientsMetricArr.length; i++) {
      const ingredientMetric = ingredientsMetricArr[i];
      const ingredientImperial = ingredientsImperialArr[i];
      ingredientMetric.classList.add('none');
      ingredientImperial.classList.remove('none');
    }
  }
};

checkbox.addEventListener('change', checkboxHandler);
