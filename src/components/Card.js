import { template } from "../utils/constants.js";
class Card {
    constructor(
        { name, link, owner, likes = [], _id = ''},
        selectors,
        userData,
        popupImgHandler,
        removeCardsHandler,
        clickLikeHandler
    ) {
        this._selectors = selectors;
        this._template = template;
        this._popupImgHandler = popupImgHandler;
        this._cardName = name;
        this._removeCardHadler = removeCardsHandler;
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
        this._userId = userData;
        this._removeCard = this._removeCard.bind(this);
        this._handleClickLike = clickLikeHandler.bind(this);
        // this._attachEventListeners = this.attachEventListeners.bind(this);

        
    }
    _filterTrashIcon() {
        if (this._cardOwnerId == this._userId) {
            this._removeButton.style.display = 'block';
        }
        if (this._cardOwnerId != this._userId) {
            this._removeButton.style.display = 'none';
        }
        
    }
    _checkLikeButtonIconStatus() {
        if(this.isLiked()){
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
        this._count = newLikedUsers.length
        this._likeButtonCount.textContent = this._count;
        this._likedUsers = newLikedUsers;
        this._handleLike();
    }
 
    _handleLike() {
        this._likeButton.classList.toggle(this._selectors.cardLikeBtnActive);
    }
 
    _removeCard() {
        // this._card.removeEventListener('click',this.attachEventListeners)
        this._card.remove();

    }
    genaraeteTemplate() {
        this._title = this._card.querySelector(this._selectors.cardTitle);
        this._img = this._card.querySelector(this._selectors.cardImg);
        this._title.textContent = this._cardName;
        this._img.src = this._cardLink;
        this._img.alt = this._cardName;
        this._likeButtonCount.textContent = this._count;
        this._filterTrashIcon();
        this._checkLikeButtonIconStatus();
        this._setListeners();
        return this._card;
    }
    // _removeEventListeners() {

    // }
    attachEventListeners(evt) {

    }

    _setListeners() {
        this._card.addEventListener("click", (evt) => {
            if (evt.target.classList.contains(this._selectors.like)) {
                this._handleClickLike(this._cardId);
                
            }
            if (evt.target.classList.contains(this._selectors.remove)) {
                this._removeCardHadler(this._removeCard);
            }
            if (evt.target.classList.contains("place__img")) {
                this._popupImgHandler(this._cardId);
            }
        });
    }
}

export { Card };
