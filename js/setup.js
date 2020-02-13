'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setupOpen = document.querySelector('.setup-open');
  var setupClose = window.util.setup.querySelector('.setup-close');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = window.util.setup.querySelector('.setup-similar-list');
  var wizard = window.util.setup.querySelector('.setup-wizard');
  var wizardCoat = wizard.querySelector('.wizard-coat');
  var wizardEyes = wizard.querySelector('.wizard-eyes');
  var wizardFireball = window.util.setup.querySelector('.setup-fireball');

  var concatNameAndSurname = function (arr1, arr2) {
    return window.util.getRandomValueFromArray(arr1) + ' ' + window.util.getRandomValueFromArray(arr2);
  };

  var generateWizards = function (n) {
    var wizardsArr = new Array(n);
    for (var i = 0; i < n; i++) {
      wizardsArr[i] = {
        name: concatNameAndSurname(WIZARD_NAMES, WIZARD_SURNAMES),
        coatColor: window.util.getRandomValueFromArray(WIZARD_COAT_COLORS),
        eyesColor: window.util.getRandomValueFromArray(WIZARD_EYE_COLORS)
      };
    }
    return wizardsArr;
  };

  var renderWizard = function (wizardArr) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizardArr.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizardArr.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizardArr.eyesColor;

    return wizardElement;
  };

  var addWizard = function (wizardsArr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizardsArr.length; i++) {
      fragment.appendChild(renderWizard(wizardsArr[i]));
    }
    similarListElement.appendChild(fragment);
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closeSetupPopup();
    }
  };

  var openSetupPopup = function () {
    window.util.setup.style = '';
    window.util.setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closeSetupPopup = function () {
    window.util.setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', function () {
    openSetupPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      openSetupPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closeSetupPopup();
  });

  wizardCoat.addEventListener('click', function () {
    window.colorize.changeWizardDetailsColor(wizardCoat, WIZARD_COAT_COLORS, 'coat-color');
  });

  wizardEyes.addEventListener('click', function () {
    window.colorize.changeWizardDetailsColor(wizardEyes, WIZARD_EYE_COLORS, 'eyes-color');
  });

  wizardFireball.addEventListener('click', function () {
    window.colorize.changeWizardDetailsColor(window.util.wizardFireballWrapper, WIZARD_FIREBALL_COLORS);
  });


  addWizard(generateWizards(4));
  window.util.setup.querySelector('.setup-similar').classList.remove('hidden');
})();
