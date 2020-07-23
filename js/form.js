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

  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = document.querySelectorAll('.ad-form fieldset');
  var addressField = document.querySelector('.ad-form #address');


  // Валидируем значение количества гостей: их должно быть не больше, чем количество комнат
  var roomNumberSelect = document.querySelector('#room_number');
  var roomNumberSelectOptions = roomNumberSelect.querySelectorAll('option');
  var capacitySelect = document.querySelector('#capacity');
  var capacitySelectOptions = capacitySelect.querySelectorAll('option');

  var resetForm = function () {
    // Добавляем на select в форме фильтрации объявлений атрибут disabled, который убираем, если пользователь активировал карту и форму
    for (var i = 0; i < window.map.mapFiltersSelects.length; i++) {
      window.map.mapFiltersSelects[i].disabled = true;
    }

    // Добавляем на fieldset в форме фильтрации объявлений атрибут disabled, который убираем, если пользователь активировал карту и форму
    window.map.mapFiltersFieldset.disabled = true;

    // Добавляем форме класс ad-form--disabled, который убираем, если пользователь активировал карту и форму
    adForm.classList.add('ad-form--disabled');

    // Добавляем на блоки fieldset в форме заполнения объявления атрибут disabled, который убираем, если пользователь активировал карту и форму
    for (i = 0; i < adFormFieldsets.length; i++) {
      adFormFieldsets[i].disabled = true;
    }

    // Устанавливаем координаты середины главной метки и подставляем их в поле адреса
    var mapPinMain = document.querySelector('.map__pin--main');
    var addressX = mapPinMain.offsetLeft + (mapPinMain.offsetWidth / 2);
    var addressY = mapPinMain.offsetTop + (mapPinMain.offsetHeight / 2);
    addressField.value = addressX + ', ' + addressY;

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
  };

  // При выборе другого количества комнат — смотрим сколько комнат выбрано — перебираем все возможные числа гостей —
  // — разрешаем выбирать только те числа, которые подходят, — все остальные числа отключаем
  roomNumberSelect.addEventListener('change', function () {
    // Перебириаем массив с колличеством мест для гостей. Если значение опции получается найти в массиве (то есть индекс элемента >= 0),
    // который является значением соответствующего свойства в объекте COMPLIANCE_OPTIONS, то опцию надо включить, а если нет — выключить
    for (var i = 0; i < capacitySelectOptions.length; i++) {
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

  var form = document.querySelector('.ad-form');
  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), successHandler, errorHandler);
    evt.preventDefault();
  });

  var successHandler = function () {
    window.map.deactivateMap();
    resetForm();
    adForm.reset();
    window.map.mapPinMain.style.left = window.util.PIN_LEFT_DEFAULT_POSITION;
    window.map.mapPinMain.style.top = window.util.PIN_TOP_DEFAULT_POSITION;
    window.move.newAdress();
    renderSuccess(window.util.SUCCESS_ID);
  };

  var renderSuccess = function (templateId) {
    var fragment = document.createDocumentFragment();
    var successTemplateContent = document.querySelector(templateId).content.querySelector('.success');
    var successElement = successTemplateContent.cloneNode(true);
    fragment.appendChild(successElement);
    document.querySelector('main').appendChild(fragment);

    successElement.addEventListener('click', function () {
      successElement.remove();
      document.removeEventListener('keydown', onSuccessEscPress);
    });
    document.addEventListener('keydown', onSuccessEscPress);
  };

  var onSuccessEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      var successElement = document.querySelector('.success');
      successElement.remove();
      document.removeEventListener('keydown', onSuccessEscPress);
    }
  };

  var renderError = function (templateId) {
    var fragment = document.createDocumentFragment();
    var errorTemplateContent = document.querySelector(templateId).content.querySelector('.error');
    var errorElement = errorTemplateContent.cloneNode(true);
    fragment.appendChild(errorElement);
    document.querySelector('main').appendChild(fragment);

    errorElement.addEventListener('click', function () {
      errorElement.remove();
      document.removeEventListener('keydown', onErrorEscPress);
    });
    document.addEventListener('keydown', onErrorEscPress);
  };

  var onErrorEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      var errorElement = document.querySelector('.error');
      errorElement.remove();
      document.removeEventListener('keydown', onErrorEscPress);
    }
  };

  var errorHandler = function () {
    renderError(window.util.ERROR_ID);
  };

  var resetBtn = document.querySelector('.ad-form__reset');

  resetBtn.addEventListener('click', function () {
    adForm.reset();
  });

  resetBtn.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      adForm.reset();
    }
  });

  return {
    adForm: adForm,
    adFormFieldsets: adFormFieldsets,
    addressField: addressField,
    resetForm: resetForm
  };
})();
