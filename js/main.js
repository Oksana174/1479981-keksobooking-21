'use strict';
const PIN_WIDTH = 25;
const PIN_HEIGHT = 70;
const types = [`palace`, `flat`, `house`, `bungalow`];
const checkings = [`12:00`, `13:00`, `14:00`];
const photos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const titles = [`Большая квартира`, `Маленькая уютная квартира`, `Загородный большой дом`, `Однокомнатная уютная квартира`, `Небольшой гостевой домик`, `Домик в деревне`, `Уютный коттедж`, `Небольшая комната`];
const features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];

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

//  функция создания объекта
const createAd = function () {
  const objectAd = {
    author: {
      avatar: `img/avatars/user0 .png`,
    },
    offer: {
      title: titles[getRandomNumber(0, titles.length)],
      address: `location.x, location.y`,
      price: getRandomNumber(1000, 100000),
      type: types[getRandomNumber(0, types.length)],
      rooms: getRandomNumber(0, 5),
      guests: getRandomNumber(1, 9),
      checkin: checkings[getRandomNumber(0, checkings.length)],
      checkout: checkings[getRandomNumber(0, checkings.length)],
      features: getRandomArray(features),
      description: ``,
      photos: photos[getRandomNumber(0, photos.length)],
    },
    location: {
      x: getRandomNumber(100, 1000),
      y: getRandomNumber(130, 630),
    },
  };
  return objectAd;
};

// функция создания массива из объектов
const createArroyRandom = function () {
  const arrayAds = [];
  arrayAds.length = 8;
  for (let i = 0; i < arrayAds.length; i++) {
    arrayAds[i] = createAd();
    arrayAds[i].author.avatar = `img/avatars/user0${i + 1}.png`;
    arrayAds[i].offer.address = arrayAds[i].location.x + `, ` + arrayAds[i].location.y;
  }
  return arrayAds;
};
const listAds = createArroyRandom();

// удаление класса
const mapAds = document.querySelector(`.map`);
const mapPins = mapAds.querySelector(`.map__pins`);
mapAds.classList.remove(`map--faded`);

// функция создания метки
const createPinAd = function (ad) {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const clonePin = pinTemplate.cloneNode(true);
  clonePin.setAttribute(`style`, `left: ${ad.location.x - PIN_WIDTH}px; top: ${ad.location.y - PIN_HEIGHT}px`);
  const picturePin = clonePin.querySelector(`img`);
  picturePin.src = ad.author.avatar;
  picturePin.alt = ad.offer.title;
  return clonePin;
};

// добавление меток на карту
const fragmentAd = document.createDocumentFragment();
for (let i = 0; i < listAds.length; i++) {
  const pinAds = createPinAd(listAds[i]);
  fragmentAd.appendChild(pinAds);
}
mapPins.appendChild(fragmentAd);
