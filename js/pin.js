'use strict';

(function () {
  const MAIN_PIN_WIDTH = 62;
  const MAIN_PIN_HEIGHT = 84;
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const MAX_SIMILAR_PIN = 5;

  const mapAds = document.querySelector(`.map`);
  const mapPins = mapAds.querySelector(`.map__pins`);
  const fieldsets = document.querySelectorAll(`fieldset`);
  const mapFilters = document.querySelector(`.map__filters`);

  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  let idPins = 0;
  const createPinAd = function (array) {
    const clonePin = pinTemplate.cloneNode(true);
    clonePin.setAttribute(`style`, `left: ${array.location.x + PIN_WIDTH / 2}px; top: ${array.location.y + PIN_HEIGHT}px`);
    const picturePin = clonePin.querySelector(`img`);
    picturePin.src = array.author.avatar;
    picturePin.alt = array.offer.title;
    clonePin.value = idPins;
    idPins++;
    clonePin.addEventListener(`click`, window.map.iconClick);
    return clonePin;
  };

  const groupingPinAd = function (array) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < array.length; i++) {
      fragment.appendChild(createPinAd(array[i]));
    }
    mapPins.appendChild(fragment);
  };

  window.pin = {
    createPins: groupingPinAd,
    width: PIN_WIDTH,
    height: PIN_HEIGHT,
    mainWidth: MAIN_PIN_WIDTH,
    mainHeight: MAIN_PIN_HEIGHT,
    fieldset: fieldsets,
    filter: mapFilters,
    map: mapAds,
    maxSimilar: MAX_SIMILAR_PIN,
    mapAds: mapPins,
  };
})();
