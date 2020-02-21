'use strict';

(function () {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = window.util.setup.querySelector('.setup-similar-list');

  var renderWizard = function (wizardArr) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizardArr.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizardArr.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizardArr.colorEyes;

    return wizardElement;
  };

  var onLoad = function (wizards) {
    similarListElement.innerHTML = '';
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    window.util.setup.querySelector('.setup-similar').classList.remove('hidden');
  };

  window.render = {
    onLoad: onLoad
  };

})();
