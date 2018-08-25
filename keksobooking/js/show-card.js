'use strict';
(function () {
  window.showCard = {
    show: function (pin) {
      var container = document.querySelector('.tokyo');
      var dialog = container.querySelector('.dialog');
      window.card.paintAdToDOM(pin);
      dialog.classList.remove('hidden');
    }
  };
})();
