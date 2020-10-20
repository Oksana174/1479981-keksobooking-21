'use strict';

(function () {
  const fieldsets = document.querySelectorAll(`fieldset`);
  const mapFilters = document.querySelector(`.map__filters`);
  const housingType = window.pin.filter.querySelector(`#housing-type`);
  let serverData;

  const successHandler = function (array) {
    serverData = array;
    if (serverData.length > window.pin.maxSimilar) {
      let copyData = serverData.slice(0, window.pin.maxSimilar);
      window.pin.createPins(copyData);
    } else {
      window.pin.createPins(serverData);
    }
    window.util.setDisable(false, mapFilters);
    window.util.setDisable(false, fieldsets);
  };

  const changeHousingTypeHandler = function (evt) {
    window.filtration.enabled.type = evt.target.value;
    window.filtration.filter(serverData);
  };
  housingType.addEventListener(`change`, changeHousingTypeHandler);

  const iconPinClickHandler = function (evt) {
    const mapFiltersContainer = window.pin.map.querySelector(`.map__filters-container`);
    window.card.closed();
    const targetPins = evt.target;
    const index = targetPins.firstChild ? targetPins.value : targetPins.parentElement.value;
    const fragmentPopup = document.createDocumentFragment();
    fragmentPopup.appendChild(window.card.create(serverData[index]));
    window.pin.map.insertBefore(fragmentPopup, mapFiltersContainer);

    const closePopupButton = window.pin.map.querySelector(`.popup__close`);
    const closeClickHandler = function () {
      window.card.closed();
      closePopupButton.removeEventListener(`click`, closeClickHandler);
      closePopupButton.removeEventListener(`keydown`, closeEnterHandler);
      document.removeEventListener(`keydown`, closeEscHandler);
    };

    const closeEnterHandler = function (evtKey) {
      window.card.eventEnter(evtKey, window.card.closed);
      closePopupButton.removeEventListener(`keydown`, closeEnterHandler);
      closePopupButton.removeEventListener(`click`, closeClickHandler);
      document.removeEventListener(`keydown`, closeEscHandler);
    };

    const closeEscHandler = function (evtKey) {
      window.card.escEvent(evtKey, window.card.closed);
      document.removeEventListener(`keydown`, closeEscHandler);
      closePopupButton.removeEventListener(`click`, closeClickHandler);
      closePopupButton.removeEventListener(`keydown`, closeEnterHandler);
    };

    closePopupButton.addEventListener(`click`, closeClickHandler);
    closePopupButton.addEventListener(`keydown`, closeEnterHandler);
    document.addEventListener(`keydown`, closeEscHandler);
  };

  window.map = {
    loading: successHandler,
    iconClick: iconPinClickHandler,
  };
})();
