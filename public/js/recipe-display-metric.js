const checkbox = document.querySelector('#metricCheckbox');
// console.log('inside recipe-display-metric');
const ingredientsArr = document.querySelectorAll('.ingredient');
// console.log(ingredientsArr);

const checkboxHandler = async () => {
  console.log(checkbox);
  console.log(checkbox.checked);
  const urlParams = new URLSearchParams(window.location.search);
  console.log(window.location.search);
  urlParams.set('metricCheckbox', checkbox.checked);

  const newUrl = `${
    window.location.pathname
  }?${urlParams.toString()}`;
  window.history.pushState({ path: newUrl }, '', newUrl);
  console.log(newUrl);
  location.reload();
};

const setCheckboxState = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const isChecked = urlParams.get('metricCheckbox') === 'true';
  checkbox.checked = isChecked;
};

document.addEventListener('DOMContentLoaded', setCheckboxState);
checkbox.addEventListener('change', checkboxHandler);
