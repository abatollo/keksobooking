'use strict';

// Модуль, который отвечает за перетаскивание главной метки по карте

window.move = (function () {
  var mapPinMain = document.querySelector('.map__pin--main');

  // Устанавливаем координаты острого конца главной метки и подставляем их в поле адреса
  // window.util.PIN_HEIGHT — это высота острого конца, который задан с помощью элемента ::after
  var newAdress = function () {
    var newAddressX = mapPinMain.offsetLeft + (mapPinMain.offsetWidth / 2);
    var newAddressY = mapPinMain.offsetTop + mapPinMain.offsetHeight + window.util.PIN_HEIGHT;
    window.form.addressField.value = newAddressX + ', ' + newAddressY;
  };

  var map = document.querySelector('.map');

  mapPinMain.addEventListener('mousedown', function (evt) {
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

      var topShift = mapPinMain.offsetTop - shift.y;
      var leftShift = mapPinMain.offsetLeft - shift.x;

      if ((topShift >= window.util.TOP_LIMIT) && (topShift <= window.util.BOTTOM_LIMIT)) {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      }

      if ((leftShift >= (0 - (mapPinMain.offsetWidth / 2))) && (leftShift <= (map.offsetWidth - (mapPinMain.offsetWidth / 2)))) {
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
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
