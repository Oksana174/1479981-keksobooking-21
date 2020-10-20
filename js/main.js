'use strict';
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
