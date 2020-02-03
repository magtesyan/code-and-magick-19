'use strict';

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarListElement = setup.querySelector('.setup-similar-list');
var wizard = setup.querySelector('.setup-wizard');
var wizardCoat = wizard.querySelector('.wizard-coat');
var wizardEyes = wizard.querySelector('.wizard-eyes');
var wizardFireball = setup.querySelector('.setup-fireball');
var wizardFireballWrapper = setup.querySelector('.setup-fireball-wrap');
var wizardSetupWrapper = setup.querySelector('.setup-wizard-appearance');

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var getRandomValueFromArray = function (arr) {
  return arr[Math.round(Math.random() * (arr.length - 1))];
};

var concatNameAndSurname = function (arr1, arr2) {
  return getRandomValueFromArray(arr1) + ' ' + getRandomValueFromArray(arr2);
};

var generateWizards = function (n) {
  var wizardsArr = new Array(n);
  for (var i = 0; i < n; i++) {
    wizardsArr[i] = {
      name: concatNameAndSurname(WIZARD_NAMES, WIZARD_SURNAMES),
      coatColor: getRandomValueFromArray(WIZARD_COAT_COLORS),
      eyesColor: getRandomValueFromArray(WIZARD_EYE_COLORS)
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
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closeSetupPopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var changeWizardDetailsColor = function (detail, colorsArr, inputName) {
  var color = getRandomValueFromArray(colorsArr);
  if (detail === wizardFireballWrapper) {
    detail.style.background = color;
    detail.querySelector('input').value = color;
  } else {
    detail.style.fill = color;
    wizardSetupWrapper.querySelector('input[name="' + inputName + '"]').value = color;
  }
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
  changeWizardDetailsColor(wizardCoat, WIZARD_COAT_COLORS, 'coat-color');
});

wizardEyes.addEventListener('click', function () {
  changeWizardDetailsColor(wizardEyes, WIZARD_EYE_COLORS, 'eyes-color');
});

wizardFireball.addEventListener('click', function () {
  changeWizardDetailsColor(wizardFireballWrapper, WIZARD_FIREBALL_COLORS);
});


addWizard(generateWizards(4));
setup.querySelector('.setup-similar').classList.remove('hidden');
