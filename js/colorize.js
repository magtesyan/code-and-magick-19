'use strict';
(function () {
  var changeWizardDetailsColor = function (detail, colorsArr, inputName) {
    var color = window.util.getRandomValueFromArray(colorsArr);
    if (detail === window.util.wizardFireballWrapper) {
      detail.style.background = color;
      detail.querySelector('input').value = color;
    } else {
      detail.style.fill = color;
      window.util.wizardSetupWrapper.querySelector('input[name="' + inputName + '"]').value = color;
    }
  };

  window.colorize = {
    changeWizardDetailsColor: changeWizardDetailsColor
  };
})();
