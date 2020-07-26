'use strict';

// Модуль, который отвечает за форму размещения объявления

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

  var form = document.querySelector('.ad-form');
  var fieldsets = form.querySelectorAll('fieldset');
  var addressField = form.querySelector('#address');

  var roomNumberSelect = form.querySelector('#room_number');
  var roomNumberSelectOptions = roomNumberSelect.querySelectorAll('option');
  var capacitySelect = form.querySelector('#capacity');
  var capacitySelectOptions = capacitySelect.querySelectorAll('option');

  var typeSelect = form.querySelector('#type');
  var priceInput = form.querySelector('#price');

  var checkinSelect = form.querySelector('#timein');
  var checkoutSelect = form.querySelector('#timeout');

  var resetButton = form.querySelector('.ad-form__reset');

  // Валидируем значение количества гостей: их должно быть не больше, чем количество комнат
  // При выборе другого количества комнат — смотрим сколько комнат выбрано — перебираем все возможные числа гостей —
  // — разрешаем выбирать только те числа, которые подходят, — все остальные числа отключаем
  // и сразу явно выбираем самый большое количество гостей из допустимых вариантов
  roomNumberSelect.addEventListener('change', function () {
    // Перебириаем массив с колличеством мест для гостей. Если получается найти в массиве (то есть индекс элемента >= 0) значение опции,
    // которое является значением соответствующего свойства в объекте COMPLIANCE_OPTIONS, то такую опцию надо включить, а если нет — выключить
    for (var i = 0; i < capacitySelectOptions.length; i++) {
      if (COMPLIANCE_OPTIONS[roomNumberSelect.value].indexOf(capacitySelectOptions[i].value) >= 0) {
        capacitySelectOptions[i].disabled = false;
      } else {
        capacitySelectOptions[i].disabled = true;
      }
    }

    // Выбираем наибольшее возможное количество гостей, присваивая значение последнего элемента массива соответствующего свойства
    capacitySelect.value = COMPLIANCE_OPTIONS[roomNumberSelect.value][COMPLIANCE_OPTIONS[roomNumberSelect.value].length - 1];
  });

  // В зависимости от типа жилья меняем минимальное значение цены и placeholder в соответствии с правилами в TYPE_PRICE
  typeSelect.addEventListener('change', function () {
    priceInput.min = TYPE_PRICE[typeSelect.value];
    priceInput.placeholder = TYPE_PRICE[typeSelect.value];
  });

  // При выборе времени заезда выставляем такое же время выезда и наоборот
  checkinSelect.addEventListener('change', function () {
    checkoutSelect.value = checkinSelect.value;
  });

  checkoutSelect.addEventListener('change', function () {
    checkinSelect.value = checkoutSelect.value;
  });

  // Отправляем данные на сервер и показываем сообщение об успехе, если данные дошли, или выводим сообщение об ошибке, если что-то не так
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(form), successHandler, errorHandler);
  });

  var successHandler = function () {
    window.togglePage.deactivate();
    window.response.renderSuccess(window.util.SUCCESS_ID);
  };

  var errorHandler = function () {
    window.response.renderError(window.util.ERROR_ID);
  };

  // Добавляем обработчики кнопки сброса формы, которые деактивируют всю страницу
  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.togglePage.deactivate();
  });

  resetButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      evt.preventDefault();
      window.togglePage.deactivate();
    }
  });

  return {
    form: form,
    fieldsets: fieldsets,
    addressField: addressField,
    roomNumberSelectOptions: roomNumberSelectOptions,
    capacitySelectOptions: capacitySelectOptions
  };
})();
