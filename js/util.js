'use strict';
(function () {
  const setDisableFields = function (isDisabled, collection) {
    for (const element of collection) {
      element.disabled = isDisabled;
    }
    return collection;
  };

  const uploadPhotos = function (element, link, type) {
    const file = element.files[0];
    const fileName = file.name.toLowerCase();
    const matches = type.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      const reader = new FileReader();
      reader.addEventListener(`load`, function () {
        link.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  window.util = {
    setDisable: setDisableFields,
    uploadImg: uploadPhotos
  };
})();
