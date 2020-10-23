'use strict';
(function () {
  const formAd = document.querySelector(`.ad-form`);
  const typeHouse = formAd.querySelector(`#type`);
  const priceNight = formAd.querySelector(`#price`);
  const timeIn = formAd.querySelector(`#timein`);
  const timeOut = formAd.querySelector(`#timeout`);
  const roomNumber = formAd.querySelector(`#room_number`);
  const guestNumber = formAd.querySelector(`#capacity`);

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

  window.form = {
    changePrice: onSelectPriceChange,
    changeTime: onSelectTimeChange,
    changeGuest: onSelectChange,
    ad: formAd,
    capacity: guestNumber,
    type: typeHouse,
    checkInTime: timeIn,
    checkOutTime: timeOut,
    rooms: roomNumber
  };

})();
