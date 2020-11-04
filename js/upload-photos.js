'use strict';

const avatarChooser = window.pageState.ad.querySelector(`.ad-form__field input[type=file]`);
const avatarPreview = window.pageState.ad.querySelector(`.ad-form-header__preview img`);
const photoChooser = window.pageState.ad.querySelector(`.ad-form__upload input[type=file]`);
const photoPreview = window.pageState.ad.querySelector(`.ad-form__photo`);
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const avatarChangeHandler = function () {
  window.util.uploadImg(avatarChooser, avatarPreview, FILE_TYPES);
};

const photoFormChangeHandler = function () {
  const filePhoto = photoChooser.files[0];
  const fileName = filePhoto.name.toLowerCase();
  const matches = FILE_TYPES.some(function (it) {
    return fileName.endsWith(it);
  });
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener(`load`, function () {
      if (photoPreview.children.length === 0) {
        const imgElement = document.createElement(`img`);
        imgElement.style.width = `70px`;
        imgElement.style.height = `70px`;
        imgElement.alt = `Фотография жилья`;
        imgElement.src = reader.result;
        photoPreview.appendChild(imgElement);
      } else {
        photoPreview.firstChild.src = reader.result;
      }
    });
    reader.readAsDataURL(filePhoto);
  }
};

const resetImages = function () {
  const photoHousing = photoPreview.querySelector(`img`);
  if (photoHousing) {
    photoHousing.remove();
  }
  if (window.uploadPhotos.avatar.src !== `img/muffin-grey.svg`) {
    window.uploadPhotos.avatar.src = `img/muffin-grey.svg`;
  }
};

avatarChooser.addEventListener(`change`, avatarChangeHandler);
photoChooser.addEventListener(`change`, photoFormChangeHandler);

window.uploadPhotos = {
  reset: resetImages,
  avatar: avatarPreview
};
