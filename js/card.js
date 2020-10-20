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
    const featuresElement = element.querySelector(`.popup__features`);
    const popupFeature = element.querySelectorAll(`li`);
    for (let m = 0; m < array.offer.features.length; m++) {
      if (!popupFeature[m].classList.contains(`popup__feature--${array.offer.features[m]}`)) {
        const feature = document.createElement(`li`);
        feature.classList.add(`popup__feature`);
        feature.classList.add(`popup__feature--${array.offer.features[m]}`);
        featuresElement.appendChild(feature);
      }
    }
  };

  const uploadPhotos = function (element, array) {
    const photosElement = element.querySelector(`.popup__photos`);
    for (let m = 0; m < array.offer.photos.length; m++) {
      const clonePhotos = photosElement.querySelector(`img`).cloneNode(false);
      clonePhotos.src = array.offer.photos[m];
      photosElement.appendChild(clonePhotos);
    }
    photosElement.querySelector(`img`).remove();
  };

  const createCardAd = function (array) {
    const cloneCard = cardTemplate.cloneNode(true);
    cloneCard.querySelector(`.popup__title`).textContent = array.offer.title;
    cloneCard.querySelector(`.popup__text--address`).textContent = array.offer.address;
    cloneCard.querySelector(`.popup__text--price`).textContent =
    `${array.offer.price} ₽/ночь`;
    cloneCard.querySelector(`.popup__type`).textContent =
    typeHouse[array.offer.type];
    cloneCard.querySelector(`.popup__text--capacity`).textContent = `${array.offer.rooms} комнаты для ${array.offer.guests} гостей`;
    cloneCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${array.offer.checkin}, выезд до ${array.offer.checkout}`;
    availableFeatures(cloneCard, array);
    cloneCard.querySelector(`.popup__description`).textContent = array.offer.description;
    cloneCard.querySelector(`.popup__description`).src = array.offer.photos;
    uploadPhotos(cloneCard, array);
    cloneCard.querySelector(`.popup__avatar`).src = array.author.avatar;
    return cloneCard;
  };

  const closePopup = function () {
    const articles = window.pin.map.querySelector(`article`);
    if (articles) {
      window.pin.map.removeChild(articles);
    }
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
    closed: closePopup,
    eventEnter: isEventEnter,
    escEvent: isEventEsc,
  };
})();
