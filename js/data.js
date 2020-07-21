'use strict';

// Модуль, который создаёт данные

window.data = (function () {
  var ADS_NUMBER = 8;

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

  // Функция получения ширины карты

  var getMapWidth = function () {
    var mapWidth = document.querySelector('.map').offsetWidth;

    return mapWidth;
  };

  // Функция создания данных в виде массива заданой длины из констант в начале файла

  var generateMockAds = function (arrLength) {
    var arr = [];

    for (var i = 0; i < arrLength; i++) {
      var locationX = window.util.getRandomNumber(0, getMapWidth());
      var locationY = window.util.getRandomNumber(130, 630);

      arr.push({
        author: {
          avatar: AVATAR_LIST[i]
        },
        offer: {
          title: window.util.getRandomString(),
          address: locationX + ', ' + locationY,
          price: window.util.getRandomNumber(20000, 70000),
          type: window.util.getRandomArrayItem(OFFER_TYPE_LIST),
          rooms: window.util.getRandomNumber(1, 4),
          guests: window.util.getRandomNumber(0, 4),
          checkin: window.util.getRandomArrayItem(OFFER_CHECKIN_CHECKOUT_LIST),
          checkout: window.util.getRandomArrayItem(OFFER_CHECKIN_CHECKOUT_LIST),
          features: window.util.getRandomLengthArray(OFFER_FEATURES_LIST),
          description: window.util.getRandomString(),
          photos: window.util.getRandomLengthArray(OFFER_PHOTOS_LIST)
        },
        location: {
          x: locationX,
          y: locationY
        }
      });
    }

    return arr;
  };

  // Собираем данные в виде массива из моков заданной в константе длины

  var ads = generateMockAds(ADS_NUMBER);

  return {
    ads: ads
  };
})();
