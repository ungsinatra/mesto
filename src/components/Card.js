import { template } from "../utils/constants.js";
class Card {
  constructor({ name, link, owner, likes, _id }, props) {
    this._selectors = props.selectors;
    this._template = template;
    this._popupImgHandler = props.popupImgHandler;
    this._cardName = name;
    this._removeCardHadler = props.removeCardsHandler;
    this._cardLink = link;
    this._popupImg = document.querySelector(this._selectors.popupImg);
    this._card = this._template
      .querySelector(this._selectors.cardItem)
      .cloneNode(true);
    this._likeButton = this._card.querySelector(this._selectors.likeButton);
    this._likeButtonCount = this._card.querySelector(this._selectors.likeCount);
    this._removeButton = this._card.querySelector(this._selectors.removeButton);
    this._count = likes.length;
    this._likedUsers = likes;
    this._cardId = _id;
    this._cardOwnerId = owner._id;
    this._userId = props.userId;
    this._handleClickLike = props.clickLikeHandler.bind(this);
    this._img = this._card.querySelector(this._selectors.cardImg);

  }
  _filterTrashIcon() {
    console.log(this._cardOwnerId == this._userId);
    if (this._cardOwnerId == this._userId) {
      this._removeButton.style.display = "block";
    }
    if (this._cardOwnerId != this._userId) {
      this._removeButton.style.display = "none";
    }
  }
  _checkLikeButtonIconStatus() {
    if (this.isLiked()) {
      this._likeButton.classList.add(this._selectors.cardLikeBtnActive);
    }
  }
  isLiked() {
    const liked = this._likedUsers.some((card) => {
      return card._id === this._userId;
    });
    return liked;
  }
  changeLikeCount(newLikedUsers) {
    this._count = newLikedUsers.length;
    this._likeButtonCount.textContent = this._count;
    this._likedUsers = newLikedUsers;
    this._handleLike();
  }

  _handleLike() {
    this._likeButton.classList.toggle(this._selectors.cardLikeBtnActive);
  }

  removeCard() {
    this._card.remove();
  }
  genaraeteTemplate() {
    this._title = this._card.querySelector(this._selectors.cardTitle);
    this._title.textContent = this._cardName;
    this._img.src = this._cardLink;
    this._img.alt = this._cardName;
    this._likeButtonCount.textContent = this._count;
    this._filterTrashIcon();
    this._checkLikeButtonIconStatus();
    this._setListeners();
    return this._card;
  }

  _setListeners() {
    this._removeButton.addEventListener('click',(evt) => {
        this._removeCardHadler(this._cardId,this._card);
    })
    this._likeButton.addEventListener('click',(evt) => {
        this._handleClickLike(this._cardId);
    })
    this._img.addEventListener('click',(evt) => {
        this._popupImgHandler({name:this._cardName,link:this._cardLink});
    })

  }
}

export { Card };
