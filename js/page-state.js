'use strict';
(function () {
  const inputAdress = window.form.ad.querySelector(`#address`);
  const mapPinMain = window.pin.map.querySelector(`.map__pin--main`);

  const disabledState = function () {
    window.util.setDisable(true, window.pin.fieldset);
    window.util.setDisable(true, window.pin.filter);
    inputAdress.value = `${mapPinMain.offsetLeft}, ${mapPinMain.offsetTop}`;
  };

  const activeState = function () {
    window.server.load(window.map.loading, window.server.errorHandler);
    window.pin.map.classList.remove(`map--faded`);
    window.form.ad.classList.remove(`ad-form--disabled`);
    inputAdress.value = `${Math.round(mapPinMain.offsetLeft + window.pin.mainWidth / 2)}` + `, ` + `${Math.round(mapPinMain.offsetTop + window.pin.mainHeight)}`;
    window.form.capacity.options[2].selected = true;
  };

  const mapMousedownHandler = function (evt) {
    if (evt.button === 0) {
      activeState();
      window.dragging.mainPin();
      mapPinMain.removeEventListener(`mousedown`, mapMousedownHandler);
      mapPinMain.removeEventListener(`keydown`, mapEnterHandler);

    }
  };

  const mapEnterHandler = function (evt) {
    if (evt.key === `Enter`) {
      activeState();
      mapPinMain.removeEventListener(`keydown`, mapEnterHandler);
      mapPinMain.removeEventListener(`mousedown`, mapMousedownHandler);
    }
  };

  window.pageState = {
    blockPage: disabledState,
    activatePageMouse: mapMousedownHandler,
    activatePageEnter: mapEnterHandler,
    mainPin: mapPinMain,
    adress: inputAdress
  };
})();
