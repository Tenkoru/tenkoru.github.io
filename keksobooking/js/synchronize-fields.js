'use strict';
(function () {
  window.synchronizeFields = {
    sync: function (source, target, callback) {
      source.addEventListener('change', function () {
        callback(target, source.value);
      });
    }
  };
})();
