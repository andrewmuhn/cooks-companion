const convert = require('convert-units');

module.exports = {
  convert_units: (amount, unit) => {
    console.log('inside helper');
    console.log(amount);
    console.log(unit);
    switch (unit) {
      case 'tsp':
        console.log(convert(amount).from(unit).to('ml'));
        return `${Math.round(
          convert(amount).from(unit).to('ml')
        )} ml`;
      case 'Tbs':
        console.log(convert(amount).from(unit).to('ml'));
        return `${Math.round(
          convert(amount).from(unit).to('ml')
        )} ml`;
      case 'cup(s)':
        console.log(convert(amount).from('cup').to('ml'));
        return `${Math.round(
          convert(amount).from('cup').to('ml')
        )} ml`;
      case 'qt':
        console.log(convert(amount).from(unit).to('l'));
        return `${Math.round(convert(amount).from(unit).to('l'))} l`;
      case 'gal':
        console.log(convert(amount).from(unit).to('l'));
        return `${Math.round(convert(amount).from(unit).to('l'))} l`;
      case 'lb':
        console.log(convert(amount).from(unit).to('kg'));
        return `${Math.round(
          convert(amount).from(unit).to('kg')
        )} kg`;
      case 'oz':
        console.log(convert(amount).from(unit).to('g'));
        return `${Math.round(convert(amount).from(unit).to('g'))} g`;

      default:
        return `${amount}  ${unit}`;
    }
  },
  isChecked: (checkbox_checked) => {
    console.log('inside isChecked function');
    console.log(checkbox_checked);
    if (checkbox_checked === true) {
      return true;
    } else {
      return false;
    }
  },
};
