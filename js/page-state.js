'use strict';
(function () {
  const formAd = document.querySelector(`.ad-form`);
  const fieldsets = formAd.querySelectorAll(`fieldset`);
  const inputAdress = formAd.querySelector(`#address`);
  const mapFilters = document.querySelector(`.map__filters`);
  const mapAds = document.querySelector(`.map`);
  const guestNumber = formAd.querySelector(`#capacity`);
  const mapPinMain = mapAds.querySelector(`.map__pin--main`);

  const disabledState = function () {
    window.util.setDisable(true, fieldsets);
    window.util.setDisable(true, mapFilters);
    inputAdress.value = `${mapPinMain.offsetLeft}, ${mapPinMain.offsetTop}`;
  };

  const activeState = function () {
    window.server.load(window.pin.createFragment, window.server.errorHandler);
    mapAds.classList.remove(`map--faded`);
    formAd.classList.remove(`ad-form--disabled`);
    inputAdress.value = `${Math.round(mapPinMain.offsetLeft + window.pin.mainWidth / 2)}` + `, ` + `${Math.round(mapPinMain.offsetTop + window.pin.mainHeight)}`;
    guestNumber.options[2].selected = true;
  };

  const mapMousedownHandler = function (evt) {
    if (evt.button === 0) {
      activeState();
      mapPinMain.removeEventListener(`mousedown`, mapMousedownHandler);
      mapPinMain.removeEventListener(`keydown`, mapEnterHandler);
      window.dragging.mainPin();
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
