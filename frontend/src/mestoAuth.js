// export const BASE_URL = 'http://nkvasov.students.nomoreparties.space';
export const BASE_URL = 'http://localhost:3000';

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, email })
  })
    .then((response) => {
      try {
        if (response.status === 201) {
          return response.json();
        }
      } catch (e) {
        return (e);
      }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err)
    );
};

export const authorize = (password, email) => {
  // console.log(email);
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      } else return;
    });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${token}`,
      "Authorization": token,
    }
  })
    .then(res => res.json())
    .then(data => data)
};
