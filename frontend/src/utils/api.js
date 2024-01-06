// Класс API для работы с сервером.
class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  // Функция проверки ответа от сервера.
  _getResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(console.log(`Oops: ${res.status}`));
  }

  // Получить карточки.
  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem('jwt'),
      },
    }).then(this._getResponce);
  }

  // Получить информацию о пользователе с сервера.
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem('jwt'),
      },
    }).then(this._getResponce);
  }

  // Изменить информацию о пользователе на сервере.
  setNewUserInfo(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._getResponce);
  }

  // Добавить новую карточку на сервер.
  addNewCard(link, name) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        link: link,
        name: name,
      }),
    }).then(this._getResponce);
  }

  // Удалить карточку с сервера.
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem('jwt'),
      },
    }).then(this._getResponce);
  }

  // Смена аватара.
  setNewAvatar(newAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        avatar: `${newAvatar}`,
      }),
    }).then(this._getResponce);
  }

  changeLikeCardStatus(idCard, status) {
    return fetch(`${this._url}/cards/${idCard}/likes`, {
      method: status ? "DELETE" : "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem('jwt'),
      },
    }).then(this._getResponce);
  }
}

const apiConfig = {
  // url: "https://mesto.nomoreparties.co/v1/cohort-75",
  url: "http://127.0.0.1:3000",
};

const api = new Api(apiConfig);

export default api;
