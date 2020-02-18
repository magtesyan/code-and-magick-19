'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

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

  var renderWizard = function (wizardArr) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizardArr.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizardArr.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizardArr.colorEyes;

    return wizardElement;
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

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: auto; text-align: center; background-color: black;';
    node.style.position = 'absolute';
    node.style.left = '40%';
    node.style.right = '40%';
    node.style.top = '45%';
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var onLoad = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    window.util.setup.querySelector('.setup-similar').classList.remove('hidden');
  };

  window.backend.load(onLoad, onError);

  var form = window.util.setup.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      window.util.setup.classList.add('hidden');
    }, onError);
    evt.preventDefault();
  });
})();
