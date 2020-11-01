'use strict';
(function () {
  const avatarChooser = window.pageState.ad.querySelector(`.ad-form__field input[type=file]`);
  const avatarPreview = window.pageState.ad.querySelector(`.ad-form-header__preview img`);
  const photoChooser = window.pageState.ad.querySelector(`.ad-form__upload input[type=file]`);
  const photoPreview = window.pageState.ad.querySelector(`.ad-form__photo`);
  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

  avatarChooser.addEventListener(`change`, function () {
    const file = avatarChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      const reader = new FileReader();
      reader.addEventListener(`load`, function () {
        avatarPreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

  photoChooser.addEventListener(`change`, function () {
    const file = photoChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      const reader = new FileReader();
      reader.addEventListener(`load`, function () {
        photoPreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });
})();
