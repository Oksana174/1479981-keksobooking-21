'use strict';

const HALF_WIDTH_PIN = window.pin.mainWidth / 2;
const MAP_MIN_X = 0 - HALF_WIDTH_PIN;
const MAP_MAX_X = 1200 - HALF_WIDTH_PIN;
const MAP_MIN_Y = 130 - window.pin.mainHeight;
const MAP_MAX_Y = 630 - window.pin.mainHeight;
const map = document.querySelector(`.map`);

const calculationOfCoordinates = function (start, move) {
  const shift = {
    x: start.x - move.clientX,
    y: start.y - move.clientY,
  };
  const newMainPinCoords = {
    x: window.pageState.mainPin.offsetLeft - shift.x,
    y: window.pageState.mainPin.offsetTop - shift.y,
  };

  if (newMainPinCoords.x >= MAP_MAX_X) {
    newMainPinCoords.x = MAP_MAX_X;
  }
  if (newMainPinCoords.y >= MAP_MAX_Y) {
    newMainPinCoords.y = MAP_MAX_Y;
  }
  if (newMainPinCoords.x <= MAP_MIN_X) {
    newMainPinCoords.x = MAP_MIN_X;
  }
  if (newMainPinCoords.y <= MAP_MIN_Y) {
    newMainPinCoords.y = MAP_MIN_Y;
  }

  if (parseInt(window.pageState.mainPin.style.left, 10) !== newMainPinCoords.x) {
    start.x = move.clientX;
  }
  if (parseInt(window.pageState.mainPin.style.top, 10) !== newMainPinCoords.y) {
    start.y = move.clientY;
  }

  window.pageState.mainPin.style.left = newMainPinCoords.x + `px`;
  window.pageState.mainPin.style.top = newMainPinCoords.y + `px`;

  window.pageState.setMainPinAddress(newMainPinCoords.x, newMainPinCoords.y);
};

window.pageState.mainPin.addEventListener(`mousedown`, function (evt) {
  evt.preventDefault();
  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  const onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    calculationOfCoordinates(startCoords, moveEvt);
  };

  const onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    calculationOfCoordinates(startCoords, upEvt);
    map.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  map.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});
