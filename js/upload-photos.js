'use strict';
(function () {
  const avatarChooser = window.pageState.ad.querySelector(`.ad-form__field input[type=file]`);
  const avatarPreview = window.pageState.ad.querySelector(`.ad-form-header__preview img`);
  const photoChooser = window.pageState.ad.querySelector(`.ad-form__upload input[type=file]`);
  const photoPreview = window.pageState.ad.querySelector(`.ad-form__photo`);
  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

  const uploadPhotos = (function (file, element) {
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      const reader = new FileReader();
      reader.addEventListener(`load`, function () {
        element.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

  const avatarChangeHandler = function () {
    const fileAvatar = avatarChooser.files[0];
    uploadPhotos(fileAvatar, avatarPreview);
  };

  const photoFormChangeHandler = function () {
    while (photoPreview.firstChild) {
      photoPreview.removeChild(photoPreview.firstChild);
    }
    const imgElement = document.createElement(`img`);
    imgElement.style.width = `70px`;
    imgElement.style.height = `70px`;
    imgElement.alt = `Фотография жилья`;
    photoPreview.appendChild(imgElement);
    const filePhoto = photoChooser.files[0];
    uploadPhotos(filePhoto, imgElement);
  };

  avatarChooser.addEventListener(`change`, avatarChangeHandler);
  photoChooser.addEventListener(`change`, photoFormChangeHandler);

  window.uploadPhotos = {
    housing: photoPreview,
    avatar: avatarPreview
  };
})();
