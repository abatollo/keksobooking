'use strict';

// Модуль утилитарных функций и данных

window.util = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var PIN_ID = '#pin';
  var CARD_ID = '#card';
  var PIN_HEIGHT = 22;
  var TOP_LIMIT = 43;
  var BOTTOM_LIMIT = 543;

  // Функция получения случайного числа

  var getRandomNumber = function (min, max) {
    var randomNumber = Math.floor(Math.random() * (max - min) + min);

    return randomNumber;
  };

  // Функция получения случайного элемента из массива

  var getRandomArrayItem = function (arr) {
    var randomArrayItem = arr[getRandomNumber(0, arr.length)];

    return randomArrayItem;
  };

  // Функция получения массива случайной длины

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

  // Функция получения случайной строки

  var getRandomString = function () {
    var randomString = Math.random().toString(36).substring(2, 15);

    return randomString;
  };

  return {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    PIN_ID: PIN_ID,
    CARD_ID: CARD_ID,
    PIN_HEIGHT: PIN_HEIGHT,
    TOP_LIMIT: TOP_LIMIT,
    BOTTOM_LIMIT: BOTTOM_LIMIT,
    getRandomNumber: getRandomNumber,
    getRandomArrayItem: getRandomArrayItem,
    getRandomLengthArray: getRandomLengthArray,
    getRandomString: getRandomString
  };
})();
