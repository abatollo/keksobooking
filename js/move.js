'use strict';

// Модуль, который отвечает за перетаскивание главной метки по карте

window.move = (function () {
  // Устанавливаем координаты острого конца главной метки и подставляем их в поле адреса
  // window.util.PIN_HEIGHT — это высота острого конца, который задан с помощью элемента ::after
  var newAdress = function () {
    var newAddressX = window.map.mainPin.offsetLeft + (window.map.mainPin.offsetWidth / 2);
    var newAddressY = window.map.mainPin.offsetTop + window.map.mainPin.offsetHeight + window.util.PIN_HEIGHT;
    window.form.addressField.value = newAddressX + ', ' + newAddressY;
  };

  window.map.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
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

      newAdress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  return {
    newAdress: newAdress
  };
})();
