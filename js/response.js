'use strict';

// Модуль, который отвечает за отрисовку сообщений об успешной или неудачной отправке данных формы

window.response = (function () {
  var renderSuccess = function (templateId) {
    var fragment = document.createDocumentFragment();
    var successTemplateContent = document.querySelector(templateId).content.querySelector('.success');
    var successElement = successTemplateContent.cloneNode(true);
    fragment.appendChild(successElement);
    document.querySelector('main').appendChild(fragment);

    successElement.addEventListener('click', function () {
      successElement.remove();
      document.removeEventListener('keydown', onSuccessEscPress);
    });
    document.addEventListener('keydown', onSuccessEscPress);
  };

  var renderError = function (templateId) {
    var fragment = document.createDocumentFragment();
    var errorTemplateContent = document.querySelector(templateId).content.querySelector('.error');
    var errorElement = errorTemplateContent.cloneNode(true);
    fragment.appendChild(errorElement);
    document.querySelector('main').appendChild(fragment);

    errorElement.addEventListener('click', function () {
      errorElement.remove();
      document.removeEventListener('keydown', onErrorEscPress);
    });
    document.addEventListener('keydown', onErrorEscPress);


  };

  var onSuccessEscPress = function (evt) {
    window.util.isEscEvent(evt, function () {
      var successElement = document.querySelector('.success');
      successElement.remove();
      document.removeEventListener('keydown', onSuccessEscPress);
    });
  };

  var onErrorEscPress = function (evt) {
    window.util.isEscEvent(evt, function () {
      var errorElement = document.querySelector('.error');
      errorElement.remove();
      document.removeEventListener('keydown', onErrorEscPress);
    });
  };

  return {
    renderSuccess: renderSuccess,
    renderError: renderError
  };
})();
