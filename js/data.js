'use strict';

// Модуль, который получает и передаёт данные на отрисовку

window.data = (function () {

  var successHandler = function (adsArray) {
    window.adsArray = adsArray;
    window.pin.renderPins(window.adsArray, window.util.PIN_ID);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  return {
    successHandler: successHandler,
    errorHandler: errorHandler
  };
})();
