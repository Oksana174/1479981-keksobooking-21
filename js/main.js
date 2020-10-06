'use strict';
const formAd = document.querySelector(`.ad-form`);
const mapAds = document.querySelector(`.map`);
const mapPinMain = mapAds.querySelector(`.map__pin--main`);
const typeHouse = formAd.querySelector(`#type`);
const timeIn = formAd.querySelector(`#timein`);
const timeOut = formAd.querySelector(`#timeout`);
const roomNumber = formAd.querySelector(`#room_number`);
const guestNumber = formAd.querySelector(`#capacity`);


// интерактивные элементы формы делаем неактивными
window.pageState.disabled();

// активация страницы
mapPinMain.addEventListener(`mousedown`, function (evt) {
  window.util.mouseEvent(evt, window.pageState.active);
});

mapPinMain.addEventListener(`keydown`, function (evt) {
  window.util.enterEvent(evt, window.pageState.active);
});

// влияние типа жилья на цену
typeHouse.addEventListener(`change`, window.form.price);

// Поля «Время заезда» и «Время выезда» синхронизированы
timeIn.addEventListener(`change`, window.form.time);
timeOut.addEventListener(`change`, window.form.time);

// Поле «Количество комнат» синхронизировано с полем «Количество мест»
roomNumber.addEventListener(`change`, window.form.guest);
guestNumber.addEventListener(`change`, window.form.guest);
