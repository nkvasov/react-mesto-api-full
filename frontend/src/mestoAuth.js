export const BASE_URL = 'http://nkvasov.students.nomoreparties.space';
// export const BASE_URL = 'http://localhost:3000';

const handleOriginalResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return res.json()
      .then((err) => {
        return Promise.reject(err);
      });
  };
};

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, email })
  })
    .then(handleOriginalResponse)
    // .then((response) => {
    //   try {
    //     if (response.status === 201) {
    //       return response.json();
    //     }
    //   } catch (e) {
    //     return (e);
    //   }
    // })
    .then((res) => {
      return res;
    })
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then(handleOriginalResponse)
    // .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
      }
      return data;
    });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      // "Authorization": token,
    }
  })
    .then(res => res.json())
    .then(data => data)
};
