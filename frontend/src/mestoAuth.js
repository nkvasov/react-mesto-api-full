export const BASE_URL = 'http://api.nkvasov.students.nomoreparties.space';
// export const BASE_URL = 'http://localhost:3000';

const handleOriginalResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json()
    .then((err) => Promise.reject(err));
};

export const register = (password, email) => fetch(`${BASE_URL}/signup`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ password, email }),
})
  .then(handleOriginalResponse)
  .then((res) => res);

export const authorize = (password, email) => fetch(`${BASE_URL}/signin`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ password, email }),
})
  .then(handleOriginalResponse)
  .then((data) => {
    if (data.token) {
      localStorage.setItem('jwt', data.token);
    }
    return data;
  });

export const getContent = (token) => fetch(`${BASE_URL}/users/me`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json())
  .then((data) => data);
