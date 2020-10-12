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
window.pageState.blockPage();

// активация страницы
mapPinMain.addEventListener(`mousedown`, window.pageState.activatePageMouse);

mapPinMain.addEventListener(`keydown`, window.pageState.activatePageEnter);

// влияние типа жилья на цену
typeHouse.addEventListener(`change`, window.form.changePrice);

// Поля «Время заезда» и «Время выезда» синхронизированы
timeIn.addEventListener(`change`, window.form.changeTime);
timeOut.addEventListener(`change`, window.form.changeTime);

// Поле «Количество комнат» синхронизировано с полем «Количество мест»
roomNumber.addEventListener(`change`, window.form.changeGuest);
guestNumber.addEventListener(`change`, window.form.changeGuest);

