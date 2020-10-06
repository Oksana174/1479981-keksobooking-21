'use strict';
(function () {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const LOCATION_X_PIN_MAIN = 570;
  const LOCATION_Y_PIN_MAIN = 375;
  const formAd = document.querySelector(`.ad-form`);
  const fieldsets = formAd.querySelectorAll(`fieldset`);
  const inputAdress = formAd.querySelector(`#address`);
  const mapFilters = document.querySelector(`.map__filters`);
  const mapAds = document.querySelector(`.map`);
  const mapPins = mapAds.querySelector(`.map__pins`);
  const guestNumber = formAd.querySelector(`#capacity`);

  const disabledState = function () {
    window.util.disable(true, fieldsets);
    window.util.disable(true, mapFilters);
    inputAdress.value = `${LOCATION_X_PIN_MAIN}, ${LOCATION_Y_PIN_MAIN}`;
  };

  // функция активации страницы
  const activeState = function () {
    mapAds.classList.remove(`map--faded`);
    formAd.classList.remove(`ad-form--disabled`);
    window.util.disable(false, fieldsets);
    window.util.disable(false, mapFilters);
    inputAdress.value = `${LOCATION_X_PIN_MAIN + PIN_WIDTH / 2}` + `, ` + `${LOCATION_Y_PIN_MAIN + PIN_HEIGHT}`;
    mapPins.appendChild(window.pin.fragment(window.data.array(8), window.pin.template));
    guestNumber.options[2].selected = true;
  };

  window.pageState = {
    disabled: disabledState,
    active: activeState,
  };
})();
