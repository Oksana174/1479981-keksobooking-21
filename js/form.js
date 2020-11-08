'use strict';

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
