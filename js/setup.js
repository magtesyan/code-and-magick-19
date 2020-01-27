'use strict';

var userDialog = document.querySelector('.setup');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarListElement = userDialog.querySelector('.setup-similar-list');

userDialog.classList.remove('hidden');

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomValueFromArray = function (arr) {
  return arr[Math.round(Math.random() * (arr.length - 1))];
};

var concatNameAndSurname = function (arr1, arr2) {
  return getRandomValueFromArray(arr1) + ' ' + getRandomValueFromArray(arr2);
};

var wizards = new Array(4);
for (var i = 0; i < wizards.length; i++) {
  wizards[i] = {
    name: concatNameAndSurname(WIZARD_NAMES, WIZARD_SURNAMES),
    coatColor: getRandomValueFromArray(WIZARD_COAT_COLORS),
    eyesColor: getRandomValueFromArray(WIZARD_EYE_COLORS)
  };
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var addWizard = function (wizardsArr) {
  var fragment = document.createDocumentFragment();
  for (i = 0; i < wizardsArr.length; i++) {
    fragment.appendChild(renderWizard(wizardsArr[i]));
  }
  similarListElement.appendChild(fragment);
};

addWizard(wizards);
userDialog.querySelector('.setup-similar').classList.remove('hidden');
