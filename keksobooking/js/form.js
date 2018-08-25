'use strict';
(function () {
  var FLAT_VALUE = 1000;
  var BUNGALO_VALUE = 0;
  var HOUSE_VALUE = 5000;
  var PALACE_VALUE = 10000;
  var HUNDRED_ROOMS = '100';
  var ZERO_GUESTS = '0';
  var form = document.querySelector('.notice__form');
  var title = form.querySelector('#title');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var room = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var typeSelect = form.querySelector('#type');
  var price = form.querySelector('#price');
  var address = form.querySelector('#address');
  function submitHandler(event) {
    /* Ошибки обрабатываются, код не ломается, уведомление об ошибке перенесено на более видное место */
    event.preventDefault();
    window.backend.save(new FormData(form), function () {
      form.reset();
    }, window.backend.onError);
  }
  function requireHandler(event) {
    event.target.required = true;
  }
  function syncValues(element, sourceValue) {
    element.value = sourceValue;
  }
  function preventDefaultHandler(event) {
    event.preventDefault();
  }
  function syncValuesCapacity(element, sourceValue) {
    element.value = sourceValue === HUNDRED_ROOMS ? parseInt(ZERO_GUESTS, 10) : sourceValue;
  }
  function syncValuesCapacityReverse(element, sourceValue) {
    element.value = sourceValue === '0' ? parseInt(HUNDRED_ROOMS, 10) : sourceValue;
  }
  function setValues(element, value) {
    element.min = value;
    element.value = value;
    element.placeholder = value;
  }
  function syncValuesPrice(element, sourceValue) {
    if (sourceValue === 'flat') {
      setValues(element, FLAT_VALUE);
    } else if (sourceValue === 'bungalo') {
      setValues(element, BUNGALO_VALUE);
    } else if (sourceValue === 'house') {
      setValues(element, HOUSE_VALUE);
    } else {
      setValues(element, PALACE_VALUE);
    }
  }
  window.synchronizeFields.sync(capacity, room, syncValuesCapacityReverse);
  window.synchronizeFields.sync(timeIn, timeOut, syncValues);
  window.synchronizeFields.sync(room, capacity, syncValuesCapacity);
  window.synchronizeFields.sync(typeSelect, price, syncValuesPrice);

  title.addEventListener('change', requireHandler);
  address.addEventListener('keydown', preventDefaultHandler);
  form.addEventListener('submit', submitHandler);
})();

