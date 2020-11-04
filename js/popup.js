'use strict';

const main = document.querySelector(`main`);
const messageSuccess = document.querySelector(`#success`).content.querySelector(`.success`);
const messageError = document.querySelector(`#error`).content.querySelector(`.error`);
const successPopup = messageSuccess.cloneNode(true);
const errorPopup = messageError.cloneNode(true);
const errorButton = errorPopup.querySelector(`.error__button`);

const removeSuccessPopup = function () {
  if (successPopup) {
    main.removeChild(successPopup);
  }
  document.removeEventListener(`keydown`, onEscSuccessPopup);
  document.removeEventListener(`click`, onClickSuccessPopup);
};

const onEscSuccessPopup = function (evt) {
  if (evt.key === `Escape`) {
    removeSuccessPopup();
  }
};

const onClickSuccessPopup = function () {
  removeSuccessPopup();
};

const onUploadSuccess = function () {
  main.appendChild(successPopup);
  document.addEventListener(`keydown`, onEscSuccessPopup);
  document.addEventListener(`click`, onClickSuccessPopup);
  window.form.resetFormAndMap();
};

const removeErrorPopup = function () {
  if (errorPopup) {
    main.removeChild(errorPopup);
  }
  errorButton.removeEventListener(`keydown`, onEnterButtonError);
  document.removeEventListener(`keydown`, onEscErrorPopup);
  document.removeEventListener(`click`, onButtonErrorClick);
};
const onEscErrorPopup = function (evt) {
  if (evt.key === `Escape`) {
    removeErrorPopup();
  }
};

const onEnterButtonError = function (evt) {
  if (evt.key === `Enter`) {
    removeErrorPopup();
  }
};

const onButtonErrorClick = function () {
  removeErrorPopup();
};

const onUploadError = function (errorMessage) {
  main.appendChild(errorPopup);
  errorPopup.querySelector(`.error__message`).textContent = errorMessage;
  errorButton.addEventListener(`keydown`, onEnterButtonError);
  document.addEventListener(`keydown`, onEscErrorPopup);
  document.addEventListener(`click`, onButtonErrorClick);
};

window.popup = {
  uploadSuccess: onUploadSuccess,
  uploadError: onUploadError,
};
