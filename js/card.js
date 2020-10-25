'use strict';
(function () {
  const typeHouse = {
    flat: `Квартира`,
    bungalow: `Бунгало`,
    house: `Дом`,
    palace: `Дворец`
  };
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);

  const availableFeatures = function (element, array) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    for (let m = 0; m < array.offer.features.length; m++) {
      const feature = document.createElement(`li`);
      feature.classList.add(`popup__feature`);
      feature.classList.add(`popup__feature--${array.offer.features[m]}`);
      element.appendChild(feature);
    }
  };

  const uploadPhotos = function (element, array) {
    for (let m = 0; m < array.offer.photos.length; m++) {
      const clonePhotos = element.querySelector(`img`).cloneNode(false);
      clonePhotos.src = array.offer.photos[m];
      element.appendChild(clonePhotos);
    }
    element.querySelector(`img`).remove();
  };

  let idCard;
  const createCardAd = function (array) {
    const cloneCard = cardTemplate.cloneNode(true);
    const featuresElement = cloneCard.querySelector(`.popup__features`);
    const photosElement = cloneCard.querySelector(`.popup__photos`);
    cloneCard.querySelector(`.popup__title`).textContent = array.offer.title;
    cloneCard.querySelector(`.popup__text--address`).textContent = array.offer.address;
    cloneCard.querySelector(`.popup__text--price`).textContent =
    `${array.offer.price} ₽/ночь`;
    cloneCard.querySelector(`.popup__type`).textContent =
    typeHouse[array.offer.type];
    cloneCard.querySelector(`.popup__text--capacity`).textContent = `${array.offer.rooms} комнаты для ${array.offer.guests} гостей`;
    cloneCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${array.offer.checkin}, выезд до ${array.offer.checkout}`;
    availableFeatures(featuresElement, array);
    cloneCard.querySelector(`.popup__description`).textContent = array.offer.description;
    uploadPhotos(photosElement, array);
    cloneCard.querySelector(`.popup__avatar`).src = array.author.avatar;
    cloneCard.dataset.value = idCard;
    return cloneCard;
  };

  const closePopup = function () {
    const articles = window.pin.map.querySelector(`.map__card`);
    if (articles) {
      window.pin.map.removeChild(articles);
    }
  };

  const addingAttribute = function (value) {
    idCard = value;
  };

  const isEventEnter = function (evt, action) {
    if (evt.key === `Enter`) {
      action();
    }
  };
  const isEventEsc = function (evt, action) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      action();
    }
  };

  window.card = {
    create: createCardAd,
    attribute: addingAttribute,
    closed: closePopup,
    eventEnter: isEventEnter,
    escEvent: isEventEsc,
  };
})();
