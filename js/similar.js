'use strict';

(function () {
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var wizard = window.util.setup.querySelector('.setup-wizard');
  var wizardCoat = wizard.querySelector('.wizard-coat');
  var wizardEyes = wizard.querySelector('.wizard-eyes');
  var wizardFireball = window.util.setup.querySelector('.setup-fireball');

  var color;
  var coatColor = wizardCoat.style.fill;
  var eyesColor = wizardEyes.style.fill;

  var changeWizardDetailsColor = window.debounce.debounce(function (detail, colorsArr, inputName) {
    color = window.util.getRandomValueFromArray(colorsArr);
    if (detail === window.util.wizardFireballWrapper) {
      detail.style.background = color;
      detail.querySelector('input').value = color;
    } else {
      detail.style.fill = color;
      window.util.wizardSetupWrapper.querySelector('input[name="' + inputName + '"]').value = color;
      if (inputName === 'coat-color') {
        coatColor = color;
      }
      if (inputName === 'eyes-color') {
        eyesColor = color;
      }
      updateWizards();
    }
    return color;
  });

  var updateWizards = function () {

    window.render.onLoad(window.util.wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var getRank = function (arr) {
    var rank = 0;

    if (arr.colorCoat === coatColor) {
      rank += 2;
    }
    if (arr.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  wizardCoat.addEventListener('click', function () {
    changeWizardDetailsColor(wizardCoat, WIZARD_COAT_COLORS, 'coat-color');
  });

  wizardEyes.addEventListener('click', function () {
    changeWizardDetailsColor(wizardEyes, WIZARD_EYE_COLORS, 'eyes-color');
  });

  wizardFireball.addEventListener('click', function () {
    changeWizardDetailsColor(window.util.wizardFireballWrapper, WIZARD_FIREBALL_COLORS);
  });

  window.similar = {
    updateWizards: updateWizards
  };
})();
