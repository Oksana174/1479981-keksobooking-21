'use strict';
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const LOCATION_X_PIN_MAIN = 570;
const LOCATION_Y_PIN_MAIN = 375;
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

// функция блокировки или разблокировки fieldset
const changStateDisabled = function (boolean) {
  for (const fieldset of fieldsets) {
    fieldset.disabled = boolean;
  }
  return fieldsets;
};

// функция создание метки на карте по шаблону
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const createPinAd = function (array) {
  const clonePin = pinTemplate.cloneNode(true);
  clonePin.setAttribute(`style`, `left: ${array.location.x + PIN_WIDTH / 2}px; top: ${array.location.y + PIN_HEIGHT}px`);
  const picturePin = clonePin.querySelector(`img`);
  picturePin.src = array.author.avatar;
  picturePin.alt = array.offer.title;
  return clonePin;
};

const formAd = document.querySelector(`.ad-form`);
const fieldsets = formAd.querySelectorAll(`fieldset`);
const inputAdress = formAd.querySelector(`#address`);
const mapAds = document.querySelector(`.map`);
const mapPinMain = mapAds.querySelector(`.map__pin--main`);
const mapPins = mapAds.querySelector(`.map__pins`);
const typeHouse = formAd.querySelector(`#type`);
const priceNight = formAd.querySelector(`#price`);
const timeIn = formAd.querySelector(`#timein`);
const timeOut = formAd.querySelector(`#timeout`);
const roomNumber = formAd.querySelector(`#room_number`);
const guestNumber = formAd.querySelector(`#capacity`);

// сoздание 8 объектного массива
const listAds = createArrayRandom(8);

// интерактивные элементы формы делаем неактивными
const disabledState = function () {
  changStateDisabled(true);
  inputAdress.value = `${LOCATION_X_PIN_MAIN}` + `, ` + `${LOCATION_Y_PIN_MAIN}`;
};
disabledState();

// активация страницы
const activeState = function () {
  mapAds.classList.remove(`map--faded`);
  formAd.classList.remove(`ad-form--disabled`);
  changStateDisabled(false);
  inputAdress.value = `${LOCATION_X_PIN_MAIN + PIN_WIDTH / 2}` + `, ` + `${LOCATION_Y_PIN_MAIN + PIN_HEIGHT}`;
  mapPins.appendChild(fillingInFragment(listAds, createPinAd));
};

mapPinMain.addEventListener(`mousedown`, function (evt) {
  if (evt.which === 1) {
    activeState();
  }
});

mapPinMain.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    activeState();
  }
});

// влияние типа жилья на цену
const setAttributePrice = function () {
  if (typeHouse.value === `bungalow`) {
    priceNight.setAttribute(`min`, 0);
    priceNight.setAttribute(`placeholder`, 0);
  } else if (typeHouse.value === `flat`) {
    priceNight.setAttribute(`min`, 1000);
    priceNight.setAttribute(`placeholder`, 1000);
  } else if (typeHouse.value === `house`) {
    priceNight.setAttribute(`min`, 5000);
    priceNight.setAttribute(`placeholder`, 5000);
  } else if (typeHouse.value === `palace`) {
    priceNight.setAttribute(`min`, 10000);
    priceNight.setAttribute(`placeholder`, 10000);
  }
};
typeHouse.addEventListener(`change`, setAttributePrice);

// Поля «Время заезда» и «Время выезда» синхронизированы
const selectTime = function (evt) {
  timeIn.value = evt.target.value;
  timeOut.value = evt.target.value;
};
formAd.addEventListener(`change`, selectTime);

// Поле «Количество комнат» синхронизировано с полем «Количество мест»
const checkRoomsGuests = function () {
  const selectedRoom = roomNumber.selectedIndex;
  const selectedGuest = guestNumber.selectedIndex;
  if (selectedRoom === 0) {
    return (selectedGuest === 2);
  } else if (selectedRoom === 1) {
    return ((selectedGuest === 1) || (selectedGuest === 2));
  } else if (selectedRoom === 2) {
    return ((selectedGuest === 0) || (selectedGuest === 1) || (selectedGuest === 2));
  } else if (selectedRoom === 3) {
    return (selectedGuest === 3);
  } else {
    return false;
  }
};

const selectNew = function () {
  const isRoomGuestValid = checkRoomsGuests();
  if (!isRoomGuestValid) {
    roomNumber.setCustomValidity(`Некорректное значение, проверти количество гостей`);
    guestNumber.setCustomValidity(`Некорректное значение, количество гостей должно быть меньше или равно количеству комнат`);
  } else {
    roomNumber.setCustomValidity(``);
    guestNumber.setCustomValidity(``);
  }
};
roomNumber .addEventListener(`change`, selectNew);
guestNumber.addEventListener(`change`, selectNew);
