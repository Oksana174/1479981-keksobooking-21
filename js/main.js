'use strict';
const housingType = window.pin.filter.querySelector(`#housing-type`);
const housingPrice = window.pin.filter.querySelector(`#housing-price`);
const housingRooms = window.pin.filter.querySelector(`#housing-rooms`);
const housingGuests = window.pin.filter.querySelector(`#housing-guests`);
const housingFeatures = window.pin.filter.querySelector(`#housing-features`);
const buttonReset = window.pageState.ad.querySelector(`.ad-form__reset`);

window.pageState.blockPage();

window.pageState.mainPin.addEventListener(`mousedown`, window.pageState.activatePageMouse);
window.pageState.mainPin.addEventListener(`keydown`, window.pageState.activatePageEnter);

window.form.type.addEventListener(`change`, window.form.changePrice);

window.form.checkInTime.addEventListener(`change`, window.form.changeTime);
window.form.checkOutTime.addEventListener(`change`, window.form.changeTime);

window.form.rooms.addEventListener(`change`, window.form.changeGuest);
window.pageState.capacity.addEventListener(`change`, window.form.changeGuest);

window.map.filterForm.addEventListener(`change`, window.map.changeFormDebounced);
housingType.addEventListener(`change`, window.map.changeHousingType);
housingPrice.addEventListener(`change`, window.map.changePrice);
housingRooms.addEventListener(`change`, window.map.changeRooms);
housingGuests.addEventListener(`change`, window.map.changeGuests);
housingFeatures.addEventListener(`change`, window.map.changeFeatures);

window.pageState.ad.addEventListener(`submit`, function (evt) {
  window.server.upload(new FormData(window.pageState.ad), window.popup.uploadSuccess, window.popup.uploadError);
  evt.preventDefault();
});

buttonReset.addEventListener(`click`, window.form.onResetButtonClick);
