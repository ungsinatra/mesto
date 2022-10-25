import {template} from '../utils/constants.js'
class Card{
    constructor(name,url,selectors,popupImgHandler){
        this._selectors = selectors;
        this._template = template;
        this._popupImgHandler = popupImgHandler;
        this._name = name;
        this._url = url
        this._popupImg = document.querySelector(this._selectors.popupImg);
        this._card = this._template.querySelector(this._selectors.cardItem).cloneNode(true);
        this._likeButton =  this._card.querySelector(this._selectors.likeButton);
    }

    _handleLike(){
        this._likeButton.classList.toggle(this._selectors.cardLikeBtnActive);
    }
    _removeCard(){
        this._card.remove();
    }
    genaraeteTemplate(){
        this._title =  this._card.querySelector(this._selectors.cardTitle);
        this._img = this._card.querySelector(this._selectors.cardImg);
        this._title.textContent = this._name;
        this._img.src = this._url;
        this._img.alt = this._name;
        this._setListeners()
        return this._card
    }

    _setListeners(){
        this._card.addEventListener('click',(evt) => {
            if(evt.target.classList.contains(this._selectors.like)){
                this._handleLike();
            }
            if (evt.target.classList.contains(this._selectors.remove)){
                this._removeCard();
            }
            if(evt.target.classList.contains('place__img')){
                this._popupImgHandler();
            }
        })
    }
}
        
export {Card};