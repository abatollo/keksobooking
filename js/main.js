'use strict';

window.main = (function () {
  // Отрисовываем маркеры на основании имеющихся данных в соответствии с оболочкой шаблона
  window.pin.renderPins(window.data.ads, window.util.PIN_ID);

  // Отрисовываем карточку с индексом 1 на основании имеющихся данных в соответствии с оболочкой шаблона
  window.card.renderCards(window.data.ads, 1, window.util.CARD_ID);

  // Сразу подставляем координаты острого конца метки в поле адреса
  window.move.newAdress();
})();
