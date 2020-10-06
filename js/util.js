'use strict';
(function () {
  const setDisableFields = function (isDisabled, collection) {
    for (const element of collection) {
      element.disabled = isDisabled;
    }
    return collection;
  };

  const isMouseEvent = function (evt, action) {
    if (evt.button === 0) {
      action();
    }
  };

  const isEnterEvent = function (evt, action) {
    if (evt.key === `Enter`) {
      action();
    }
  };

  window.util = {
    disable: setDisableFields,
    mouseEvent: isMouseEvent,
    enterEvent: isEnterEvent,
  };
})();
