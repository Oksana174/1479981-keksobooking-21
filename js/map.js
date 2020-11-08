'use strict';

const fieldsets = document.querySelectorAll(`fieldset`);
let serverData;
let newData;

const onSuccessLoad = function (array) {
  serverData = array;
  if (serverData.length > window.pin.maxSimilar) {
    newData = serverData.slice(0, window.pin.maxSimilar);
  } else {
    newData = serverData;
  }
  window.pin.createPins(newData);
  window.util.setDisable(false, window.form.filter);
  window.util.setDisable(false, fieldsets);
};

const filterAds = function (data) {
  newData = window.filtration.applyFilters(data);
  window.pin.remove();
  window.pin.createPins(newData);
};

const filterDebounced = window.debounce(filterAds);

const changeFilterDebounced = function () {
  filterDebounced(serverData);
};

const removeClassPin = function () {
  const pinActive = window.pin.mapAds.querySelector(`.map__pin--active`);
  if (pinActive) {
    pinActive.classList.remove(`map__pin--active`);
  }
};

const checkClassActive = function (element) {
  removeClassPin();
  element.classList.add(`map__pin--active`);
};

const onIconPinClick = function (evt) {
  const mapFiltersContainer = window.pin.map.querySelector(`.map__filters-container`);
  const currentCard = window.pin.map.querySelector(`.map__card`);
  const currentPin = evt.currentTarget;
  const targetValue = evt.currentTarget.dataset.value;
  const index = Number(targetValue);

  if (currentCard && currentCard.dataset.value === targetValue) {
    return;
  }
  window.card.closed();
  window.card.attribute(index);
  checkClassActive(currentPin);
  const fragmentPopup = document.createDocumentFragment();
  fragmentPopup.appendChild(window.card.create(newData[index]));
  window.pin.map.insertBefore(fragmentPopup, mapFiltersContainer);

  const closePopupButton = window.pin.map.querySelector(`.popup__close`);

  const closePopup = function () {
    window.card.closed();
    removeClassPin();
    closePopupButton.removeEventListener(`click`, onButtonCloseClick);
    closePopupButton.removeEventListener(`keydown`, onButtonCloseEnter);
    document.removeEventListener(`keydown`, onButtonCloseEsc);
  };

  const onButtonCloseClick = function () {
    closePopup();
  };

  const onButtonCloseEnter = function (event) {
    if (event.key === `Enter`) {
      closePopup();
    }
  };

  const onButtonCloseEsc = function (event) {
    if (event.key === `Escape`) {
      closePopup();
    }
  };

  closePopupButton.addEventListener(`click`, onButtonCloseClick);
  closePopupButton.addEventListener(`keydown`, onButtonCloseEnter);
  document.addEventListener(`keydown`, onButtonCloseEsc);
};

const onSubmitForm = function (evt) {
  window.server.upload(new FormData(window.pageState.formAd), window.popup.uploadSuccess, window.popup.uploadError);
  evt.preventDefault();
};

window.map = {
  onSuccessLoad,
  onIconClick: onIconPinClick,
  onFormDebouncedChange: changeFilterDebounced,
  removeClassPin,
  onSubmitForm,
};
