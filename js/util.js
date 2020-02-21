'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var wizardFireballWrapper = setup.querySelector('.setup-fireball-wrap');
  var wizardSetupWrapper = setup.querySelector('.setup-wizard-appearance');
  var wizards = [];

  var getRandomValueFromArray = function (arr) {
    return arr[Math.round(Math.random() * (arr.length - 1))];
  };

  window.util = {
    setup: setup,
    wizardFireballWrapper: wizardFireballWrapper,
    wizardSetupWrapper: wizardSetupWrapper,
    getRandomValueFromArray: getRandomValueFromArray,
    wizards: wizards
  };
})();
