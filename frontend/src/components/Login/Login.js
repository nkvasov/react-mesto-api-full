import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = ({ handleLogin, handleError }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleEmailInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordInputChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password || !email) {
      handleError();
      return;
    }
    handleLogin(password, email)
    .then(() => {
      setEmail('');
      setPassword('');
      history.push('/');
    })
      .catch((err) => {
        handleError(err);
      });
  };

  return (
    <form
      className="form form_theme_dark page__form"
      name="sign-in"
      onSubmit={handleSubmit}
      noValidate
    >
      <div>
        <h3 className="form__title form__title_centered">Вход</h3>
        <div className="form__field">
          <input className="form__input form__input_theme_dark"
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            // required
            value={email}
            onChange={handleEmailInputChange}
          />
          <span className="form__input-error form__input-error_origin_profile-name" />
        </div>
        <div className="form__field">
          <input className="form__input form__input_theme_dark"
            id="password"
            type="password"
            name="password"
            placeholder="Пароль"
            // required
            // minLength="5"
            // maxLength="15"
            value={password}
            onChange={handlePasswordInputChange}
          />
          <span className="form__input-error form__input-error_origin_profile-description" />
        </div>
      </div>
      <div>
        <button className="form__submit-btn form__submit-btn_theme_dark" type="submit">
          Войти
        </button>
      </div>
    </form>
  );
}

export default Login;
