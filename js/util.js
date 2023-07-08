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
  var DOWNLOAD_DATA_URL = 'https://29.javascript.pages.academy/keksobooking/data';
  var UPLOAD_DATA_URL = 'https://29.javascript.pages.academy/keksobooking';
  var MAIN_PIN_TIP_HEIGHT = 22;
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  var TOP_LIMIT = 43;
  var BOTTOM_LIMIT = 543;
  var PIN_TOP_DEFAULT_POSITION = '375px';
  var PIN_LEFT_DEFAULT_POSITION = '570px';
  var MAX_PINS_AMOUNT = 5;
  var FILTER_LOW_PRICE = 10000;
  var FILTER_HIGH_PRICE = 50000;

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
    LEFT_MOUSE_BUTTON_CODE: LEFT_MOUSE_BUTTON_CODE,
    PIN_ID: PIN_ID,
    CARD_ID: CARD_ID,
    SUCCESS_ID: SUCCESS_ID,
    ERROR_ID: ERROR_ID,
    DOWNLOAD_DATA_URL: DOWNLOAD_DATA_URL,
    UPLOAD_DATA_URL: UPLOAD_DATA_URL,
    MAIN_PIN_TIP_HEIGHT: MAIN_PIN_TIP_HEIGHT,
    TOP_LIMIT: TOP_LIMIT,
    BOTTOM_LIMIT: BOTTOM_LIMIT,
    PIN_TOP_DEFAULT_POSITION: PIN_TOP_DEFAULT_POSITION,
    PIN_LEFT_DEFAULT_POSITION: PIN_LEFT_DEFAULT_POSITION,
    PIN_HEIGHT: PIN_HEIGHT,
    PIN_WIDTH: PIN_WIDTH,
    MAX_PINS_AMOUNT: MAX_PINS_AMOUNT,
    FILTER_LOW_PRICE: FILTER_LOW_PRICE,
    FILTER_HIGH_PRICE: FILTER_HIGH_PRICE,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };
})();
