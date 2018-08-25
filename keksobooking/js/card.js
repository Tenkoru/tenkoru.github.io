'use strict';
(function () {
  var HOUSE_VALUE = 'house';
  var HOUSE_TRANSLATED_VALUE = 'Дом';
  var FLAT_VALUE = 'flat';
  var FLAT_TRANSLATED_VALUE = 'Квартира';
  var BUNGALO_TRANSLATED_VALUE = 'Сарай';
  var similarAdTemplate = document.querySelector('#lodge-template').content;
  var offerDialog = document.querySelector('#offer-dialog');
  var dialogTitle = offerDialog.querySelector('.dialog__title');
  var dialogAvatar = dialogTitle.querySelector('img');
  function addFeaturesToCard(domParent, featuresArr) {
    featuresArr.forEach(function (element) {
      var featuresNode = document.createElement('div');
      featuresNode.classList.add('feature__image');
      featuresNode.classList.add('feature__image--' + element);
      domParent.appendChild(featuresNode);
    });
  }
  function fixOfferType(offer) {
    if (offer === HOUSE_VALUE) {
      return HOUSE_TRANSLATED_VALUE;
    } else if (offer === FLAT_VALUE) {
      return FLAT_TRANSLATED_VALUE;
    } else {
      return BUNGALO_TRANSLATED_VALUE;
    }
  }
  window.card = {
    createElement: function (ad) {
      var adElement = similarAdTemplate.cloneNode(true);
      var featuresParent = adElement.querySelector('.lodge__features');
      var features = ad.offer.features;
      adElement.querySelector('.lodge__title').textContent = ad.offer.title;
      adElement.querySelector('.lodge__address').textContent = ad.offer.address;
      adElement.querySelector('.lodge__price').textContent = ad.offer.price + ' ₽/ночь';
      adElement.querySelector('.lodge__type').textContent = fixOfferType(ad.offer.type);
      adElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + ad.offer.guests + ' гостей в ' + ad.offer.rooms + ' комнатах';
      adElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
      addFeaturesToCard(featuresParent, features);
      adElement.querySelector('.lodge__description').textContent = ad.offer.description;
      dialogAvatar.setAttribute('src', ad.author.avatar);
      return adElement;
    },
    paintAdToDOM: function (pin) {
      var fragment = document.createDocumentFragment();
      fragment.appendChild(window.card.createElement(pin));
      var dialogPanels = document.querySelectorAll('.dialog__panel');
      dialogPanels.forEach(function (element) {
        element.remove();
      });
      offerDialog.appendChild(fragment);
    }
  };
})();

