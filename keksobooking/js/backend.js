'use strict';
(function () {
  var SERVER_URL = 'https://js.dump.academy/keksobooking';
  var RESPONSE_TIMEOUT = 10000;
  var RESPONCE_STATUS_OK = 200;
  var CONNECTION_ERROR_TEXT = 'Произошла ошибка соединения';
  var TIMEOUT_ERROR_TEXT = 'Запрос не успел выполниться за ';
  var MS = 'мс';
  var ERROR_WINDOW_STYLE = {
    style: 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;',
    left: 0,
    right: 0,
    fontSize: '30px'
  };
  function setup(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === RESPONCE_STATUS_OK) {
        onLoad(xhr.response, true);
      } else {
        var errorMsg = '';
        xhr.response.forEach(function (element) {
          errorMsg = errorMsg + element.fieldName + ' ' + element.errorMessage + ' ';
        });
        onError(errorMsg);
      }
    });
    xhr.addEventListener('error', function () {
      onError(CONNECTION_ERROR_TEXT);
    });
    xhr.addEventListener('timeout', function () {
      onError(TIMEOUT_ERROR_TEXT + xhr.timeout + MS);
    });
    xhr.timeout = RESPONSE_TIMEOUT;
    return xhr;
  }
  window.backend = {
    load: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);
      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = setup(onLoad, onError);
      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },
    onError: function (errorMessage) {
      var node = document.createElement('div');
      var form = document.querySelector('.notice__form');
      node.style = ERROR_WINDOW_STYLE.style;
      node.style.left = ERROR_WINDOW_STYLE.left;
      node.style.right = ERROR_WINDOW_STYLE.right;
      node.style.fontSize = ERROR_WINDOW_STYLE.fontSize;

      node.textContent = errorMessage;
      form.insertAdjacentElement('afterbegin', node);
    }
  };
})();
