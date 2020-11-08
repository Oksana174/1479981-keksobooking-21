/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!********************!*\
  !*** ./js/util.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const setDisable = function (isDisabled, collection) {
  for (const element of collection) {
    element.disabled = isDisabled;
  }
  return collection;
};

const uploadPhotos = function (element, link, type) {
  const file = element.files[0];
  const fileName = file.name.toLowerCase();
  const matches = type.some(function (it) {
    return fileName.endsWith(it);
  });
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener(`load`, function () {
      link.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
};

window.util = {
  setDisable,
  uploadPhotos
};

})();

(() => {
/*!*******************!*\
  !*** ./js/pin.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const MAIN_PIN_WIDTH = 62;
const MAIN_PIN_HEIGHT = 84;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const MAX_SIMILAR_PIN = 5;

const mapAds = document.querySelector(`.map`);
const mapPins = mapAds.querySelector(`.map__pins`);
const fieldsets = document.querySelectorAll(`fieldset`);
const mapFilters = document.querySelector(`.map__filters`);

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
let idPin = 0;
let clonePin;

const createPinAd = function (array) {
  clonePin = pinTemplate.cloneNode(true);
  clonePin.style.left = `${array.location.x - PIN_WIDTH / 2}px`;
  clonePin.style.top = `${array.location.y - PIN_HEIGHT}px`;
  const picturePin = clonePin.querySelector(`img`);
  picturePin.src = array.author.avatar;
  picturePin.alt = array.offer.title;
  clonePin.dataset.value = idPin;
  idPin++;
  clonePin.addEventListener(`click`, window.map.onIconClick);
  clonePin.addEventListener(`keydown`, onOpenCardEnter);
  return clonePin;
};

const onOpenCardEnter = function (evt) {
  if (evt.key === `Enter`) {
    window.map.onIconClick();
    clonePin.removeEventListener(`keydown`, onOpenCardEnter);
  }
};

const groupingPinAd = function (array) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < array.length; i++) {
    fragment.appendChild(createPinAd(array[i]));
  }
  mapPins.appendChild(fragment);
};

const removeElements = function () {
  const pins = window.pin.mapAds.querySelectorAll(`.map__pin`);
  const card = window.pin.map.querySelector(`.map__card`);
  for (let i = 0; i < pins.length; i++) {
    if (!pins[i].classList.contains(`map__pin--main`)) {
      pins[i].remove();
    }
  }
  if (card) {
    card.remove();
  }
  idPin = 0;
};

window.pin = {
  createPins: groupingPinAd,
  remove: removeElements,
  width: PIN_WIDTH,
  height: PIN_HEIGHT,
  mainWidth: MAIN_PIN_WIDTH,
  mainHeight: MAIN_PIN_HEIGHT,
  fieldset: fieldsets,
  filter: mapFilters,
  map: mapAds,
  maxSimilar: MAX_SIMILAR_PIN,
  mapAds: mapPins
};

})();

(() => {
/*!********************!*\
  !*** ./js/card.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const typeHouse = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  house: `Дом`,
  palace: `Дворец`
};
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);
let idCard;

const chooseAvailableFeatures = function (element, array) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  for (let m = 0; m < array.offer.features.length; m++) {
    const feature = document.createElement(`li`);
    feature.classList.add(`popup__feature`);
    feature.classList.add(`popup__feature--${array.offer.features[m]}`);
    element.appendChild(feature);
  }
};

const uploadPhotos = function (element, array) {
  for (let m = 0; m < array.offer.photos.length; m++) {
    const popupImg = element.querySelector(`img`);
    const clonePhoto = popupImg.cloneNode(false);
    clonePhoto.src = array.offer.photos[m];
    element.appendChild(clonePhoto);
  }
  element.querySelector(`img`).remove();
};

const createCardAd = function (array) {
  const cloneCard = cardTemplate.cloneNode(true);
  const featuresElement = cloneCard.querySelector(`.popup__features`);
  const photosElement = cloneCard.querySelector(`.popup__photos`);
  const descriptionElement = cloneCard.querySelector(`.popup__description`);
  const avatarElement = cloneCard.querySelector(`.popup__avatar`);
  const capacityElement = cloneCard.querySelector(`.popup__text--capacity`);
  cloneCard.querySelector(`.popup__title`).textContent = array.offer.title;
  cloneCard.querySelector(`.popup__text--address`).textContent = array.offer.address;
  cloneCard.querySelector(`.popup__text--price`).textContent =
  `${array.offer.price} ₽/ночь`;
  cloneCard.querySelector(`.popup__type`).textContent =
  typeHouse[array.offer.type];
  if (array.offer.rooms === 0 && array.offer.guests === 0) {
    capacityElement.remove();
  } else {
    capacityElement.textContent = `${array.offer.rooms} комнаты для ${array.offer.guests} гостей`;
  }
  cloneCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${array.offer.checkin}, выезд до ${array.offer.checkout}`;
  if (array.offer.features.length === 0) {
    featuresElement.remove();
  } else {
    chooseAvailableFeatures(featuresElement, array);
  }
  if (array.offer.description === ``) {
    descriptionElement.remove();
  } else {
    descriptionElement.textContent = array.offer.description;
  }
  if (array.offer.photos.length === 0) {
    photosElement.remove();
  } else {
    uploadPhotos(photosElement, array);
  }
  if (array.author.avatar === `` || array.author.avatar === undefined) {
    avatarElement.remove();
  } else {
    avatarElement.src = array.author.avatar;
  }
  cloneCard.dataset.value = idCard;
  return cloneCard;
};

const closePopup = function () {
  const article = window.pin.map.querySelector(`.map__card`);
  if (article) {
    window.pin.map.removeChild(article);
  }
};

const setId = function (value) {
  idCard = value;
};

window.card = {
  create: createCardAd,
  attribute: setId,
  closed: closePopup,
};


})();

(() => {
/*!**********************!*\
  !*** ./js/server.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const URL_GET = `https://21.javascript.pages.academy/keksobooking/data`;
const URL_SERVER = `https://21.javascript.pages.academy/keksobooking`;
const StatusCode = {
  OK: 200,
  NOTFOUND: 404,
  FORBIDDEN: 403
};
const TIMEOUT_IN_MS = 10000;

const onErrorLoad = function (errorMessage) {
  const node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: rgba(255,255,255,0.9)`;
  node.style.border = `3px solid rgba(255,0,0,0.8)`;
  node.style.borderRadius = `8px`;
  node.style.width = `650px`;
  node.style.minHeight = `80px`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.top = `20%`;
  node.style.fontSize = `22px`;
  node.style.lineHeight = `30px`;
  node.style.paddingTop = `15px`;
  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

const getXhrData = function (onSuccess, onError) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, function () {
    switch (xhr.status) {
      case StatusCode.OK:
        onSuccess(xhr.response);
        break;
      case StatusCode.NOTFOUND:
        onError(`Запрашиваемый ресурс не найден`);
        break;
      case StatusCode.FORBIDDEN:
        onError(`Отсутствует доступ к ресурсу`);
        break;
      default:
        onError(`Cтатус ответа: ${xhr.status} - ${xhr.statusText};`);
    }
  });
  xhr.addEventListener(`error`, function () {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, function () {
    onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
  });
  xhr.timeout = TIMEOUT_IN_MS;
  return xhr;
};

const loadRequest = function (onSuccess, onError) {
  const xhr = getXhrData(onSuccess, onError);
  xhr.open(`GET`, URL_GET);
  xhr.send();
};

const uploadReguestData = function (data, onSuccess, onError) {
  const xhr = getXhrData(onSuccess, onError);
  xhr.open(`POST`, URL_SERVER);
  xhr.send(data);
};

window.server = {
  load: loadRequest,
  upload: uploadReguestData,
  onErrorLoad,
};

})();

(() => {
/*!**************************!*\
  !*** ./js/page-state.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const formAd = document.querySelector(`.ad-form`);
const guestNumber = formAd.querySelector(`#capacity`);
const address = formAd.querySelector(`#address`);
const mainPin = window.pin.map.querySelector(`.map__pin--main`);
const priceNight = formAd.querySelector(`#price`);
const HOUSE_MIN_PRICE = 5000;
const MAIN_PIN_LEFT = 570;
const MAIN_PIN_TOP = 375;
const HALF_WIDTH_PIN = window.pin.mainWidth / 2;

const mainPinCoords = {
  x: mainPin.offsetLeft,
  y: mainPin.offsetTop,
};

const putStartCoordinatesMainPinToAddress = function (x, y) {
  address.value = `${x}, ${y}`;
};

const putNewCoordinatesMainPinToAddress = function (x, y) {
  address.value = `${Math.round(x + HALF_WIDTH_PIN)}, ${Math.round(y + window.pin.mainHeight)}`;
};

const disableState = function () {
  window.util.setDisable(true, window.pin.fieldset);
  window.util.setDisable(true, window.pin.filter);
  putStartCoordinatesMainPinToAddress(MAIN_PIN_LEFT, MAIN_PIN_TOP);
  window.pin.map.classList.add(`map--faded`);
  formAd.classList.add(`ad-form--disabled`);
};

const activeState = function () {
  window.server.load(window.map.onSuccessLoad, window.server.onErrorLoad);
  window.pin.map.classList.remove(`map--faded`);
  formAd.classList.remove(`ad-form--disabled`);
  putNewCoordinatesMainPinToAddress(mainPinCoords.x, mainPinCoords.y);
  priceNight.setAttribute(`min`, HOUSE_MIN_PRICE);
};

const activeMapClickOnMainPin = function () {
  activeState();
  mainPin.removeEventListener(`mousedown`, onMainPinClick);
  mainPin.removeEventListener(`keydown`, onMainPinEnter);
};

const onMainPinClick = function (evt) {
  if (evt.button === 0) {
    activeMapClickOnMainPin();
  }
};

const onMainPinEnter = function (evt) {
  if (evt.key === `Enter`) {
    activeMapClickOnMainPin();
  }
};

window.pageState = {
  blockPage: disableState,
  onMainPinClick,
  onMainPinEnter,
  setMainPinAddress: putNewCoordinatesMainPinToAddress,
  formAd,
  mainPin,
  capacity: guestNumber,
  price: priceNight,
  HOUSE_MIN_PRICE,
  MAIN_PIN_LEFT,
  MAIN_PIN_TOP,
};

})();

(() => {
/*!************************!*\
  !*** ./js/dragging.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const HALF_WIDTH_PIN = window.pin.mainWidth / 2;
const MAP_MIN_X = 0 - HALF_WIDTH_PIN;
const MAP_MAX_X = 1200 - HALF_WIDTH_PIN;
const MAP_MIN_Y = 130 - window.pin.mainHeight;
const MAP_MAX_Y = 630 - window.pin.mainHeight;
const map = document.querySelector(`.map`);

const calculationOfCoordinates = function (start, move) {
  const shift = {
    x: start.x - move.clientX,
    y: start.y - move.clientY,
  };
  const newMainPinCoords = {
    x: window.pageState.mainPin.offsetLeft - shift.x,
    y: window.pageState.mainPin.offsetTop - shift.y,
  };

  if (newMainPinCoords.x >= MAP_MAX_X) {
    newMainPinCoords.x = MAP_MAX_X;
  }
  if (newMainPinCoords.y >= MAP_MAX_Y) {
    newMainPinCoords.y = MAP_MAX_Y;
  }
  if (newMainPinCoords.x <= MAP_MIN_X) {
    newMainPinCoords.x = MAP_MIN_X;
  }
  if (newMainPinCoords.y <= MAP_MIN_Y) {
    newMainPinCoords.y = MAP_MIN_Y;
  }

  if (parseInt(window.pageState.mainPin.style.left, 10) !== newMainPinCoords.x) {
    start.x = move.clientX;
  }
  if (parseInt(window.pageState.mainPin.style.top, 10) !== newMainPinCoords.y) {
    start.y = move.clientY;
  }

  window.pageState.mainPin.style.left = newMainPinCoords.x + `px`;
  window.pageState.mainPin.style.top = newMainPinCoords.y + `px`;

  window.pageState.setMainPinAddress(newMainPinCoords.x, newMainPinCoords.y);
};

window.pageState.mainPin.addEventListener(`mousedown`, function (evt) {
  evt.preventDefault();
  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  const onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    calculationOfCoordinates(startCoords, moveEvt);
  };

  const onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    calculationOfCoordinates(startCoords, upEvt);
    map.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  map.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});

})();

(() => {
/*!*****************************!*\
  !*** ./js/upload-photos.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const avatarChooser = window.pageState.formAd.querySelector(`.ad-form__field input[type=file]`);
const avatarPreview = window.pageState.formAd.querySelector(`.ad-form-header__preview img`);
const photoChooser = window.pageState.formAd.querySelector(`.ad-form__upload input[type=file]`);
const photoPreview = window.pageState.formAd.querySelector(`.ad-form__photo`);
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const AVATAR_DEFAULT = `img/muffin-grey.svg`;

const avatarChangeHandler = function () {
  window.util.uploadPhotos(avatarChooser, avatarPreview, FILE_TYPES);
};

const photoFormChangeHandler = function () {
  const filePhoto = photoChooser.files[0];
  const fileName = filePhoto.name.toLowerCase();
  const matches = FILE_TYPES.some(function (it) {
    return fileName.endsWith(it);
  });
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener(`load`, function () {
      if (photoPreview.children.length === 0) {
        const imgElement = document.createElement(`img`);
        imgElement.style.width = `70px`;
        imgElement.style.height = `70px`;
        imgElement.alt = `Фотография жилья`;
        imgElement.src = reader.result;
        photoPreview.appendChild(imgElement);
      } else {
        photoPreview.firstChild.src = reader.result;
      }
    });
    reader.readAsDataURL(filePhoto);
  }
};

const resetImages = function () {
  const photoHousing = photoPreview.querySelector(`img`);
  if (photoHousing) {
    photoHousing.remove();
  }
  const nameAvatar = avatarPreview.src.split(`/`).pop();
  if (nameAvatar !== AVATAR_DEFAULT.split(`/`).pop()) {
    avatarPreview.src = AVATAR_DEFAULT;
  }
};

avatarChooser.addEventListener(`change`, avatarChangeHandler);
photoChooser.addEventListener(`change`, photoFormChangeHandler);

window.uploadPhotos = resetImages;

})();

(() => {
/*!********************!*\
  !*** ./js/form.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const BUNGALOW_MIN_PRICE = 0;
const FLAT_MIN_PRICE = 1000;
const PALACE_MIN_PRICE = 10000;
const ONE_ROOMS_INDEX = 0;
const TWO_ROOMS_INDEX = 1;
const THREE_ROOMS_INDEX = 2;
const HUNDRED_ROOMS_INDEX = 3;
const THREE_GUESTS_INDEX = 0;
const TWO_GUESTS_INDEX = 1;
const ONE_GUESTS_INDEX = 2;
const NO_GUESTS_INDEX = 3;
const typeHouse = window.pageState.formAd.querySelector(`#type`);
const timeIn = window.pageState.formAd.querySelector(`#timein`);
const timeOut = window.pageState.formAd.querySelector(`#timeout`);
const roomNumber = window.pageState.formAd.querySelector(`#room_number`);
const filterForm = document.querySelector(`.map__filters`);

const changeSelectPrice = function () {
  if (typeHouse.value === `bungalow`) {
    window.pageState.price.setAttribute(`min`, BUNGALOW_MIN_PRICE);
    window.pageState.price.setAttribute(`placeholder`, BUNGALOW_MIN_PRICE);
  } else if (typeHouse.value === `flat`) {
    window.pageState.price.setAttribute(`min`, FLAT_MIN_PRICE);
    window.pageState.price.setAttribute(`placeholder`, FLAT_MIN_PRICE);
  } else if (typeHouse.value === `house`) {
    window.pageState.price.setAttribute(`min`, window.pageState.HOUSE_MIN_PRICE);
    window.pageState.price.setAttribute(`placeholder`, window.pageState.HOUSE_MIN_PRICE);
  } else if (typeHouse.value === `palace`) {
    window.pageState.price.setAttribute(`min`, PALACE_MIN_PRICE);
    window.pageState.price.setAttribute(`placeholder`, PALACE_MIN_PRICE);
  }
};

const changeSelectTime = function (evt) {
  timeIn.value = evt.target.value;
  timeOut.value = evt.target.value;
};

const checkRoomsGuests = function () {
  const selectedRoom = roomNumber.selectedIndex;
  const selectedGuest = window.pageState.capacity.selectedIndex;
  if (selectedRoom === ONE_ROOMS_INDEX) {
    return (selectedGuest === ONE_GUESTS_INDEX);
  }
  if (selectedRoom === TWO_ROOMS_INDEX) {
    return ((selectedGuest === TWO_GUESTS_INDEX) || (selectedGuest === ONE_GUESTS_INDEX));
  }
  if (selectedRoom === THREE_ROOMS_INDEX) {
    return ((selectedGuest === THREE_GUESTS_INDEX) || (selectedGuest === TWO_GUESTS_INDEX) || (selectedGuest === ONE_GUESTS_INDEX));
  }
  if (selectedRoom === HUNDRED_ROOMS_INDEX) {
    return (selectedGuest === NO_GUESTS_INDEX);
  }
  return false;
};

const changeSelect = function () {
  const isRoomGuestValid = checkRoomsGuests();
  if (!isRoomGuestValid) {
    roomNumber.setCustomValidity(`Некорректное значение, проверти количество гостей`);
    window.pageState.capacity.setCustomValidity(`Некорректное значение, количество гостей должно быть меньше или равно количеству комнат`);
  } else {
    roomNumber.setCustomValidity(``);
    window.pageState.capacity.setCustomValidity(``);
  }
};

const reset = function () {
  window.pageState.formAd.reset();
  changeSelectPrice();
  filterForm.reset();
  window.pageState.mainPin.style.left = `${window.pageState.MAIN_PIN_LEFT}px`;
  window.pageState.mainPin.style.top = `${window.pageState.MAIN_PIN_TOP}px`;
  window.uploadPhotos();
  window.pin.remove();
  window.pageState.blockPage();
  window.pageState.mainPin.addEventListener(`mousedown`, window.pageState.onMainPinClick);
  window.pageState.mainPin.addEventListener(`keydown`, window.pageState.onMainPinEnter);
};

const resetClickButton = function (evt) {
  evt.preventDefault();
  reset();
};

window.form = {
  onPriceChange: changeSelectPrice,
  onTimeChange: changeSelectTime,
  onGuestOrRoomsChange: changeSelect,
  onResetButtonClick: resetClickButton,
  resetFormAndMap: reset,
  typeHouse,
  timeIn,
  timeOut,
  roomNumber,
  filter: filterForm
};

})();

(() => {
/*!************************!*\
  !*** ./js/debounce.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const DEBOUNCE_INTERVAL = 500; // ms

const debounce = function (cb) {
  let lastTimeout = null;

  return function (...parameters) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};

window.debounce = debounce;

})();

(() => {
/*!**************************!*\
  !*** ./js/filtration.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


let enabledFilters = {
  type: `any`,
  price: `any`,
  rooms: `any`,
  guests: `any`,
  features: []
};

const MIN_PRICE_FILTER = 10000;
const MAX_PRICE_FILTER = 50000;
const NumberOfRoom = {
  ONE: 1,
  TWO: 2,
  THREE: 3
};
const NumberOfGuests = {
  ONE: 1,
  TWO: 2,
  NOBODY: 0
};

const checkPriceFilter = function (item, price) {
  switch (item) {
    case `low`:
      return (price < MIN_PRICE_FILTER);
    case `middle`:
      return ((price >= MIN_PRICE_FILTER) && (price <= MAX_PRICE_FILTER));
    case `high`:
      return (price > MAX_PRICE_FILTER);
    default:
      return item === `any`;
  }
};
const checkRoomsFilter = function (item, rooms) {
  switch (item) {
    case `1`:
      return (rooms === NumberOfRoom.ONE);
    case `2`:
      return (rooms === NumberOfRoom.TWO);
    case `3`:
      return (rooms === NumberOfRoom.THREE);
    default:
      return item === `any`;
  }
};
const checkGuestsFilter = function (item, guests) {
  switch (item) {
    case `0`:
      return (guests === NumberOfGuests.NOBODY);
    case `1`:
      return (guests === NumberOfGuests.ONE);
    case `2`:
      return (guests === NumberOfGuests.TWO);
    default:
      return item === `any`;
  }
};

const checkFeaturesFilter = function (item) {
  const features = item.offer.features;
  const findFeatures = function (index) {
    return features.indexOf(enabledFilters.features[index]);
  };
  for (let i = 0; i < enabledFilters.features.length; i++) {
    const index = findFeatures(i);
    if (index < 0) {
      return false;
    }
  }
  return true;
};

const applyFilters = function (data) {
  let results = data.filter(function (item) {
    return (item.offer.type === enabledFilters.type || enabledFilters.type === `any`)
    && (checkPriceFilter(enabledFilters.price, item.offer.price))
    && (checkRoomsFilter(enabledFilters.rooms, item.offer.rooms))
    && (checkGuestsFilter(enabledFilters.guests, item.offer.guests))
    && (checkFeaturesFilter(item) || enabledFilters.features.length === 0);
  });
  if (results.length > window.pin.maxSimilar) {
    results = results.slice(0, window.pin.maxSimilar);
  }
  return results;
};

const onHousingTypeChange = function (evt) {
  enabledFilters.type = evt.target.value;
};
const onPriceChange = function (evt) {
  enabledFilters.price = evt.target.value;
};
const onRoomsChange = function (evt) {
  enabledFilters.rooms = evt.target.value;
};
const onGuestsChange = function (evt) {
  enabledFilters.guests = evt.target.value;
};
const onFeaturesChange = function (evt) {
  if (evt.target.className === `map__checkbox visually-hidden`) {
    const index = enabledFilters.features.indexOf(evt.target.value);
    if (evt.target.checked) {
      enabledFilters.features.push(evt.target.value);
    } else {
      enabledFilters.features.splice(index, 1);
    }
  }
};

window.filtration = {
  applyFilters,
  onHousingTypeChange,
  onPriceChange,
  onRoomsChange,
  onGuestsChange,
  onFeaturesChange
};

})();

(() => {
/*!*********************!*\
  !*** ./js/popup.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const main = document.querySelector(`main`);
const messageSuccess = document.querySelector(`#success`).content.querySelector(`.success`);
const messageError = document.querySelector(`#error`).content.querySelector(`.error`);
const successPopup = messageSuccess.cloneNode(true);
const errorPopup = messageError.cloneNode(true);
const errorButton = errorPopup.querySelector(`.error__button`);

const removeSuccessPopup = function () {
  if (successPopup) {
    main.removeChild(successPopup);
  }
  document.removeEventListener(`keydown`, onEscSuccessPopup);
  document.removeEventListener(`click`, onClickSuccessPopup);
};

const onEscSuccessPopup = function (evt) {
  if (evt.key === `Escape`) {
    removeSuccessPopup();
  }
};

const onClickSuccessPopup = function () {
  removeSuccessPopup();
};

const uploadSuccess = function () {
  main.appendChild(successPopup);
  document.addEventListener(`keydown`, onEscSuccessPopup);
  document.addEventListener(`click`, onClickSuccessPopup);
  window.form.resetFormAndMap();
};

const removeErrorPopup = function () {
  if (errorPopup) {
    main.removeChild(errorPopup);
  }
  errorButton.removeEventListener(`keydown`, onEnterButtonError);
  document.removeEventListener(`keydown`, onEscErrorPopup);
  document.removeEventListener(`click`, onButtonErrorClick);
};
const onEscErrorPopup = function (evt) {
  if (evt.key === `Escape`) {
    removeErrorPopup();
  }
};

const onEnterButtonError = function (evt) {
  if (evt.key === `Enter`) {
    removeErrorPopup();
  }
};

const onButtonErrorClick = function () {
  removeErrorPopup();
};

const uploadError = function (errorMessage) {
  main.appendChild(errorPopup);
  errorPopup.querySelector(`.error__message`).textContent = errorMessage;
  errorButton.addEventListener(`keydown`, onEnterButtonError);
  document.addEventListener(`keydown`, onEscErrorPopup);
  document.addEventListener(`click`, onButtonErrorClick);
};

window.popup = {
  uploadSuccess,
  uploadError
};

})();

(() => {
/*!*******************!*\
  !*** ./js/map.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const fieldsets = document.querySelectorAll(`fieldset`);
let serverData;
let newData;

const onSuccessLoad = function (array) {
  serverData = array;
  if (serverData.length > window.pin.maxSimilar) {
    newData = serverData.slice(0, window.pin.maxSimilar);
  } else {
    newData = serverData;
  }
  window.pin.createPins(newData);
  window.util.setDisable(false, window.form.filter);
  window.util.setDisable(false, fieldsets);
};

const filterAds = function (data) {
  newData = window.filtration.applyFilters(data);
  window.pin.remove();
  window.pin.createPins(newData);
};

const filterDebounced = window.debounce(filterAds);

const changeFilterDebounced = function () {
  filterDebounced(serverData);
};

const removeClassPin = function () {
  const pinActive = window.pin.mapAds.querySelector(`.map__pin--active`);
  if (pinActive) {
    pinActive.classList.remove(`map__pin--active`);
  }
};

const checkClassActive = function (element) {
  removeClassPin();
  element.classList.add(`map__pin--active`);
};

const onIconPinClick = function (evt) {
  const mapFiltersContainer = window.pin.map.querySelector(`.map__filters-container`);
  const currentCard = window.pin.map.querySelector(`.map__card`);
  const currentPin = evt.currentTarget;
  const targetValue = evt.currentTarget.dataset.value;
  const index = Number(targetValue);

  if (currentCard && currentCard.dataset.value === targetValue) {
    return;
  }
  window.card.closed();
  window.card.attribute(index);
  checkClassActive(currentPin);
  const fragmentPopup = document.createDocumentFragment();
  fragmentPopup.appendChild(window.card.create(newData[index]));
  window.pin.map.insertBefore(fragmentPopup, mapFiltersContainer);

  const closePopupButton = window.pin.map.querySelector(`.popup__close`);

  const closePopup = function () {
    window.card.closed();
    removeClassPin();
    closePopupButton.removeEventListener(`click`, onButtonCloseClick);
    closePopupButton.removeEventListener(`keydown`, onButtonCloseEnter);
    document.removeEventListener(`keydown`, onButtonCloseEsc);
  };

  const onButtonCloseClick = function () {
    closePopup();
  };

  const onButtonCloseEnter = function (event) {
    if (event.key === `Enter`) {
      closePopup();
    }
  };

  const onButtonCloseEsc = function (event) {
    if (event.key === `Escape`) {
      closePopup();
    }
  };

  closePopupButton.addEventListener(`click`, onButtonCloseClick);
  closePopupButton.addEventListener(`keydown`, onButtonCloseEnter);
  document.addEventListener(`keydown`, onButtonCloseEsc);
};

const onSubmitForm = function (evt) {
  window.server.upload(new FormData(window.pageState.formAd), window.popup.uploadSuccess, window.popup.uploadError);
  evt.preventDefault();
};

window.map = {
  onSuccessLoad,
  onIconClick: onIconPinClick,
  onFormDebouncedChange: changeFilterDebounced,
  removeClassPin,
  onSubmitForm,
};

})();

(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

const housingType = window.pin.filter.querySelector(`#housing-type`);
const housingPrice = window.pin.filter.querySelector(`#housing-price`);
const housingRooms = window.pin.filter.querySelector(`#housing-rooms`);
const housingGuests = window.pin.filter.querySelector(`#housing-guests`);
const housingFeatures = window.pin.filter.querySelector(`#housing-features`);
const buttonReset = window.pageState.formAd.querySelector(`.ad-form__reset`);

window.pageState.blockPage();

window.pageState.mainPin.addEventListener(`mousedown`, window.pageState.onMainPinClick);
window.pageState.mainPin.addEventListener(`keydown`, window.pageState.onMainPinEnter);

window.form.typeHouse.addEventListener(`change`, window.form.onPriceChange);

window.form.timeIn.addEventListener(`change`, window.form.onTimeChange);
window.form.timeOut.addEventListener(`change`, window.form.onTimeChange);

window.form.roomNumber.addEventListener(`change`, window.form.onGuestOrRoomsChange);
window.pageState.capacity.addEventListener(`change`, window.form.onGuestOrRoomsChange);

window.form.filter.addEventListener(`change`, window.map.onFormDebouncedChange);
housingType.addEventListener(`change`, window.filtration.onHousingTypeChange);
housingPrice.addEventListener(`change`, window.filtration.onPriceChange);
housingRooms.addEventListener(`change`, window.filtration.onRoomsChange);
housingGuests.addEventListener(`change`, window.filtration.onGuestsChange);
housingFeatures.addEventListener(`change`, window.filtration.onFeaturesChange);


window.pageState.formAd.addEventListener(`submit`, window.map.onSubmitForm);

buttonReset.addEventListener(`click`, window.form.onResetButtonClick);

})();

/******/ })()
;