import React, {useContext} from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Card = ({card, onCardClick, onCardLike, onCardDelete}) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(user => user._id === currentUser._id);

  const handleImageClick = () => {
    onCardClick(card);
  }
  const handleLikeClick = () => {
    onCardLike(card);
  }
  const handleTrashClick = () => {
    onCardDelete(card);
  }

  const likeClassName = `card__like-btn ${isLiked && 'card__like-btn_enabled'}`;
  const TrashClassName = `card__trash-btn ${isOwn && 'card__trash-btn_enabled'}`;

  return (
    <li className="card">
      <button
        className={TrashClassName}
        aria-label="Удалить картинку с подписью"
        type="button"
        name="trash"
        onClick={handleTrashClick} />
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleImageClick} />
      <div className="card__caption">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-block">
          <button
            className={likeClassName}
            type="button"
            name="like"
            onClick={handleLikeClick}
            aria-label="Поставить лайк картинке" />
          <p className="card__like-numbers">{card.likes.length || ''}</p>
        </div>
      </div>
    </li>
  );
}
export default Card;