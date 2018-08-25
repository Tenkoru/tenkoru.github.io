'use strict';
(function () {
  var MAP_WIDTH = 1200;
  var MAP_HEIGHT = 650;
  var mainPin = document.querySelector('.pin__main');
  var address = document.querySelector('#address');
  var pinWidth = mainPin.offsetWidth;
  var pinHeight = mainPin.offsetHeight;

  function dragHandler(evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var pinTop = mainPin.offsetTop - shift.y;
      var pinLeft = mainPin.offsetLeft - shift.x;
      function calculatePinX() {
        if (pinTop < 0) {
          pinTop = 0;
          onMouseUp(moveEvt);
        }
        if (pinTop > MAP_HEIGHT - pinHeight) {
          pinTop = MAP_HEIGHT - pinHeight;
          onMouseUp(moveEvt);
        }
        return pinTop;
      }
      function calculatePinY() {
        if (pinLeft < 0) {
          pinLeft = 0;
          onMouseUp(moveEvt);
        }
        if (pinLeft > MAP_WIDTH - pinWidth) {
          pinLeft = MAP_WIDTH - pinWidth;
          onMouseUp(moveEvt);
        }
        return pinLeft;
      }
      mainPin.style.top = calculatePinX() + 'px';
      mainPin.style.left = calculatePinY() + 'px';
      address.value = 'x:' + (calculatePinY() + pinWidth / 2) + ', y:' + (calculatePinX() + pinHeight);
    }
    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
  window.backend.load(window.pin.initPins, window.backend.onError);
  mainPin.addEventListener('mousedown', dragHandler);
})();
