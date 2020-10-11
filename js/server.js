'use strict';
(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const StatusCode = {
    OK: 200,
    NOTFOUND: 404,
    FORBIDDEN: 403
  };
  const TIMEOUT_IN_MS = 10000;

  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: rgba(255,255,255,0.9)`;
    node.style.border = `3px solid rgba(255,0,0,0.8)`;
    node.style.borderRadius = `8px`;
    node.style.width = `650px`;
    node.style.minHeight = `80px`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.top = `20%`;
    node.style.fontSize = `22px`;
    node.style.lineHeight = `30px`;
    node.style.paddingTop = `15px`;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const loadRequest = function (onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      switch (xhr.status) {
        case StatusCode.OK:
          onSuccess(xhr.response);
          break;
        case StatusCode.NOTFOUND:
          onError(`Запрашиваемый ресурс не найден`);
          break;
        case StatusCode.FORBIDDEN:
          onError(`Отсутствует доступ к ресурсу`);
          break;
        default:
          onError(`Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;`);
      }
    });
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(`GET`, URL);
    xhr.send();
  };

  window.server = {
    load: loadRequest,
    error: errorHandler
  };
})();
