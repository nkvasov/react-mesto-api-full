import React, { useState, useEffect, useRef } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import Header from './Header/Header';
import InfoTooltip from './InfoTooltip/InfoTooltip';
import Register from './Register/Register';
import Login from './Login/Login';
import Footer from './Footer/Footer';
import Main from './Main/Main';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import Api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as mestoAuth from '../mestoAuth';
import failIcon from '../images/fail-icon.svg';
import successIcon from '../images/success-icon.svg';
import { BASE_URL } from '../mestoAuth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [tooltipText, setTooltipText] = useState('');
  const [tooltipImage, setTooltipImage] = useState('');
  const history = useHistory();
  const api = useRef();

  function tokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      if (!!jwt) {
        return mestoAuth.getContent(jwt)
          .then((res) => {
            if (res) {
              setLoggedIn(true);
              setCurrentUser(res);
              history.push('/');
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    api.current = new Api({
      baseUrl: BASE_URL,
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      }
    });
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api.current.getInitialCards()
        .then((initialCards) => {
          setCards(initialCards.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.includes(currentUser._id);
    api.current.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.current.deleteCard(card._id)
      .then(() => {
        const deletedCardIndex = cards.findIndex((c) => c._id === card._id);
        const newCards = cards.slice();
        newCards.splice(deletedCardIndex, 1);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleUpdateUser = (userData) => {
    return api.current.setUserInfo(userData)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeAllPopups();
      });
  };

  const handleUpdateAvatar = (userData) => {
    return api.current.setAvatar(userData)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeAllPopups();
      });
  };

  const handleAddPlaceSubmit = (cardData) => {
    return api.current.postCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeAllPopups();
      });
  };

  const handleEscPress = (e) => {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }

  const closeAllPopups = () => {
    isEditProfilePopupOpen && setIsEditProfilePopupOpen(false);
    isEditAvatarPopupOpen && setIsEditAvatarPopupOpen(false);
    isAddPlacePopupOpen && setIsAddPlacePopupOpen(false);
    isInfoTooltipPopupOpen && setIsInfoTooltipPopupOpen(false);
    selectedCard && setSelectedCard(null);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  function signIn(password, email) {
    return mestoAuth.authorize(password, email)
      .then((data) => {
        if (data.token) {
          tokenCheck();
        }
      })
  }

  function signUp(password, email) {
    return mestoAuth.register(password, email);
  }

  function signOut() {
    localStorage.removeItem('jwt');
    setCurrentUser({});
    setLoggedIn(false);
  }

  function handleAuthError(err = { message: 'Что-то пошло не так. Попробуйте еще раз.' }) {
    setTooltipText(err.message);
    setTooltipImage(failIcon);
    setIsInfoTooltipPopupOpen(true);
  }

  function handleAuthSuccess() {
    setTooltipText('Вы успешно зарегистрировались.');
    setTooltipImage(successIcon);
    setIsInfoTooltipPopupOpen(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">

          <Header
            onExitClick={signOut}
          />

          <Switch>
            <ProtectedRoute
              exact path='/'
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              closeAllPopups={closeAllPopups}
              onCardClick={handleCardClick}
              onUpdateUser={handleUpdateUser}
              onUpdateAvatar={handleUpdateAvatar}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onUpdateCards={handleAddPlaceSubmit}
              onEscPress={handleEscPress}
              isEditProfilePopupOpen={isEditProfilePopupOpen}
              isEditAvatarPopupOpen={isEditAvatarPopupOpen}
              isAddPlacePopupOpen={isAddPlacePopupOpen}
              selectedCard={selectedCard}
              cards={cards}
            />

            <Route path='/sign-up'>
              <Register handleRegistration={signUp} handleError={handleAuthError} handleSuccess={handleAuthSuccess} />
            </Route>

            <Route path='/sign-in'>
              <Login handleLogin={signIn} handleError={handleAuthError} />
            </Route>
          </Switch>

          <Route exact path='/'>
            <Footer />
          </Route>

          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            tooltipText={tooltipText}
            tooltipImage={tooltipImage}
            onClose={closeAllPopups}
            onEscPress={handleEscPress}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;

