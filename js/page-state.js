'use strict';
(function () {
  const formAd = document.querySelector(`.ad-form`);
  const guestNumber = formAd.querySelector(`#capacity`);
  const inputAdress = formAd.querySelector(`#address`);
  const mapPinMain = window.pin.map.querySelector(`.map__pin--main`);

  const disabledState = function () {
    window.util.setDisable(true, window.pin.fieldset);
    window.util.setDisable(true, window.pin.filter);
    inputAdress.value = `${mapPinMain.offsetLeft}, ${mapPinMain.offsetTop}`;
  };

  const activeState = function () {
    window.server.load(window.map.loading, window.server.errorHandler);
    window.pin.map.classList.remove(`map--faded`);
    formAd.classList.remove(`ad-form--disabled`);
    inputAdress.value = `${Math.round(mapPinMain.offsetLeft + window.pin.mainWidth / 2)}, ${Math.round(mapPinMain.offsetTop + window.pin.mainHeight)}`;
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
    ad: formAd,
    mainPin: mapPinMain,
    adress: inputAdress,
    capacity: guestNumber,
  };
})();
