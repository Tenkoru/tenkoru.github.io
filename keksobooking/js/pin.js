'use strict';
(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var NUM_OF_START_PINS = 3;
  var PIN_WIDTH = 56;
  var HALF_OF_PIN = PIN_WIDTH / 2;
  var PIN_HEIGHT = 75;
  var IMG_SIZE = 40;
  var container = document.querySelector('.tokyo');
  var dialog = container.querySelector('.dialog');
  var dialogClose = dialog.querySelector('.dialog__close');

  function dialogMouseCloseHandler() {
    closeDialog();
    hidePins(getAllpins());
    dialogClose.removeEventListener('click', dialogMouseCloseHandler);
  }
  function dialogKeyCloseHandler(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeDialog();
      hidePins(getAllpins());
    }
  }
  function getAllpins() {
    return container.querySelectorAll('.pin');
  }
  function renderPin(advert) {

    var pin = document.createElement('div');
    var img = document.createElement('img');
    pin.classList.add('pin');
    pin.setAttribute('style', 'left: ' + (advert.location.x - HALF_OF_PIN).toString() + 'px; top: ' + (advert.location.y - PIN_HEIGHT).toString() + 'px');
    pin.setAttribute('tabindex', '0');
    img.classList.add('rounded');
    img.setAttribute('src', advert.author.avatar);
    img.setAttribute('width', IMG_SIZE);
    img.setAttribute('height', IMG_SIZE);
    pin.appendChild(img);
    pin.addEventListener('click', function () {
      onClickPin(advert, pin);
    });
    pin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        onClickPin(advert, pin);
      }
    });
    return pin;
  }
  function closeDialog() {
    dialog.classList.add('hidden');
  }
  function hidePins(arrPins) {
    arrPins.forEach(function (element) {
      element.classList.remove('pin--active');
    });
  }
  function onClickPin(pin, pinElement) {
    hidePins(getAllpins());
    pinElement.classList.add('pin--active');
    window.showCard.show(pin);
    dialogClose.addEventListener('click', dialogMouseCloseHandler);
  }
  function removePins(arrPins) {
    arrPins.forEach(function (element) {
      if (!element.classList.contains('pin__main')) {
        element.remove();
      }
    });
  }
  function getRandomElements(arr, numOfElements) {
    var result = [];
    var randomIndex = 0;
    for (var i = 0; i < numOfElements; i++) {
      /* используем цикл for, потому что нужно менять значение итератора*/
      randomIndex = Math.floor(Math.random() * arr.length);
      if (result.indexOf(arr[randomIndex]) < 0) {
        result.push(arr[randomIndex]);
      } else {
        i--;
      }
    }
    return result;
  }
  closeDialog();
  window.pin = {
    initPins: function (array, firstLoad) {
      if (firstLoad) {
        window.AllAdverts = array;
        array = getRandomElements(array, NUM_OF_START_PINS);
      }
      removePins(getAllpins());
      var map = document.querySelector('.tokyo');
      array.forEach(function (element) {
        map.appendChild(renderPin(element));
      });
    }
  };
  window.addEventListener('keydown', dialogKeyCloseHandler);
})();
