'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var setupOpen = document.querySelector('.setup-open');
  var setupClose = window.util.setup.querySelector('.setup-close');

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

  window.backend.load(window.render.onLoad, onError);

  var form = window.util.setup.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      window.util.setup.classList.add('hidden');
    }, onError);
    evt.preventDefault();
  });
})();
