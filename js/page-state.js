'use strict';
(function () {
  const NewArray = {
    LENGTH: 8,
  };
  const LOCATION_X_PIN_MAIN = 570;
  const LOCATION_Y_PIN_MAIN = 375;
  const formAd = document.querySelector(`.ad-form`);
  const fieldsets = formAd.querySelectorAll(`fieldset`);
  const inputAdress = formAd.querySelector(`#address`);
  const mapFilters = document.querySelector(`.map__filters`);
  const mapAds = document.querySelector(`.map`);
  const mapPins = mapAds.querySelector(`.map__pins`);
  const guestNumber = formAd.querySelector(`#capacity`);
  const mapPinMain = mapAds.querySelector(`.map__pin--main`);

  const disabledState = function () {
    window.util.setDisable(true, fieldsets);
    window.util.setDisable(true, mapFilters);
    inputAdress.value = `${LOCATION_X_PIN_MAIN}, ${LOCATION_Y_PIN_MAIN}`;
  };

  const activeState = function () {
    mapAds.classList.remove(`map--faded`);
    formAd.classList.remove(`ad-form--disabled`);
    window.util.setDisable(false, fieldsets);
    window.util.setDisable(false, mapFilters);
    inputAdress.value = `${LOCATION_X_PIN_MAIN + window.pin.pinWidth / 2}` + `, ` + `${LOCATION_Y_PIN_MAIN + window.pin.pinHeight}`;
    mapPins.appendChild(window.pin.createFragment(window.data.createArray(NewArray.LENGTH), window.pin.cloneTemplate));
    guestNumber.options[2].selected = true;
  };

  const mapMousedownHandler = function (evt) {
    if (evt.button === 0) {
      activeState();
      mapPinMain.removeEventListener(`mousedown`, mapMousedownHandler);
    }
  };

  const mapEnterHandler = function (evt) {
    if (evt.key === `Enter`) {
      activeState();
      mapPinMain.removeEventListener(`keydown`, mapEnterHandler);
    }
  };

  window.pageState = {
    blockPage: disabledState,
    activatePageMouse: mapMousedownHandler,
    activatePageEnter: mapEnterHandler,
  };
})();
