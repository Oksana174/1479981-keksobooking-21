'use strict';

(function () {
  const MAP_MIN_X = 0 - (window.pin.mainWidth / 2);
  const MAP_MAX_X = 1200 - (window.pin.mainWidth / 2);
  const MAP_MIN_Y = 130 - window.pin.mainHeight;
  const MAP_MAX_Y = 630 - window.pin.mainHeight;
  const map = document.querySelector(`.map`);

  const activatePinDragging = function () {

    const setMainPinAddress = function (x, y) {
      window.pageState.adress.value = `${Math.round(x + window.pin.mainWidth / 2)}, ${Math.round(y + window.pin.mainHeight)}`;
    };

    window.pageState.mainPin.addEventListener(`mousedown`, function (evt) {
      evt.preventDefault();
      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      const onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        const shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY,
        };
        const mainPinCoords = {
          x: window.pageState.mainPin.offsetLeft - shift.x,
          y: window.pageState.mainPin.offsetTop - shift.y,
        };

        if (mainPinCoords.x >= MAP_MAX_X) {
          mainPinCoords.x = MAP_MAX_X;
        }
        if (mainPinCoords.y >= MAP_MAX_Y) {
          mainPinCoords.y = MAP_MAX_Y;
        }
        if (mainPinCoords.x <= MAP_MIN_X) {
          mainPinCoords.x = MAP_MIN_X;
        }
        if (mainPinCoords.y <= MAP_MIN_Y) {
          mainPinCoords.y = MAP_MIN_Y;
        }

        if (parseInt(window.pageState.mainPin.style.left, 10) !== mainPinCoords.x) {
          startCoords.x = moveEvt.clientX;
        }
        if (parseInt(window.pageState.mainPin.style.top, 10) !== mainPinCoords.y) {
          startCoords.y = moveEvt.clientY;
        }

        window.pageState.mainPin.style.left = mainPinCoords.x + `px`;
        window.pageState.mainPin.style.top = mainPinCoords.y + `px`;

        setMainPinAddress(mainPinCoords.x, mainPinCoords.y);

        window.dragging = {
          coords: mainPinCoords,
        };
      };

      const onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        setMainPinAddress(window.dragging.coords.x, window.dragging.coords.y);
        map.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      };

      map.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    });
  };

  window.dragging = {
    mainPin: activatePinDragging,
  };
})();
