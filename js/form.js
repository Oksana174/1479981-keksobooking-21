'use strict';
(function () {
  const typeHouse = window.pageState.ad.querySelector(`#type`);
  const priceNight = window.pageState.ad.querySelector(`#price`);
  const timeIn = window.pageState.ad.querySelector(`#timein`);
  const timeOut = window.pageState.ad.querySelector(`#timeout`);
  const roomNumber = window.pageState.ad.querySelector(`#room_number`);
  const featureCheckboxes = document.querySelectorAll(`input[type=checkbox]`);
  const PinCoordinates = {
    LEFT: 570,
    TOP: 375
  };
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
    const selectedGuest = window.pageState.capacity.selectedIndex;
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
      window.pageState.capacity.setCustomValidity(`Некорректное значение, количество гостей должно быть меньше или равно количеству комнат`);
    } else {
      roomNumber.setCustomValidity(``);
      window.pageState.capacity.setCustomValidity(``);
    }
  };

  const reset = function () {
    window.pageState.ad.reset();
    onSelectPriceChange();
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
    window.uploadPhotos.reset();
    window.pin.remove();
    window.pageState.blockPage();
    window.pin.map.classList.add(`map--faded`);
    window.pageState.ad.classList.add(`ad-form--disabled`);
    window.pageState.mainPin.addEventListener(`mousedown`, window.pageState.activatePageMouse);
    window.pageState.mainPin.addEventListener(`keydown`, window.pageState.activatePageEnter);
    window.dragging.coords.x = window.pageState.mainPin.offsetLeft;
    window.dragging.coords.y = window.pageState.mainPin.offsetTop;
  };

  const resetClickButton = function (evt) {
    evt.preventDefault();
    reset();
  };

  window.form = {
    changePrice: onSelectPriceChange,
    changeTime: onSelectTimeChange,
    changeGuest: onSelectChange,
    onResetButtonClick: resetClickButton,
    resetFormAndMap: reset,
    type: typeHouse,
    checkInTime: timeIn,
    checkOutTime: timeOut,
    rooms: roomNumber
  };
})();
