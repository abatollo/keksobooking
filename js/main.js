'use strict';

// -=-=-=-=-=-=-=-
// -= КОНСТАНТЫ =-
// -=-=-=-=-=-=-=-

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var ADS_NUMBER = 8;

var AVATAR_LIST = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];

var OFFER_TYPE_LIST = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var OFFER_CHECKIN_CHECKOUT_LIST = [
  '12:00',
  '13:00',
  '14:00'
];

var OFFER_FEATURES_LIST = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var OFFER_PHOTOS_LIST = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var COMPLIANCE_OPTIONS = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

// -=-=-=-=-=-=-=-
// -=- ФУНКЦИИ -=-
// -=-=-=-=-=-=-=-

// Функция получения случайного числа

var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min) + min);

  return randomNumber;
};

// Функция получения случайного элемента из массива

var getRandomArrayItem = function (arr) {
  var randomArrayItem = arr[getRandomNumber(0, arr.length)];

  return randomArrayItem;
};

// Функция получения массива случайной длины

var getRandomLengthArray = function (arr) {
  var randomLength = getRandomNumber(0, arr.length);
  var randomArray = [];

  for (var i = 0; i < randomLength; i++) {
    var randomItem = getRandomArrayItem(arr);

    if (randomArray.indexOf(randomItem) === -1) {
      randomArray[i] = randomItem;
    } else {
      i--;
    }
  }

  return randomArray;
};

// Функция получения случайной строки

var getRandomString = function () {
  var randomString = Math.random().toString(36).substring(2, 15);

  return randomString;
};

// Функция получения ширины карты

var getMapWidth = function () {
  var mapWidth = document.querySelector('.map').offsetWidth;

  return mapWidth;
};

// Функция создания данных в виде массива заданой длины из констант в начале файла

var generateMockAds = function (arrLength) {
  var arr = [];

  for (var i = 0; i < arrLength; i++) {
    var locationX = getRandomNumber(0, getMapWidth());
    var locationY = getRandomNumber(130, 630);

    arr.push({
      author: {
        avatar: AVATAR_LIST[i]
      },
      offer: {
        title: getRandomString(),
        address: locationX + ', ' + locationY,
        price: getRandomNumber(20000, 70000),
        type: getRandomArrayItem(OFFER_TYPE_LIST),
        rooms: getRandomNumber(1, 4),
        guests: getRandomNumber(0, 4),
        checkin: getRandomArrayItem(OFFER_CHECKIN_CHECKOUT_LIST),
        checkout: getRandomArrayItem(OFFER_CHECKIN_CHECKOUT_LIST),
        features: getRandomLengthArray(OFFER_FEATURES_LIST),
        description: getRandomString(),
        photos: getRandomLengthArray(OFFER_PHOTOS_LIST)
      },
      location: {
        x: locationX,
        y: locationY
      }
    });
  }

  return arr;
};

// Функция отрисовки одного маркера внутри содержимого шаблона

var renderSinglePin = function (ad, templateContent, iterator) {
  var adElement = templateContent.cloneNode(true);
  var adElementImg = adElement.querySelector('img');

  adElement.style.left = ad.location.x - 25 + 'px';
  adElement.style.top = ad.location.y - 70 + 'px';
  adElementImg.setAttribute('src', ad.author.avatar);
  adElementImg.setAttribute('alt', ad.offer.title);

  adElement.addEventListener('click', function () {
    removeCard();
    renderAllCards(ads, iterator, '#card');
  });

  adElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      removeCard();
      renderAllCards(ads, iterator, '#card');
    }
  });

  return adElement;
};

// Функция отрисовки всех маркеров из полученного массива в оболочку шаблона

var renderAllPins = function (adsArray, templateId) {
  var fragment = document.createDocumentFragment();
  var pinTemplateContent = document.querySelector(templateId).content.querySelector('.map__pin');

  for (var i = 0; i < adsArray.length; i++) {
    fragment.appendChild(renderSinglePin(adsArray[i], pinTemplateContent, i));
  }

  document.querySelector('.map__pins').appendChild(fragment);
};

// Функция удаления карточки объявления
var removeCard = function () {
  var oldCard = document.querySelector('.map__card');
  if (oldCard) {
    oldCard.remove();
  }
};

var onCardEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    removeCard();
    document.removeEventListener('keydown', onCardEscPress);
  }
};

// Функция отрисовки одной карточки объявления

var renderSingleCard = function (ad, templateContent) {
  var cardElement = templateContent.cloneNode(true);
  var cardElementTitle = cardElement.querySelector('.popup__title');
  var cardElementAddress = cardElement.querySelector('.popup__text--address');
  var cardElementPrice = cardElement.querySelector('.popup__text--price');
  var cardElementType = cardElement.querySelector('.popup__type');
  var cardElementRoomsGuests = cardElement.querySelector('.popup__text--capacity');
  var cardElementCheckinCheckout = cardElement.querySelector('.popup__text--time');
  var cardElementFeatures = cardElement.querySelector('.popup__features');
  var cardElementDescription = cardElement.querySelector('.popup__description');
  var cardElementPhotos = cardElement.querySelector('.popup__photos');
  var cardElementAvatar = cardElement.querySelector('.popup__avatar');
  var cardElementClose = cardElement.querySelector('.popup__close');

  cardElementTitle.textContent = ad.offer.title;
  cardElementAddress.textContent = ad.offer.address;
  cardElementPrice.textContent = ad.offer.price + '₽/ночь';
  cardElementType.textContent = ad.offer.type;
  switch (ad.offer.type) {
    case 'flat':
      cardElementType.textContent = 'Квартира';
      break;
    case 'bungalo':
      cardElementType.textContent = 'Бунгало';
      break;
    case 'house':
      cardElementType.textContent = 'Дом';
      break;
    case 'palace':
      cardElementType.textContent = 'Дворец';
      break;
  }
  cardElementRoomsGuests.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  cardElementCheckinCheckout.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  cardElementFeatures.textContent = ad.offer.features.toString();
  cardElementDescription.textContent = ad.offer.description;
  var cardElementPhotosImage = cardElementPhotos.querySelector('img');
  if (ad.offer.photos.length === 0) {
    cardElementPhotosImage.remove();
  } else if (ad.offer.photos.length === 1) {
    cardElementPhotosImage.setAttribute('src', ad.offer.photos.toString());
  } else if (ad.offer.photos.length > 1) {
    cardElementPhotosImage.setAttribute('src', ad.offer.photos[0].toString());
    var cardElementPhotosImageCloned = cardElementPhotosImage.cloneNode();
    for (var i = 1; i < ad.offer.photos.length; i++) {
      cardElementPhotosImageCloned.setAttribute('src', ad.offer.photos[i].toString());
      cardElementPhotos.appendChild(cardElementPhotosImageCloned);
    }
  }
  cardElementAvatar.setAttribute('src', ad.author.avatar);

  cardElementClose.addEventListener('click', function () {
    removeCard();
  });

  document.addEventListener('keydown', onCardEscPress);

  return cardElement;
};

// Функция отрисовки всех карточек объявлений

var renderAllCards = function (adsArray, arrayIndex, templateId) {
  var fragment = document.createDocumentFragment();
  var cardTemplateContent = document.querySelector(templateId).content;

  fragment.appendChild(renderSingleCard(adsArray[arrayIndex], cardTemplateContent));

  var beforeElement = document.querySelector('.map__filters-container');
  document.querySelector('.map').insertBefore(fragment, beforeElement);
};

// Функция активации карты по клику или нажатию Enter на главном маркере
var activateMap = function () {

  // Убираем затенение у карты
  var map = document.querySelector('.map');
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
  adForm.classList.remove('ad-form--disabled');

  // Убираем у блоков fieldset в форме заполнения объявления атрибут disabled, раз пользователь активировал карту и форму
  for (i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].disabled = false;
  }

  // Устанавливаем координаты острого конца главной метки и подставляем их в поле адреса
  // 22 пикселя — это высота острого конца, который задан с помощью элемента ::after
  var newAddressX = mapPinMain.offsetLeft + (mapPinMain.offsetWidth / 2);
  var newAddressY = mapPinMain.offsetTop + mapPinMain.offsetHeight + 22;
  addressField.value = newAddressX + ', ' + newAddressY;
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

// -=-=-=-=-=-=-=-
// -= ПРОГРАММА =-
// -=-=-=-=-=-=-=-

// Собираем данные в виде массива из моков заданной в константе длины

var ads = generateMockAds(ADS_NUMBER);

// Отрисовываем сразу все маркеры на основании имеющихся данных на странице в соответствии с оболочкой шаблона
renderAllPins(ads, '#pin');

// Отрисовываем сразу все карточки на основании имеющихся данных на странице в соответствии с оболочкой шаблона
// На самом деле пока отрисовываем лишь одну карточку с индексом 1
renderAllCards(ads, 1, '#card');

// Добавляем на select в форме фильтрации объявлений атрибут disabled, который убираем, если пользователь активировал карту и форму
var mapFiltersSelects = document.querySelectorAll('.map__filters select');
for (var i = 0; i < mapFiltersSelects.length; i++) {
  mapFiltersSelects[i].disabled = true;
}

// Добавляем на fieldset в форме фильтрации объявлений атрибут disabled, который убираем, если пользователь активировал карту и форму
var mapFiltersFieldset = document.querySelector('.map__filters fieldset');
mapFiltersFieldset.disabled = true;

// Добавляем форме класс ad-form--disabled, который убираем, если пользователь активировал карту и форму
var adForm = document.querySelector('.ad-form');
adForm.classList.add('ad-form--disabled');

// Добавляем на блоки fieldset в форме заполнения объявления атрибут disabled, который убираем, если пользователь активировал карту и форму
var adFormFieldsets = document.querySelectorAll('.ad-form fieldset');
for (i = 0; i < adFormFieldsets.length; i++) {
  adFormFieldsets[i].disabled = true;
}

// Убираем у карты стиль неактивного состояния по нажатию на главный маркер мышью или с клавиатуры
var mapPinMain = document.querySelector('.map__pin--main');
mapPinMain.addEventListener('mousedown', onMapPinMainClick);
mapPinMain.addEventListener('keydown', onMapPinMainKeydown);

// Устанавливаем координаты середины главной метки и подставляем их в поле адреса
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
