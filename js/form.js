'use strict';
(function () {
  const formAd = document.querySelector(`.ad-form`);
  const typeHouse = formAd.querySelector(`#type`);
  const priceNight = formAd.querySelector(`#price`);
  const timeIn = formAd.querySelector(`#timein`);
  const timeOut = formAd.querySelector(`#timeout`);
  const roomNumber = formAd.querySelector(`#room_number`);
  const guestNumber = formAd.querySelector(`#capacity`);
  const titleAd = formAd.querySelector(`#title`);
  const descriptionAd = formAd.querySelector(`#description`);
  const featureCheckboxes = document.querySelectorAll(`input[type=checkbox]`);
  const PinCoordinates = {
    LEFT: 570,
    TOP: 375
  };
  const main = document.querySelector(`main`);
  const messageSuccess = document.querySelector(`#success`).content.querySelector(`.success`);
  const messageError = document.querySelector(`#error`).content.querySelector(`.error`);
  const successPopup = messageSuccess.cloneNode(true);
  const errorPopup = messageError.cloneNode(true);
  const errorButton = errorPopup.querySelector(`.error__button`);
  const filterSelects = document.querySelectorAll(`.map__filters .map__filter`);

  const onSelectPriceChange = function () {
    if (typeHouse.value === `bungalow`) {
      priceNight.setAttribute(`min`, 0);
      priceNight.setAttribute(`placeholder`, 0);
    } else if (typeHouse.value === `flat`) {
      priceNight.setAttribute(`min`, 1000);
      priceNight.setAttribute(`placeholder`, 1000);
    } else if (typeHouse.value === `house`) {
      priceNight.setAttribute(`min`, 5000);
      priceNight.setAttribute(`placeholder`, 5000);
    } else if (typeHouse.value === `palace`) {
      priceNight.setAttribute(`min`, 10000);
      priceNight.setAttribute(`placeholder`, 10000);
    }
  };

  const onSelectTimeChange = function (evt) {
    timeIn.value = evt.target.value;
    timeOut.value = evt.target.value;
  };

  const checkRoomsGuests = function () {
    const selectedRoom = roomNumber.selectedIndex;
    const selectedGuest = guestNumber.selectedIndex;
    if (selectedRoom === 0) {
      return (selectedGuest === 2);
    }
    if (selectedRoom === 1) {
      return ((selectedGuest === 1) || (selectedGuest === 2));
    }
    if (selectedRoom === 2) {
      return ((selectedGuest === 0) || (selectedGuest === 1) || (selectedGuest === 2));
    }
    if (selectedRoom === 3) {
      return (selectedGuest === 3);
    }
    return false;
  };

  const onSelectChange = function () {
    const isRoomGuestValid = checkRoomsGuests();
    if (!isRoomGuestValid) {
      roomNumber.setCustomValidity(`Некорректное значение, проверти количество гостей`);
      guestNumber.setCustomValidity(`Некорректное значение, количество гостей должно быть меньше или равно количеству комнат`);
    } else {
      roomNumber.setCustomValidity(``);
      guestNumber.setCustomValidity(``);
    }
  };

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

  const onResetClick = function () {
    titleAd.value = ``;
    descriptionAd.value = ``;
    typeHouse.options[2].selected = true;
    onSelectPriceChange();
    priceNight.value = ``;
    timeIn.options[0].selected = true;
    timeOut.options[0].selected = true;
    roomNumber.options[0].selected = true;
    guestNumber.options[0].selected = true;
    featureCheckboxes.forEach(function (element) {
      if (element.checked) {
        element.checked = false;
      }
    });
    window.pageState.mainPin.style.left = `${PinCoordinates.LEFT}px`;
    window.pageState.mainPin.style.top = `${PinCoordinates.TOP}px`;
    for (let i = 0; i < filterSelects.length; i++) {
      filterSelects[i].options[0].selected = true;
    }
    window.pin.remove();
    window.pageState.blockPage();
    window.pin.map.classList.add(`map--faded`);
    window.form.ad.classList.add(`ad-form--disabled`);
    window.pageState.mainPin.addEventListener(`mousedown`, window.pageState.activatePageMouse);
    window.pageState.mainPin.addEventListener(`keydown`, window.pageState.activatePageEnter);
  };

  window.form = {
    changePrice: onSelectPriceChange,
    changeTime: onSelectTimeChange,
    changeGuest: onSelectChange,
    uploadSuccess: onUploadSuccess,
    uploadError: onUploadError,
    reset: onResetClick,
    ad: formAd,
    capacity: guestNumber,
    type: typeHouse,
    checkInTime: timeIn,
    checkOutTime: timeOut,
    rooms: roomNumber
  };

})();
