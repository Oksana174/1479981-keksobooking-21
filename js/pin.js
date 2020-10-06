'use strict';

(function () {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;

  const fillingInFragment = function (array, element) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < array.length; i++) {
      const pinAds = element(array[i]);
      fragment.appendChild(pinAds);
    }
    return fragment;
  };

  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const createPinAd = function (array) {
    const clonePin = pinTemplate.cloneNode(true);
    clonePin.setAttribute(`style`, `left: ${array.location.x + PIN_WIDTH / 2}px; top: ${array.location.y + PIN_HEIGHT}px`);
    const picturePin = clonePin.querySelector(`img`);
    picturePin.src = array.author.avatar;
    picturePin.alt = array.offer.title;
    return clonePin;
  };

  window.pin = {
    fragment: fillingInFragment,
    template: createPinAd,
  };
})();
