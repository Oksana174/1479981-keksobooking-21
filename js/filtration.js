'use strict';
(function () {
  let enabledFilters = {
    type: `any`,
    price: `any`,
    rooms: `any`,
    guests: `any`,
    features: []
  };
  const MIN_PRICE_FILTER = 10000;
  const MAX_PRICE_FILTER = 50000;
  const NumberOfRoom = {
    ONE: 1,
    TWO: 2,
    THREE: 3
  };
  const NumberOfGuests = {
    ONE: 1,
    TWO: 2,
    NOBODY: 0
  };

  const getPriceFilter = function (item, price) {
    switch (item) {
      case `low`:
        return (price < MIN_PRICE_FILTER);
      case `middle`:
        return ((price >= MIN_PRICE_FILTER) && (price <= MAX_PRICE_FILTER));
      case `high`:
        return (price > MAX_PRICE_FILTER);
      default:
        return true;
    }
  };
  const getRoomsFilter = function (item, rooms) {
    switch (item) {
      case `1`:
        return (rooms === NumberOfRoom.ONE);
      case `2`:
        return (rooms === NumberOfRoom.TWO);
      case `3`:
        return (rooms === NumberOfRoom.THREE);
      default:
        return true;
    }
  };
  const getGuestsFilter = function (item, guests) {
    switch (item) {
      case `0`:
        return (guests === NumberOfGuests.NOBODY);
      case `1`:
        return (guests === NumberOfGuests.ONE);
      case `2`:
        return (guests === NumberOfGuests.TWO);
      default:
        return true;
    }
  };

  const getFeaturesFilter = function (item) {
    const features = item.offer.features;
    const findFeatures = function (index) {
      return features.indexOf(enabledFilters.features[index]);
    };
    for (let i = 0; i < enabledFilters.features.length; i++) {
      const index = findFeatures(i);
      if (index < 0) {
        return false;
      }
    }
    return true;
  };

  const enableFilters = function (data) {
    let results = data.filter(function (item) {
      return (item.offer.type === enabledFilters.type || enabledFilters.type === `any`) && (getPriceFilter(enabledFilters.price, item.offer.price) || enabledFilters.price === `any`) && (getRoomsFilter(enabledFilters.rooms, item.offer.rooms) || enabledFilters.rooms === `any`) && (getGuestsFilter(enabledFilters.guests, item.offer.guests) || enabledFilters.guests === `any`) && (getFeaturesFilter(item) || enabledFilters.features === []);
    });
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
