'use strict';

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
