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

  var checkType = function (adOfferType) {
    return (adOfferType === housingType.value) || (housingType.value === 'any');
  };

  var checkPrice = function (adOfferPrice) {
    var check;
    switch (housingPrice.value) {
      case 'any':
        check = true;
        break;
      case 'low':
        check = adOfferPrice < 10000;
        break;
      case 'middle':
        check = (adOfferPrice > 10000) && (adOfferPrice < 50000);
        break;
      case 'high':
        check = adOfferPrice > 50000;
        break;
    }
    return check;
  };

  var checkRooms = function (adOfferRooms) {
    return (adOfferRooms === parseInt(housingRooms.value, 10)) || (housingRooms.value === 'any');
  };

  var checkGuests = function (adOfferGuests) {
    return (adOfferGuests === parseInt(housingGuests.value, 10)) || (housingGuests.value === 'any');
  };

  var checkWifi = function (adOfferFeaturesArray) {
    var check = true;
    if (filterWifi.checked) {
      check = adOfferFeaturesArray.indexOf('wifi') >= 0;
    }
    return check;
  };

  var checkDishwasher = function (adOfferFeaturesArray) {
    var check = true;
    if (filterDishwasher.checked) {
      check = adOfferFeaturesArray.indexOf('dishwasher') >= 0;
    }
    return check;
  };

  var checkParking = function (adOfferFeaturesArray) {
    var check = true;
    if (filterParking.checked) {
      check = adOfferFeaturesArray.indexOf('parking') >= 0;
    }
    return check;
  };

  var checkElevator = function (adOfferFeaturesArray) {
    var check = true;
    if (filterElevator.checked) {
      check = adOfferFeaturesArray.indexOf('elevator') >= 0;
    }
    return check;
  };

  var checkWasher = function (adOfferFeaturesArray) {
    var check = true;
    if (filterWasher.checked) {
      check = adOfferFeaturesArray.indexOf('washer') >= 0;
    }
    return check;
  };

  var checkConditioner = function (adOfferFeaturesArray) {
    var check = true;
    if (filterConditioner.checked) {
      check = adOfferFeaturesArray.indexOf('conditioner') >= 0;
    }
    return check;
  };

  var updatePins = function () {
    window.card.removeCard();

    var originalAds = window.adsArray;

    var filteredAds = originalAds.filter(function (ad) {
      if (
        checkType(ad.offer.type) &&
        checkPrice(ad.offer.price) &&
        checkRooms(ad.offer.rooms) &&
        checkGuests(ad.offer.guests) &&
        checkWifi(ad.offer.features) &&
        checkDishwasher(ad.offer.features) &&
        checkParking(ad.offer.features) &&
        checkWasher(ad.offer.features) &&
        checkElevator(ad.offer.features) &&
        checkConditioner(ad.offer.features)
      ) {
        var checkedAd = ad;
      }
      return checkedAd;
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
