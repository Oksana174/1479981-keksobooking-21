'use strict';
(function () {
  let enabledFilters = {
    type: `any`,
    price: `any`,
    rooms: `any`,
    guests: `any`,
    features: []
  };

  const removeElements = function () {
    const pins = window.pin.mapAds.querySelectorAll(`.map__pin`);
    const card = window.pin.map.querySelector(`article`);
    for (let i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains(`map__pin--main`)) {
        pins[i].remove();
      }
    }
    if (card) {
      card.remove();
    }
  };

  const filterAds = function (data) {
    const enableFilters = function () {
      let results;
      if (enabledFilters.type === `any`) {
        results = data;
      } else {
        results = data.filter(function (item) {
          return item.offer.type === enabledFilters.type;
        });
      }
      if (results.length > window.pin.maxSimilar) {
        results = results.slice(0, window.pin.maxSimilar);
      }
      return results;
    };
    const newData = enableFilters();
    removeElements();
    window.pin.createPins(newData);
  };

  window.filtration = {
    filter: filterAds,
    enabled: enabledFilters,
  };
})();
