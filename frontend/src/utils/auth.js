class Auth {
  constructor(url) {
    this._url = url;
  }

  _getResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(console.log(`Oops: ${res.status}`));
  }

  signUp(email, password) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: password, email: email }),
    }).then(this._getResponce);
  }

  signIn(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: password, email: email }),
    }).then(this._getResponce);
  }

  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponce);
  }
}

// const url = "https://auth.nomoreparties.co"; тоже на память :)
const url = "http://api.mesto.shekko.nomoredomainsmonster.ru";

const auth = new Auth(url);

export default auth;
