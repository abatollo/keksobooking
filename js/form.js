'use strict';

// Модуль, который работает с формой объявления

window.form = (function () {
  var COMPLIANCE_OPTIONS = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var TYPE_PRICE = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  // Добавляем на select в форме фильтрации объявлений атрибут disabled, который убираем, если пользователь активировал карту и форму
  for (var i = 0; i < window.map.mapFiltersSelects.length; i++) {
    window.map.mapFiltersSelects[i].disabled = true;
  }

  // Добавляем на fieldset в форме фильтрации объявлений атрибут disabled, который убираем, если пользователь активировал карту и форму
  window.map.mapFiltersFieldset.disabled = true;

  // Добавляем форме класс ad-form--disabled, который убираем, если пользователь активировал карту и форму
  var adForm = document.querySelector('.ad-form');
  adForm.classList.add('ad-form--disabled');

  // Добавляем на блоки fieldset в форме заполнения объявления атрибут disabled, который убираем, если пользователь активировал карту и форму
  var adFormFieldsets = document.querySelectorAll('.ad-form fieldset');
  for (i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].disabled = true;
  }

  // Устанавливаем координаты середины главной метки и подставляем их в поле адреса
  var mapPinMain = document.querySelector('.map__pin--main');
  var addressX = mapPinMain.offsetLeft + (mapPinMain.offsetWidth / 2);
  var addressY = mapPinMain.offsetTop + (mapPinMain.offsetHeight / 2);
  var addressField = document.querySelector('.ad-form #address');
  addressField.value = addressX + ', ' + addressY;

  // Валидируем значение количества гостей: их должно быть не больше, чем количество комнат
  var roomNumberSelect = document.querySelector('#room_number');
  var roomNumberSelectOptions = roomNumberSelect.querySelectorAll('option');
  var capacitySelect = document.querySelector('#capacity');
  var capacitySelectOptions = capacitySelect.querySelectorAll('option');

  // По умолчанию в количестве комнат устаналиваем одну комнату
  for (i = 0; i < roomNumberSelectOptions.length; i++) {
    if (roomNumberSelectOptions[i].value === '1') {
      roomNumberSelectOptions[i].selected = true;
    }
  }
  // По умолчанию в количестве гостей устаналиваем одного гостя
  for (i = 0; i < capacitySelectOptions.length; i++) {
    if (capacitySelectOptions[i].value === '1') {
      capacitySelectOptions[i].selected = true;
    }
  }
  // По умолчанию блокируем возможность выбрать любой вариант, кроме «для 1 гостя»
  for (i = 0; i < capacitySelectOptions.length; i++) {
    if (capacitySelectOptions[i].value !== '1') {
      capacitySelectOptions[i].disabled = true;
    }
  }

  // При выборе другого количества комнат — смотрим сколько комнат выбрано — перебираем все возможные числа гостей —
  // — разрешаем выбирать только те числа, которые подходят, — все остальные числа отключаем
  roomNumberSelect.addEventListener('change', function () {
    // Перебириаем массив с колличеством мест для гостей. Если значение опции получается найти в массиве (то есть индекс элемента >= 0),
    // который является значением соответствующего свойства в объекте COMPLIANCE_OPTIONS, то опцию надо включить, а если нет — выключить
    for (i = 0; i < capacitySelectOptions.length; i++) {
      if (COMPLIANCE_OPTIONS[roomNumberSelect.value].indexOf(capacitySelectOptions[i].value) >= 0) {
        capacitySelectOptions[i].disabled = false;
      } else {
        capacitySelectOptions[i].disabled = true;
      }
    }
  });

  // В зависимости от типа жилья меняем минимальное значение цены и placeholder в соответствии с правилами в TYPE_PRICE

  var typeSelect = document.querySelector('#type');
  var priceInput = document.querySelector('#price');

  typeSelect.addEventListener('change', function () {
    priceInput.min = TYPE_PRICE[typeSelect.value];
    priceInput.placeholder = TYPE_PRICE[typeSelect.value];
  });

  // При выборе времени заезда выставляем такое же время выезда и наоборот
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');

  timeInSelect.addEventListener('change', function () {
    timeOutSelect.value = timeInSelect.value;
  });

  timeOutSelect.addEventListener('change', function () {
    timeInSelect.value = timeOutSelect.value;
  });

  return {
    adForm: adForm,
    adFormFieldsets: adFormFieldsets,
    addressField: addressField
  };
})();
