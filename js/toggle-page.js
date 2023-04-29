'use strict';

// Модуль активации и деактивации страницы: карты и формы

window.togglePage = (function () {
  // Функция активации карты по клику или нажатию Enter на главном маркере
  var activate = function () {
    // -= Активируем карту =-

    // Убираем затенение у карты, раз пользователь активировал карту и форму
    window.map.map.classList.remove('map--faded');

    // Удаляем обработчики клика мышкой и нажатия с клавиатуры по главному маркеру, раз пользователь активировал карту и форму
    window.map.mainPin.removeEventListener('mousedown', window.map.onMainPinClick);
    window.map.mainPin.removeEventListener('keydown', window.map.onMainPinKeydown);

    // Убираем у select в форме фильтрации объявлений атрибут disabled, раз пользователь активировал карту и форму
    Array.from(window.map.selects).forEach(
        function (select) {
          select.disabled = false;
        }
    );

    // Убираем у fieldset в форме фильтрации объявлений атрибут disabled, раз пользователь активировал карту и форму
    window.map.fieldset.disabled = false;

    // -= Активируем форму =-

    // Убираем затенение у формы, раз пользователь активировал карту и форму
    window.form.form.classList.remove('ad-form--disabled');

    // Убираем у блоков fieldset в форме заполнения объявления атрибут disabled, раз пользователь активировал карту и форму
    Array.from(window.form.fieldsets).forEach(
        function (fieldset) {
          fieldset.disabled = false;
        }
    );

    // Запрашиваем данные с сервера и отрисовываем метки, если данные получены, или выводим сообщение об ошибке, если что-то не так
    window.download(window.data.onSuccess, window.data.onError);
  };

  var deactivate = function () {
    // -= Деактивируем карту =-

    // Добавляем затенение карте, раз пользователь активировал карту и форму
    window.map.map.classList.add('map--faded');

    // Добавляем обработчики клика мышкой и нажатия с клавиатуры по главному маркеру, раз пользователь деактивировал карту и форму
    window.map.mainPin.addEventListener('mousedown', window.map.onMainPinClick);
    window.map.mainPin.addEventListener('keydown', window.map.onMainPinKeydown);

    // Добавляем select в форме фильтрации объявлений атрибут disabled, раз пользователь деактивировал карту и форму
    Array.from(window.map.selects).forEach(
        function (select) {
          select.disabled = true;
        }
    );

    // Добавляем fieldset в форме фильтрации объявлений атрибут disabled, раз пользователь деактивировал карту и форму
    window.map.fieldset.disabled = true;

    window.filter.form.reset();

    // -= Деактивируем форму =-

    // Добавляем затенение форме, раз пользователь деактивировал карту и форму
    window.form.form.classList.add('ad-form--disabled');

    // Добавляем блокам fieldset в форме заполнения объявления атрибут disabled, раз пользователь деактивировал карту и форму
    Array.from(window.form.fieldsets).forEach(
        function (fieldset) {
          fieldset.disabled = true;
        }
    );

    // Сбрасываем все значения формы на значения по умолчанию
    window.form.form.reset();

    // По умолчанию в количестве гостей устаналиваем одного гостя
    for (var i = 0; i < window.form.capacitySelectOptions.length; i++) {
      if (window.form.capacitySelectOptions[i].value === '1') {
        window.form.capacitySelectOptions[i].selected = true;
      }
    }

    // По умолчанию блокируем возможность выбрать любой вариант, кроме «для 1 гостя»
    for (i = 0; i < window.form.capacitySelectOptions.length; i++) {
      if (window.form.capacitySelectOptions[i].value !== '1') {
        window.form.capacitySelectOptions[i].disabled = true;
      }
    }

    // Удаляем все метки, кроме главной
    window.pin.deletePins();

    // Удаляем карточку, если она открыта
    window.card.removeCard();

    // Переносим главную метку на позицию по умолчанию
    window.map.mainPin.style.left = window.util.PIN_LEFT_DEFAULT_POSITION;
    window.map.mainPin.style.top = window.util.PIN_TOP_DEFAULT_POSITION;

    // Подставляем координаты острого конца метки в поле адреса
    window.move();

    // Устанавливаем в блоке предпросмотра аватарки изображение по умолчанию
    window.imagePreview.avatarPreview.src = 'img/muffin-grey.svg';

    // Удаляем содержимое блока предпросмотра фотографий жилья
    window.imagePreview.photoPreview.innerHTML = '';
  };

  // При первом открытии страницы — деактивируем страницу
  deactivate();

  return {
    activate: activate,
    deactivate: deactivate
  };
})();
