'use strict';
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
