'use strict';

const housingType = window.pin.filter.querySelector(`#housing-type`);
const housingPrice = window.pin.filter.querySelector(`#housing-price`);
const housingRooms = window.pin.filter.querySelector(`#housing-rooms`);
const housingGuests = window.pin.filter.querySelector(`#housing-guests`);
const housingFeatures = window.pin.filter.querySelector(`#housing-features`);
const buttonReset = window.form.ad.querySelector(`.ad-form__reset`);

// интерактивные элементы формы делаем неактивными
window.pageState.blockPage();

// активация страницы
window.pageState.mainPin.addEventListener(`mousedown`, window.pageState.activatePageMouse);
window.pageState.mainPin.addEventListener(`keydown`, window.pageState.activatePageEnter);

// влияние типа жилья на цену
window.form.type.addEventListener(`change`, window.form.changePrice);

// Поля «Время заезда» и «Время выезда» синхронизированы
window.form.checkInTime.addEventListener(`change`, window.form.changeTime);
window.form.checkOutTime.addEventListener(`change`, window.form.changeTime);

// Поле «Количество комнат» синхронизировано с полем «Количество мест»
window.form.rooms.addEventListener(`change`, window.form.changeGuest);
window.form.capacity.addEventListener(`change`, window.form.changeGuest);

// фильтр объявлений
window.map.filterForm.addEventListener(`change`, window.map.changeFormDebounced);
housingType.addEventListener(`change`, window.map.changeHousingType);
housingPrice.addEventListener(`change`, window.map.changePrice);
housingRooms.addEventListener(`change`, window.map.changeRooms);
housingGuests.addEventListener(`change`, window.map.changeGuests);
housingFeatures.addEventListener(`change`, window.map.changeFeatures);

// отправка формы
window.form.ad.addEventListener(`submit`, function (evt) {
  window.server.upload(new FormData(window.form.ad), window.form.uploadSuccess, window.form.uploadError);
  evt.preventDefault();
  window.form.reset();
});

// очистка формы
buttonReset.addEventListener(`click`, window.form.reset);
