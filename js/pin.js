'use strict';

// Модуль, который отвечает за создание метки на карте

window.pin = (function () {
  // Функция отрисовки одного маркера внутри содержимого шаблона
  var renderSinglePin = function (ad, templateContent, iterator) {
    var adElement = templateContent.cloneNode(true);
    var adElementImg = adElement.querySelector('img');

    adElement.style.left = ad.location.x - window.util.PIN_WIDTH / 2 + 'px';
    adElement.style.top = ad.location.y - window.util.PIN_HEIGHT + 'px';
    adElementImg.setAttribute('src', ad.author.avatar);
    adElementImg.setAttribute('alt', ad.offer.title);

    adElement.addEventListener('click', function () {
      window.card.removeCard();
      window.card.renderCard(ad, '#card');
    });

    adElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        window.card.removeCard();
        window.card.renderCards(window.data.ads, iterator, '#card');
      }
    });

    return adElement;
  };

  // Функция отрисовки всех маркеров из полученного массива в оболочку шаблона
  var renderPins = function (adsArray, templateId) {
    var fragment = document.createDocumentFragment();
    var pinTemplateContent = document.querySelector(templateId).content.querySelector('.map__pin');

    adsArray.forEach(function (ad, iterator) {
      if (ad.offer) {
        fragment.appendChild(renderSinglePin(ad, pinTemplateContent, iterator));
      }
    });

    document.querySelector('.map__pins').appendChild(fragment);
  };

  var deletePins = function () {
    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    Array.from(allPins).forEach(
        function (pin) {
          pin.remove();
        }
    );
  };

  return {
    renderSinglePin: renderSinglePin,
    renderPins: renderPins,
    deletePins: deletePins
  };
})();
