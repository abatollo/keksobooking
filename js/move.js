'use strict';

// Модуль, который отвечает за перетаскивание главной метки по карте

window.move = (function () {
  // Устанавливаем координаты острого конца главной метки, округляем их и подставляем в поле адреса
  // window.util.MAIN_PIN_TIP_HEIGHT — это высота острого конца, который задан с помощью элемента ::after
  var setCoordinates = function () {
    var horizontalCoordinates = Math.round(window.map.mainPin.offsetLeft + (window.map.mainPin.offsetWidth / 2));
    var verticalCoordinates = Math.round(window.map.mainPin.offsetTop + window.map.mainPin.offsetHeight + window.util.MAIN_PIN_TIP_HEIGHT);
    window.form.addressField.value = horizontalCoordinates + ', ' + verticalCoordinates;
  };

  window.map.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startingCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startingCoordinates.x - moveEvt.clientX,
        y: startingCoordinates.y - moveEvt.clientY
      };

      startingCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      var topShift = window.map.mainPin.offsetTop - shift.y;
      var leftShift = window.map.mainPin.offsetLeft - shift.x;

      if ((topShift >= window.util.TOP_LIMIT) && (topShift <= window.util.BOTTOM_LIMIT)) {
        window.map.mainPin.style.top = (window.map.mainPin.offsetTop - shift.y) + 'px';
      }

      if ((leftShift >= (0 - (window.map.mainPin.offsetWidth / 2))) && (leftShift <= (window.map.map.offsetWidth - (window.map.mainPin.offsetWidth / 2)))) {
        window.map.mainPin.style.left = (window.map.mainPin.offsetLeft - shift.x) + 'px';
      }

      setCoordinates();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  return setCoordinates;
})();
