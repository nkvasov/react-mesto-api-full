import React, { useState, useEffect } from 'react';

const PopupWithForm = (props) => {
  const {
    name,
    isOpen,
    title,
    submitBtnLoadingText,
    submitBtnRegularText,
    onClose,
    onSubmit,
    onEscPress,
    children } = props;
  const popupClassName = `popup popup_content_form ${name}-popup ${isOpen && 'popup_opened'}`;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    isOpen && document.addEventListener('keydown', onEscPress);
    return (() => {
      isOpen && document.removeEventListener('keydown', onEscPress);
    });
  }, [isOpen, onEscPress]);

  const handleSubmit = (e) => {
    setIsLoading(true);
    onSubmit(e)
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className={popupClassName} onClick={onClose}>
      <form
        className="form popup__container form-to-validate"
        name={name}
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        noValidate
      >
        <h3 className="form__title"> {title} </h3>
        <button
          className="close-btn form__close-btn"
          type="reset"
          name="close"
          onClick={onClose}
          aria-label="Закрыть попап"
        />
        {children}
        <button className="form__submit-btn" type="submit">
          {isLoading ? submitBtnLoadingText : submitBtnRegularText}
        </button>
      </form>
    </section>
  );
};
export default PopupWithForm;


