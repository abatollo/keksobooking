'use strict';

var AVATAR_LIST = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];

var OFFER_TYPE_LIST = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var OFFER_CHECKIN_CHECKOUT_LIST = [
  '12:00',
  '13:00',
  '14:00'
];

var OFFER_FEATURES_LIST = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var OFFER_PHOTOS_LIST = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var getRandomArrayItem = function (arr) {
  var randomArrayItem = arr[getRandomNumber(0, arr.length)];

  return randomArrayItem;
};

var getRandomLengthArray = function (arr) {
  var randomLength = getRandomNumber(0, arr.length);
  var randomArray = [];

  for (var i = 0; i < randomLength; i++) {
    var randomItem = getRandomArrayItem(arr);

    if (randomArray.indexOf(randomItem) === -1) {
      randomArray[i] = randomItem;
    } else {
      i--;
    }
  }

  return randomArray;
};

var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min) + min);

  return randomNumber;
};

var getRandomString = function () {
  var randomString = Math.random().toString(36).substring(2, 15);

  return randomString;
};

var getMapWidth = function () {
  var mapWidth = document.querySelector('.map').offsetWidth;

  return mapWidth;
};

var generateMockAds = function (arrLength) {
  var arr = [];

  for (var i = 0; i < arrLength; i++) {
    var locationX = getRandomNumber(0, getMapWidth());
    var locationY = getRandomNumber(130, 630);

    arr.push({
      author: {
        avatar: AVATAR_LIST[i]
      },
      offer: {
        title: getRandomString(),
        address: locationX + ', ' + locationY,
        price: getRandomNumber(20000, 70000),
        type: getRandomArrayItem(OFFER_TYPE_LIST),
        rooms: getRandomNumber(1, 4),
        guests: getRandomNumber(0, 4),
        checkin: getRandomArrayItem(OFFER_CHECKIN_CHECKOUT_LIST),
        checkout: getRandomArrayItem(OFFER_CHECKIN_CHECKOUT_LIST),
        features: getRandomLengthArray(OFFER_FEATURES_LIST),
        description: getRandomString(),
        photos: getRandomLengthArray(OFFER_PHOTOS_LIST)
      },
      location: {
        x: locationX,
        y: locationY
      }
    });
  }

  return arr;
};

var renderAd = function (ad, templateContent) {
  var adElement = templateContent.cloneNode(true);
  var adElementImg = adElement.querySelector('img');

  adElement.style.left = ad.location.x - 25 + 'px';
  adElement.style.top = ad.location.y - 70 + 'px';
  adElementImg.setAttribute('src', ad.author.avatar);
  adElementImg.setAttribute('alt', ad.offer.title);

  return adElement;
};

var renderAds = function (adsArray, templateId) {
  var fragment = document.createDocumentFragment();
  var pinTemplateContent = document.querySelector(templateId).content.querySelector('.map__pin');

  for (var i = 0; i < adsArray.length; i++) {
    fragment.appendChild(renderAd(adsArray[i], pinTemplateContent));
  }

  document.querySelector('.map__pins').appendChild(fragment);
};

var map = document.querySelector('.map');

map.classList.remove('map--faded');

var ads = generateMockAds(8);

renderAds(ads, '#pin');

// Отображаем карточку объявления

var renderCard = function (ad, templateContent) {
  var cardElement = templateContent.cloneNode(true);
  var cardElementTitle = cardElement.querySelector('.popup__title');
  var cardElementAddress = cardElement.querySelector('.popup__text--address');
  var cardElementPrice = cardElement.querySelector('.popup__text--price');
  var cardElementType = cardElement.querySelector('.popup__type');
  var cardElementRoomsGuests = cardElement.querySelector('.popup__text--capacity');
  var cardElementCheckinCheckout = cardElement.querySelector('.popup__text--time');
  var cardElementFeatures = cardElement.querySelector('.popup__features');
  var cardElementDescription = cardElement.querySelector('.popup__description');
  var cardElementPhotos = cardElement.querySelector('.popup__photos');
  var cardElementAvatar = cardElement.querySelector('.popup__avatar');

  cardElementTitle.textContent = ad.offer.title;
  cardElementAddress.textContent = ad.offer.address;
  cardElementPrice.textContent = ad.offer.price + '₽/ночь';
  cardElementType.textContent = ad.offer.type;
  switch (ad.offer.type) {
    case 'flat':
      cardElementType.textContent = 'Квартира';
      break;
    case 'bungalo':
      cardElementType.textContent = 'Бунгало';
      break;
    case 'house':
      cardElementType.textContent = 'Дом';
      break;
    case 'palace':
      cardElementType.textContent = 'Дворец';
      break;
  }
  cardElementRoomsGuests.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  cardElementCheckinCheckout.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  cardElementFeatures.textContent = ad.offer.features.toString();
  cardElementDescription.textContent = ad.offer.description;
  var cardElementPhotosImage = cardElementPhotos.querySelector('img');
  if (ad.offer.photos.length === 0) {
    cardElementPhotosImage.remove();
  } else if (ad.offer.photos.length === 1) {
    cardElementPhotosImage.setAttribute('src', ad.offer.photos.toString());
  } else if (ad.offer.photos.length > 1) {
    cardElementPhotosImage.setAttribute('src', ad.offer.photos[0].toString());
    var cardElementPhotosImageCloned = cardElementPhotosImage.cloneNode();
    for (var i = 1; i < ad.offer.photos.length; i++) {
      cardElementPhotosImageCloned.setAttribute('src', ad.offer.photos[i].toString());
      cardElementPhotos.appendChild(cardElementPhotosImageCloned);
    }
  }
  cardElementAvatar.setAttribute('src', ad.author.avatar);

  return cardElement;
};

var renderCards = function (adsArray, arrayIndex, templateId) {
  var fragment = document.createDocumentFragment();
  var cardTemplateContent = document.querySelector(templateId).content;

  fragment.appendChild(renderCard(adsArray[arrayIndex], cardTemplateContent));

  var beforeElement = document.querySelector('.map__filters-container');
  document.querySelector('.map').insertBefore(fragment, beforeElement);
};

renderCards(ads, 1, '#card');
