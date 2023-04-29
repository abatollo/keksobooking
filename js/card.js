'use strict';

// Модуль, который отвечает за создание и удаление карточки с объявлением

window.card = (function () {
  var OFFER_TYPES = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  // Функция удаления карточки объявления
  var removeCard = function () {
    var oldCard = document.querySelector('.map__card');
    if (oldCard) {
      oldCard.remove();
    }
  };

  // Функция удаления карточки объявления по нажатию на Escape
  var onCardEscPress = function (evt) {
    window.util.isEscEvent(evt, function () {
      evt.preventDefault();
      removeCard();
      document.removeEventListener('keydown', onCardEscPress);
    });
  };

  var setText = function (element, content, action) {
    if (content) {
      if (action) {
        element.textContent = action();
      } else {
        element.textContent = content;
      }
    } else {
      element.remove();
    }
  };

  // Функция отрисовки одной карточки объявления
  var renderCard = function (ad, templateId) {
    var fragment = document.createDocumentFragment();
    var templateContent = document.querySelector(templateId).content;

    var cardElement = templateContent.cloneNode(true);
    var cardElementTitle = cardElement.querySelector('.popup__title');
    var cardElementAddress = cardElement.querySelector('.popup__text--address');
    var cardElementPrice = cardElement.querySelector('.popup__text--price');
    var cardElementType = cardElement.querySelector('.popup__type');
    var cardElementRoomsGuests = cardElement.querySelector('.popup__text--capacity');
    var cardElementCheckinCheckout = cardElement.querySelector('.popup__text--time');
    var cardElementFeatures = cardElement.querySelector('.popup__features');
    var cardElementFeaturesWifi = cardElementFeatures.querySelector('.popup__feature--wifi');
    var cardElementFeaturesDishwasher = cardElementFeatures.querySelector('.popup__feature--dishwasher');
    var cardElementFeaturesParking = cardElementFeatures.querySelector('.popup__feature--parking');
    var cardElementFeaturesWasher = cardElementFeatures.querySelector('.popup__feature--washer');
    var cardElementFeaturesElevator = cardElementFeatures.querySelector('.popup__feature--elevator');
    var cardElementFeaturesConditioner = cardElementFeatures.querySelector('.popup__feature--conditioner');
    var OfferFeatures = {
      'wifi': cardElementFeaturesWifi,
      'dishwasher': cardElementFeaturesDishwasher,
      'parking': cardElementFeaturesParking,
      'washer': cardElementFeaturesWasher,
      'elevator': cardElementFeaturesElevator,
      'conditioner': cardElementFeaturesConditioner
    };
    var cardElementDescription = cardElement.querySelector('.popup__description');
    var cardElementPhotos = cardElement.querySelector('.popup__photos');
    var cardElementPhotosImage = cardElementPhotos.querySelector('img');
    var cardElementAvatar = cardElement.querySelector('.popup__avatar');
    var cardElementClose = cardElement.querySelector('.popup__close');

    setText(cardElementTitle, ad.offer.title);

    setText(cardElementAddress, ad.offer.address);

    setText(cardElementPrice, ad.offer.price, function () {
      return ad.offer.price + '₽/ночь';
    });

    setText(cardElementType, ad.offer.type, function () {
      return OFFER_TYPES[ad.offer.type];
    });

    setText(cardElementRoomsGuests, ad.offer.rooms, function () {
      return ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    });

    setText(cardElementCheckinCheckout, ad.offer.checkin && ad.offer.checkout, function () {
      return 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    });

    if (ad.offer.features && ad.offer.features.length > 0) {
      cardElementFeatures.innerHTML = '';
      ad.offer.features.forEach(
          function (feature) {
            cardElementFeatures.appendChild(OfferFeatures[feature]);
          }
      );
    } else {
      cardElementFeatures.remove();
    }

    setText(cardElementDescription, ad.offer.description);

    if (ad.offer.photos && ad.offer.photos.length > 0) {
      cardElementPhotosImage.remove();
      ad.offer.photos.forEach(function (photo) {
        var cardElementPhotosImageCloned = cardElementPhotosImage.cloneNode(true);
        cardElementPhotosImageCloned.setAttribute('src', photo);
        cardElementPhotos.appendChild(cardElementPhotosImageCloned);
      });
    } else {
      cardElementPhotos.remove();
    }

    if (ad.author.avatar) {
      cardElementAvatar.setAttribute('src', ad.author.avatar);
    } else {
      cardElementAvatar.remove();
    }

    fragment.appendChild(cardElement);

    var beforeElement = document.querySelector('.map__filters-container');
    document.querySelector('.map').insertBefore(fragment, beforeElement);

    cardElementClose.addEventListener('click', function () {
      removeCard();
    });

    document.addEventListener('keydown', onCardEscPress);
  };

  return {
    removeCard: removeCard,
    renderCard: renderCard
  };
})();
