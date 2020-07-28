'use strict';

window.imagePreview = (function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  var onAvatarChooserChange = function () {
    if (avatarChooser.files[0]) {
      var file = avatarChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          avatarPreview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  };

  avatarChooser.addEventListener('change', onAvatarChooserChange);

  var photoChooser = document.querySelector('#images');
  var photoPreview = document.querySelector('.ad-form__photo');

  var onPhotoChooserChange = function () {
    var photoPreviewImage = document.createElement('img');
    photoPreviewImage.setAttribute('width', '70');
    photoPreviewImage.setAttribute('height', '70');
    photoPreviewImage.setAttribute('src', '');

    var file = photoChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        photoPreviewImage.src = reader.result;
        photoPreview.appendChild(photoPreviewImage);
      });

      reader.readAsDataURL(file);
    }
  };

  photoChooser.addEventListener('change', onPhotoChooserChange);

  return {
    avatarPreview: avatarPreview,
    photoPreview: photoPreview
  };
})();
