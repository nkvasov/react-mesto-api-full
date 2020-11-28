import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Register = ({ handleRegistration, handleError, handleSuccess }) => {

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
    handleRegistration(password, email)
      .then((res) => {
        console.log(res);
        if (res) {
          history.push('/sign-in');
          handleSuccess();
        }
      })
      .catch((err) => {
        handleError(err);
      });
  };

  return (
    <form
      className="form form_theme_dark page__form"
      name="registration"
      onSubmit={handleSubmit}
      noValidate
    >
      <div>
        <h3 className="form__title form__title_centered">Регистрация</h3>

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
          Зарегистрироваться
        </button>
        <Link to="/sign-in" className="form__alternative-link">Уже зарегистрированы? Войти</Link>
      </div>
    </form>
  );
}
// Ответ после регистрации:
// {data: {_id: "5fa5563886203500127df706", email: "nkvasov@yandex.ru"}}

export default Register;
