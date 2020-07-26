'use strict';

// Модуль, который отвечает за константы и утилитарные функции

window.util = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var LEFT_MOUSE_BUTTON_CODE = 0;
  var PIN_ID = '#pin';
  var CARD_ID = '#card';
  var SUCCESS_ID = '#success';
  var ERROR_ID = '#error';
  var DOWNLOAD_DATA_URL = 'https://javascript.pages.academy/keksobooking/data';
  var UPLOAD_DATA_URL = 'https://javascript.pages.academy/keksobooking';
  var PIN_HEIGHT = 22;
  var TOP_LIMIT = 43;
  var BOTTOM_LIMIT = 543;
  var PIN_TOP_DEFAULT_POSITION = '375px';
  var PIN_LEFT_DEFAULT_POSITION = '570px';

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

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  return {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    LEFT_MOUSE_BUTTON_CODE,
    PIN_ID: PIN_ID,
    CARD_ID: CARD_ID,
    SUCCESS_ID: SUCCESS_ID,
    ERROR_ID: ERROR_ID,
    DOWNLOAD_DATA_URL: DOWNLOAD_DATA_URL,
    UPLOAD_DATA_URL: UPLOAD_DATA_URL,
    PIN_HEIGHT: PIN_HEIGHT,
    TOP_LIMIT: TOP_LIMIT,
    BOTTOM_LIMIT: BOTTOM_LIMIT,
    PIN_TOP_DEFAULT_POSITION: PIN_TOP_DEFAULT_POSITION,
    PIN_LEFT_DEFAULT_POSITION: PIN_LEFT_DEFAULT_POSITION,
    getRandomNumber: getRandomNumber,
    getRandomArrayItem: getRandomArrayItem,
    getRandomLengthArray: getRandomLengthArray,
    getRandomString: getRandomString,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };
})();
