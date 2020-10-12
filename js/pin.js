'use strict';

(function () {
  const MAIN_PIN_WIDTH = 62;
  const MAIN_PIN_HEIGHT = 84;
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const MAX_SIMILAR_PIN = 5;

  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const createPinAd = function (array) {
    const clonePin = pinTemplate.cloneNode(true);
    clonePin.setAttribute(`style`, `left: ${array.location.x + PIN_WIDTH / 2}px; top: ${array.location.y + PIN_HEIGHT}px`);
    const picturePin = clonePin.querySelector(`img`);
    picturePin.src = array.author.avatar;
    picturePin.alt = array.offer.title;
    return clonePin;
  };

  const mapAds = document.querySelector(`.map`);
  const mapPins = mapAds.querySelector(`.map__pins`);
  const fieldsets = document.querySelectorAll(`fieldset`);
  const mapFilters = document.querySelector(`.map__filters`);

  const successHandler = function (array) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < MAX_SIMILAR_PIN; i++) {
      fragment.appendChild(createPinAd(array[i]));
    }
    mapPins.appendChild(fragment);
    window.util.setDisable(false, mapFilters);
    window.util.setDisable(false, fieldsets);
  };

  window.pin = {
    createFragment: successHandler,
    width: PIN_WIDTH,
    height: PIN_HEIGHT,
    mainWidth: MAIN_PIN_WIDTH,
    mainHeight: MAIN_PIN_HEIGHT
  };
})();
