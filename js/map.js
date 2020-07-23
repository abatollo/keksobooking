'use strict';

// Модуль, который управляет карточками объявлений и метками: добавляет на страницу нужную карточку, отрисовывает метки и осуществляет взаимодействие карточки и метки на карте

window.map = (function () {
  var mapFiltersSelects = document.querySelectorAll('.map__filters select');
  var mapFiltersFieldset = document.querySelector('.map__filters fieldset');

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');

  // Функция активации карты по клику или нажатию Enter на главном маркере
  var activateMap = function () {

    // Убираем затенение у карты
    map.classList.remove('map--faded');

    // Удаляем обработчики клика мышкой и нажатия с клавиатуры по главному маркеру, раз пользователь активировал карту и форму
    mapPinMain.removeEventListener('mousedown', onMapPinMainClick);
    mapPinMain.removeEventListener('keydown', onMapPinMainKeydown);

    // Убираем у select в форме фильтрации объявлений атрибут disabled, раз пользователь активировал карту и форму
    for (var i = 0; i < mapFiltersSelects.length; i++) {
      mapFiltersSelects[i].disabled = false;
    }

    // Убираем у fieldset в форме фильтрации объявлений атрибут disabled, раз пользователь активировал карту и форму
    mapFiltersFieldset.disabled = false;

    // Убираем у формы класс ad-form--disabled, раз пользователь активировал карту и форму
    window.form.adForm.classList.remove('ad-form--disabled');

    // Убираем у блоков fieldset в форме заполнения объявления атрибут disabled, раз пользователь активировал карту и форму
    for (i = 0; i < window.form.adFormFieldsets.length; i++) {
      window.form.adFormFieldsets[i].disabled = false;
    }

    window.load.getData(window.data.successHandler, window.data.errorHandler);
  };

  var deactivateMap = function () {
    // Добавляем затенение карте
    map.classList.add('map--faded');

    // Убираем у карты стиль неактивного состояния по нажатию на главный маркер мышью или с клавиатуры
    mapPinMain.addEventListener('mousedown', onMapPinMainClick);
    mapPinMain.addEventListener('keydown', onMapPinMainKeydown);

    // Добавляем select в форме фильтрации объявлений атрибут disabled, раз пользователь деактивировал карту и форму
    for (var i = 0; i < mapFiltersSelects.length; i++) {
      mapFiltersSelects[i].disabled = true;
    }

    // Добавляем fieldset в форме фильтрации объявлений атрибут disabled, раз пользователь деактивировал карту и форму
    mapFiltersFieldset.disabled = true;

    // Добавляем форме класс ad-form--disabled, раз пользователь деактивировал карту и форму
    window.form.adForm.classList.add('ad-form--disabled');

    // Добавляем блокам fieldset в форме заполнения объявления атрибут disabled, раз пользователь деактивировал карту и форму
    for (i = 0; i < window.form.adFormFieldsets.length; i++) {
      window.form.adFormFieldsets[i].disabled = true;
    }

    // Удаляем все метки, кроме главной
    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (i = 0; i < allPins.length; i++) {
      allPins[i].remove();
    }
  };

  // Функция реакции на нажатие мышкой на главный маркер
  var onMapPinMainClick = function (evt) {
    evt.preventDefault();
    // Реагируем на нажатие только левой кнопки мышки
    if (evt.button === 0) {
      activateMap();
    }
  };

  // Функция реакции на нажатие с клавиатуры по главному маркеру
  var onMapPinMainKeydown = function (evt) {
    // Реагируем на нажатие клавиатурной клавиши Enter, Return или её эквивалента по коду
    if (evt.keyCode === 13) {
      activateMap();
    }
  };

  // Убираем у карты стиль неактивного состояния по нажатию на главный маркер мышью или с клавиатуры
  mapPinMain.addEventListener('mousedown', onMapPinMainClick);
  mapPinMain.addEventListener('keydown', onMapPinMainKeydown);

  return {
    mapFiltersSelects: mapFiltersSelects,
    mapFiltersFieldset: mapFiltersFieldset,
    deactivateMap: deactivateMap,
    mapPinMain: mapPinMain
  };
})();
