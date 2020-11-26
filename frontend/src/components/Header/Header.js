import React, { useContext } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import logo from '../../images/mesto-russia-logo.svg';

const Header = (props) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={logo} alt="Логотип Mesto Russia" />
      </Link>
      <Switch>
        <Route exact path="/">
          <div className="header__auth-block">
            {/* <p className="header__user-login">{props.userLogin}</p> */}
            <p className="header__user-login">{currentUser.email}</p>
            <Link
              to="/sign-in"
              onClick={props.onExitClick}
              className="header__logout"
            >
              Выйти
            </Link>
          </div>
        </Route>
        <Route path='/sign-in'>
          <div className="header__auth-block">
            <Link
              to="/sign-up"
              onClick={props.onExitClick}
              className="header__logout"
            >
              Регистрация
            </Link>
          </div>
        </Route>

        <Route path='/sign-up'>
          <div className="header__auth-block">
            <Link
              to="/sign-in"
              onClick={props.onExitClick}
              className="header__logout"
            >
              Войти
            </Link>
          </div>
        </Route>
      </Switch>

    </header>
  );
}

export default Header;
