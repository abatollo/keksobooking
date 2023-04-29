'use strict';

// Модуль, который отвечает за карту, главную метку и фильтры

window.map = (function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var selects = map.querySelectorAll('.map__filters select');
  var fieldset = map.querySelector('.map__filters fieldset');

  // Функция реакции на нажатие мышью на главный маркер
  var onMainPinClick = function (evt) {
    evt.preventDefault();
    // Реагируем на нажатие только левой кнопки мышки
    if (evt.button === window.util.LEFT_MOUSE_BUTTON_CODE) {
      window.togglePage.activate();
    }
  };

  // Функция реакции на нажатие с клавиатуры по главному маркеру
  var onMainPinKeydown = function (evt) {
    // Реагируем на нажатие клавиатурной клавиши Enter, Return или её эквивалента по коду
    window.util.isEnterEvent(evt, function () {
      window.togglePage.activate();
    });
  };

  return {
    map: map,
    mainPin: mainPin,
    selects: selects,
    fieldset: fieldset,
    onMainPinClick: onMainPinClick,
    onMainPinKeydown: onMainPinKeydown
  };
})();
