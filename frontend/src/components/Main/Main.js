import React, { useContext } from 'react';
import ImagePopup from '../ImagePopup/ImagePopup.js';
import Card from '../Card/Card.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';

const Main = (props) => {
  const { onEditProfile,
    onAddPlace,
    onEditAvatar,
    closeAllPopups,
    onCardClick,
    onUpdateUser,
    onUpdateAvatar,
    onCardLike,
    onCardDelete,
    onUpdateCards,
    onEscPress,
    onOverlayClick,
    isEditProfilePopupOpen,
    isEditAvatarPopupOpen,
    isAddPlacePopupOpen,
    selectedCard,
    cards } = props;
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">

      <section className="profile">
        <div className="profile__content">
          <img
            src={currentUser.avatar}
            className="profile__avatar"
            alt={`фото ${currentUser.name}`}
            onClick={onEditAvatar}
          />
          <div className="profile__info">
            <div className="profile__title-block">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit-btn"
                type="button"
                onClick={onEditProfile}
                aria-label="Редактировать профиль"
              />
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="add-btn"
          type="button"
          onClick={onAddPlace}
          aria-label="Добавить место"
        />
      </section>

      <section className="cards">
        <ul className="cards__container">
          {cards.map((card) => (
            <Card
              card={card}
              onCardClick={onCardClick}
              key={card._id}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>

      {/* <PopupWithForm
        name='confirmation'
        title='Вы уверены?'
        onClose={closeAllPopups}
        submitBtnText='Да' /> */}

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={onUpdateAvatar}
        onEscPress={onEscPress}
        onOverlayClick={onOverlayClick}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={onUpdateUser}
        onEscPress={onEscPress}
        onOverlayClick={onOverlayClick}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        onEscPress={onEscPress}
        onOverlayClick={onOverlayClick}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onUpdateCards={onUpdateCards}
        onEscPress={onEscPress}
        onOverlayClick={onOverlayClick}
      />

    </main>

  );
}

export default Main;

