'use strict';

// Модуль, который отвечает за фильтрацию меток объявлений

window.filter = (function () {
  var form = document.querySelector('.map__filters');
  var housingType = form.querySelector('#housing-type');
  // var housingPrice = form.querySelector('#housing-price');
  // var housingRooms = form.querySelector('#housing-rooms');
  // var housingGuests = form.querySelector('#housing-guests');
  // var filterWifi = form.querySelector('#filter-wifi');
  // var filterDishwasher = form.querySelector('#filter-dishwasher');
  // var filterParking = form.querySelector('#filter-parking');
  // var filterWasher = form.querySelector('#filter-washer');
  // var filterElevator = form.querySelector('#filter-elevator');
  // var filterConditioner = form.querySelector('#filter-conditioner');

  var updatePins = function () {
    window.card.removeCard();

    var originalAds = window.adsArray;

    var filteredAds = originalAds.filter(function (ad) {
      return ad.offer.type === housingType.value;
    });

    var slicedFilteredAds = filteredAds.slice(0, 5);

    window.pin.deletePins();

    window.debounce.debounce(function () {
      window.pin.renderPins(slicedFilteredAds, window.util.PIN_ID);
    }
    );
  };

  form.addEventListener('change', function () {
    updatePins();
  });

  return {

  };
})();
