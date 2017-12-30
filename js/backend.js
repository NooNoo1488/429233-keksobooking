'use strict';

(function () {
  var SERVER_URL = 'https://js.dump.academy/keksobooking';

  var createRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 5000;
    var OK_STATUS = 200;

    xhr.addEventListener('load', function () {
      if (xhr.status === OK_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError('Код ошибки: ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Сервер не ответил за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = createRequest(onLoad, onError);
      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = createRequest(onLoad, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    }
  };
}());
