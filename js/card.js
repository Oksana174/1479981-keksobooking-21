'use strict';

const typeHouse = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  house: `Дом`,
  palace: `Дворец`
};
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);
let idCard;

const chooseAvailableFeatures = function (element, array) {
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
    const popupImg = element.querySelector(`img`);
    const clonePhoto = popupImg.cloneNode(false);
    clonePhoto.src = array.offer.photos[m];
    element.appendChild(clonePhoto);
  }
  element.querySelector(`img`).remove();
};

const createCardAd = function (array) {
  const cloneCard = cardTemplate.cloneNode(true);
  const featuresElement = cloneCard.querySelector(`.popup__features`);
  const photosElement = cloneCard.querySelector(`.popup__photos`);
  const descriptionElement = cloneCard.querySelector(`.popup__description`);
  const avatarElement = cloneCard.querySelector(`.popup__avatar`);
  const capacityElement = cloneCard.querySelector(`.popup__text--capacity`);
  cloneCard.querySelector(`.popup__title`).textContent = array.offer.title;
  cloneCard.querySelector(`.popup__text--address`).textContent = array.offer.address;
  cloneCard.querySelector(`.popup__text--price`).textContent =
  `${array.offer.price} ₽/ночь`;
  cloneCard.querySelector(`.popup__type`).textContent =
  typeHouse[array.offer.type];
  if (array.offer.rooms === 0 && array.offer.guests === 0) {
    capacityElement.remove();
  } else {
    capacityElement.textContent = `${array.offer.rooms} комнаты для ${array.offer.guests} гостей`;
  }
  cloneCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${array.offer.checkin}, выезд до ${array.offer.checkout}`;
  if (array.offer.features.length === 0) {
    featuresElement.remove();
  } else {
    chooseAvailableFeatures(featuresElement, array);
  }
  if (array.offer.description === ``) {
    descriptionElement.remove();
  } else {
    descriptionElement.textContent = array.offer.description;
  }
  if (array.offer.photos.length === 0) {
    photosElement.remove();
  } else {
    uploadPhotos(photosElement, array);
  }
  if (array.author.avatar === `` || array.author.avatar === undefined) {
    avatarElement.remove();
  } else {
    avatarElement.src = array.author.avatar;
  }
  cloneCard.dataset.value = idCard;
  return cloneCard;
};

const closePopup = function () {
  const article = window.pin.map.querySelector(`.map__card`);
  if (article) {
    window.pin.map.removeChild(article);
  }
};

const setId = function (value) {
  idCard = value;
};

window.card = {
  create: createCardAd,
  attribute: setId,
  closed: closePopup,
};

