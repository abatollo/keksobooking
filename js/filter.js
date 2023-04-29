'use strict';

// Модуль, который отвечает за фильтрацию меток объявлений

window.filter = (function () {
  var form = document.querySelector('.map__filters');
  var housingType = form.querySelector('#housing-type');
  var housingPrice = form.querySelector('#housing-price');
  var housingRooms = form.querySelector('#housing-rooms');
  var housingGuests = form.querySelector('#housing-guests');
  var filterWifi = form.querySelector('#filter-wifi');
  var filterDishwasher = form.querySelector('#filter-dishwasher');
  var filterParking = form.querySelector('#filter-parking');
  var filterWasher = form.querySelector('#filter-washer');
  var filterElevator = form.querySelector('#filter-elevator');
  var filterConditioner = form.querySelector('#filter-conditioner');

  var isType = function (adOfferType) {
    return (adOfferType === housingType.value) || (housingType.value === 'any');
  };

  var isPrice = function (adOfferPrice) {
    var check;
    switch (housingPrice.value) {
      case 'any':
        check = true;
        break;
      case 'low':
        check = adOfferPrice < window.util.FILTER_LOW_PRICE;
        break;
      case 'middle':
        check = (adOfferPrice > window.util.FILTER_LOW_PRICE) && (adOfferPrice < window.util.FILTER_HIGH_PRICE);
        break;
      case 'high':
        check = adOfferPrice > window.util.FILTER_HIGH_PRICE;
        break;
    }
    return check;
  };

  var isRooms = function (adOfferRooms) {
    return (adOfferRooms === parseInt(housingRooms.value, 10)) || (housingRooms.value === 'any');
  };

  var isGuests = function (adOfferGuests) {
    return (adOfferGuests === parseInt(housingGuests.value, 10)) || (housingGuests.value === 'any');
  };

  var isWifi = function (adOfferFeaturesArray) {
    return filterWifi.checked ? adOfferFeaturesArray.indexOf('wifi') >= 0 : true;
  };

  var isDishwasher = function (adOfferFeaturesArray) {
    return filterDishwasher.checked ? adOfferFeaturesArray.indexOf('dishwasher') >= 0 : true;
  };

  var isParking = function (adOfferFeaturesArray) {
    return filterParking.checked ? adOfferFeaturesArray.indexOf('parking') >= 0 : true;
  };

  var isElevator = function (adOfferFeaturesArray) {
    return filterElevator.checked ? adOfferFeaturesArray.indexOf('elevator') >= 0 : true;
  };

  var isWasher = function (adOfferFeaturesArray) {
    return filterWasher.checked ? adOfferFeaturesArray.indexOf('washer') >= 0 : true;
  };

  var isConditioner = function (adOfferFeaturesArray) {
    return filterConditioner.checked ? adOfferFeaturesArray.indexOf('conditioner') >= 0 : true;
  };

  var updatePins = function () {
    window.card.removeCard();

    var originalAds = window.adsArray;

    var filteredAds = originalAds.filter(function (ad) {
      return isType(ad.offer.type) &&
      isPrice(ad.offer.price) &&
      isRooms(ad.offer.rooms) &&
      isGuests(ad.offer.guests) &&
      isWifi(ad.offer.features) &&
      isDishwasher(ad.offer.features) &&
      isParking(ad.offer.features) &&
      isWasher(ad.offer.features) &&
      isElevator(ad.offer.features) &&
      isConditioner(ad.offer.features);
    });

    var slicedFilteredAds = filteredAds.slice(0, window.util.MAX_PINS_AMOUNT);

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
    form: form
  };
})();
