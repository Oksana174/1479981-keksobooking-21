'use strict';
(function () {
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

  const getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const shuffle = function (array) {
    return array.sort(function () {
      return getRandomNumber(-1, 1);
    });
  };
  const getRandomArray = function (array) {
    return shuffle(array).slice(0, getRandomNumber(1, array.length));
  };

  const getRandomValue = function (array) {
    return array[getRandomNumber(0, array.length)];
  };

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

  const createArrayRandom = function (length) {
    const arrayAds = [];
    for (let i = 0; i < length; i++) {
      arrayAds[i] = createAd(i);
    }
    return arrayAds;
  };

  window.data = {
    createArray: createArrayRandom,
  };

})();
