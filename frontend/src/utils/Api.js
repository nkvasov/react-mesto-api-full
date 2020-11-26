class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleOriginalResponse(res) {
    if(res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(this._handleOriginalResponse);
  }

  // getUserInfo() {
  //   return fetch(`${this._baseUrl}/users/me`, {
  //     headers: this._headers
  //   })
  //   .then(this._handleOriginalResponse);
  // }

  setUserInfo(inputValues) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(inputValues)
    })
    .then(this._handleOriginalResponse);
  }

  setAvatar(inputValues) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(inputValues)
    })
    .then(this._handleOriginalResponse);
  }

  postCard(inputValues) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(inputValues)
    })
    .then(this._handleOriginalResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._handleOriginalResponse);
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._handleOriginalResponse);
  }

  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._handleOriginalResponse);
  }

  changeLikeCardStatus = (cardId, isLiked) => {
    if(isLiked) {
      return this.unlikeCard(cardId);
    } else {
      return this.likeCard(cardId);
    }
  }
}

// Создаем экземпляр API
export const api = new Api({
  // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  // baseUrl: 'http://nkvasov.students.nomoreparties.space',
  baseUrl: 'http://localhost:3000',
  headers: {
    authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmJmNjMyOGQ0ODBiZTA2NmE0ODgwODQiLCJpYXQiOjE2MDY0MTIwOTQsImV4cCI6MTYwNzAxNjg5NH0.mQHnpuxnX8R3CM1qK1MXWbb8ESchjzfiMLDflxaoXn4',
    'Content-Type': 'application/json',
  }
});