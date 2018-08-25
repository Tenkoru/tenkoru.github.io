'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500;
  var MIDDLE_VALUE = 'middle';
  var LOW_VALUE = 'low';
  var HIGHT_VALUE = 'hight';
  var container = document.querySelector('.tokyo');
  var pinFilters = container.querySelector('.tokyo__filters');
  var filterFeatruesPanel = container.querySelector('.tokyo__filters');
  var filterFeatrues = filterFeatruesPanel.querySelectorAll('input[type=' + 'checkbox' + ']');
  function pinFilterHandler() {
    debounce(function () {
      window.pin.initPins(filterPins(window.AllAdverts));
    });
  }
  function debounce(method) {
    var lastTimeout;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(method, DEBOUNCE_INTERVAL);
  }
  function getFilterFeaturesValues() { /* получаем значение кнопок с фичами*/
    var result = [];
    Array.from(filterFeatrues).forEach(function (element) {
      if (element.checked === true) {
        result.push(element.value);
      }
    });
    return result;
  }
  function getFiltersValues() { /* получаем значение инпутов с фильтрами*/
    var filters = Array.from(container.querySelectorAll('.tokyo__filter'));
    var result = [];
    filters.forEach(function (element) {
      result.push(element.value);
    });
    return result;
  }
  function checkAdvertValues(advert) { /* переводим значение в подходящий тип*/
    var val = advert.offer.price;
    if (val >= 10000 && val <= 50000) {
      return MIDDLE_VALUE;
    } else if (val <= 10000) {
      return LOW_VALUE;
    } else {
      return HIGHT_VALUE;
    }
  }
  function checkForAny(value) { /* проверяем инпут на значение "any"*/
    return value === 'any';
  }
  function filterInput(inputValue, advertValue) { /* проверяем на остальные значения*/
    return checkForAny(inputValue) ? true : inputValue === advertValue;
  }
  function filterFeatures(advert) {
    var features = advert.offer.features;/* список фич конкретного объявления*/
    var featuresValues = getFilterFeaturesValues();/* используем цикл for, потому что нужно его вовремя прервать*/
    for (var i = 0; i < featuresValues.length; i++) {
      if (features.indexOf(featuresValues[i]) < 0) {
        return false;
      }
    }
    return true;
  }
  function filterPins(adverts) {
    var filtersValues = getFiltersValues();
    var type = filtersValues[0];
    var price = filtersValues[1];
    var rooms = filtersValues[2];
    var guest = filtersValues[3];
    var result = adverts.filter(function (advert) { /* стало выглядеть еще более запутано*/
      return (filterInput(type, advert.offer.type)) & (filterInput(price, checkAdvertValues(advert))) & (filterInput(rooms, advert.offer.rooms.toString())) & (filterInput(guest, advert.offer.guests.toString())) & (filterFeatures(advert));
    });
    return result;
  }
  pinFilters.addEventListener('change', pinFilterHandler);
})();

