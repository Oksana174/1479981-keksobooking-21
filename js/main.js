'use strict';
const PIN_WIDTH = 25;
const PIN_HEIGHT = 70;
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const CHECKINGS = [`12:00`, `13:00`, `14:00`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const TITLES = [`Большая квартира`, `Маленькая уютная квартира`, `Загородный большой дом`, `Однокомнатная уютная квартира`, `Небольшой гостевой домик`, `Домик в деревне`, `Уютный коттедж`, `Небольшая комната`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const ValueLocationX = {
  MIN: 100,
  MAX: 1000,
};
const ValueLocationY = {
  MIN: 130,
  MAX: 630,
};
const NumberOfRooms = {
  MIN: 1,
  MAX: 5,
};
const PricePerNight = {
  MIN: 1000,
  MAX: 100000,
};
const NumberOfGuests = {
  MIN: 1,
  MAX: 9,
};

// функция генерации случайного числа
const getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// функции сортировки и сохранения массива
const shuffle = function (array) {
  return array.sort(function () {
    return getRandomNumber(-1, 1);
  });
};
const getRandomArray = function (array) {
  return shuffle(array).slice(0, getRandomNumber(1, array.length));
};

// функция генерации случайного значения
const getRandomValue = function (array) {
  return array[getRandomNumber(0, array.length)];
};

//  функция создания объекта
const createAd = function (i) {
  const locationX = getRandomNumber(ValueLocationX.MIN, ValueLocationX.MAX);
  const locationY = getRandomNumber(ValueLocationY.MIN, ValueLocationY.MAX);
  const objectAd = {
    author: {
      avatar: `img/avatars/user0${i + 1}.png`,
    },
    offer: {
      title: getRandomValue(TITLES),
      address: `${locationX} , ${locationY}`,
      price: getRandomNumber(PricePerNight.MIN, PricePerNight.MAX),
      type: getRandomValue(TYPES),
      rooms: getRandomNumber(NumberOfRooms.MIN, NumberOfRooms.MAX),
      guests: getRandomNumber(NumberOfGuests.MIN, NumberOfGuests.MAX),
      checkin: getRandomValue(CHECKINGS),
      checkout: getRandomValue(CHECKINGS),
      features: getRandomArray(FEATURES),
      description: ``,
      photos: getRandomValue(PHOTOS),
    },
    location: {
      x: locationX,
      y: locationY,
    },
  };
  return objectAd;
};

// функция создания массива из объектов
const createArrayRandom = function (length) {
  const arrayAds = [];
  for (let i = 0; i < length; i++) {
    arrayAds[i] = createAd(i);
  }
  return arrayAds;
};

// функция вложение элементов вo фрагмент
const fillingInFragment = function (array, element) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < array.length; i++) {
    const pinAds = element(array[i]);
    fragment.appendChild(pinAds);
  }
  return fragment;
};

// сздание 8 объектного массива
const listAds = createArrayRandom(8);

// удаление класса
const mapAds = document.querySelector(`.map`);
const mapPins = mapAds.querySelector(`.map__pins`);
mapAds.classList.remove(`map--faded`);

// функция создание метки на карте по шаблону
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const createPinAd = function (array) {
  const clonePin = pinTemplate.cloneNode(true);
  clonePin.setAttribute(`style`, `left: ${array.location.x - PIN_WIDTH}px; top: ${array.location.y - PIN_HEIGHT}px`);
  const picturePin = clonePin.querySelector(`img`);
  picturePin.src = array.author.avatar;
  picturePin.alt = array.offer.title;
  return clonePin;
};

// добавление элементов-меток на карту
mapPins.appendChild(fillingInFragment(listAds, createPinAd));
