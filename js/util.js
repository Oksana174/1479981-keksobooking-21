'use strict';
(function () {
  const setDisableFields = function (isDisabled, collection) {
    for (const element of collection) {
      element.disabled = isDisabled;
    }
    return collection;
  };

  window.util = {
    setDisable: setDisableFields
  };
})();
