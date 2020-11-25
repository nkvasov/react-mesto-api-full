import React, { useState, useEffect } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

const AddPlacePopup = ({
  isOpen,
  onClose,
  onUpdateCards,
  onEscPress
}) => {
  const [placeName, setPlaceName] = useState('');
  const [placeUrl, setPlaceUrl] = useState('');

  const handlePlaceNameInputChange = (e) => {
    setPlaceName(e.target.value);
  };

  const handlePlaceUrlInputChange = (e) => {
    setPlaceUrl(e.target.value);
  };

  const resetInputs = () => {
    setPlaceName('');
    setPlaceUrl('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    return onUpdateCards({
      name: placeName,
      link: placeUrl
    });
  };

  // для возвращения инпутов в исходное состояние при открытии попапа после нажатия esc или клика по оверлею
  useEffect(() => {
    isOpen && resetInputs();
  }, [isOpen]);

  return (
    <PopupWithForm
      name='add-card'
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      submitBtnLoadingText='Сохранение'
      submitBtnRegularText='Создать'
      onSubmit={handleSubmit}
      onEscPress={onEscPress}
    >
      <div className="form__field">
        <input
          onChange={handlePlaceNameInputChange}
          value={placeName}
          className="form__input"
          id="card-name"
          type="text"
          name="card-name"
          placeholder="Название"
          required minLength="1"
          maxLength="30"
        />
        <span className="form__input-error form__input-error_origin_card-name" />
      </div>
      <div className="form__field">
        <input
          onChange={handlePlaceUrlInputChange}
          value={placeUrl}
          className="form__input"
          id="card-link"
          type="url"
          name="card-link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="form__input-error form__input-error_origin_card-link" />
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup;