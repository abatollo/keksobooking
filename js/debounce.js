'use strict';

// Модуль, который устраняет "дребезг" при переотрисовке меток

window.debounce = (function () {
  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;
  var debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  return {
    debounce: debounce
  };
})();
