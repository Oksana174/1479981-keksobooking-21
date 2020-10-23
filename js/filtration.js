'use strict';
(function () {
  let enabledFilters = {
    type: `any`,
    price: `any`,
    rooms: `any`,
    guests: `any`,
    features: []
  };

  const enableFilters = function (data) {
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

  window.filtration = {
    check: enableFilters,
    enabled: enabledFilters,
  };
})();
