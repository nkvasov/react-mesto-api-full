/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react';

const InfoTooltip = ({
  isOpen, onClose, onEscPress, tooltipText, tooltipImage,
}) => {
  const className = `popup popup_content_form ${isOpen && 'popup_opened'}`;

  useEffect(() => {
    isOpen && document.addEventListener('keydown', onEscPress);
    return (() => {
      isOpen && document.removeEventListener('keydown', onEscPress);
    });
  }, [isOpen, onEscPress]);

  return (
    <section className={className} onClick={onClose}>
      <div
        className="form form_type_tooltip"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={tooltipImage} alt="картинка-заставка" className="form__image"></img>
        <p className="form__tooltip">{tooltipText}</p>
        <button
          className="close-btn form__close-btn"
          name="close"
          onClick={onClose}
          aria-label="Закрыть попап"
        />
      </div>

    </section>
  );
};

export default InfoTooltip;
