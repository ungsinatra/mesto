class Card{
    constructor(name,url,selectors,template){
        this._selectors = selectors;
        this._template = template;
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
        this._card.querySelector(this._selectors.cardTitle).textContent = this._name;
        this._card.querySelector(this._selectors.cardImg).src = this._url;
        this._card.querySelector(this._selectors.cardImg).alt = this._name;
        this._setListeners(this._card)
        return this._card
    }

    _setListeners(){
        this._card.addEventListener('click',(evt) => {
            if(evt.target.classList.contains(this._selectors.like)){
                this._handleLike();
            }
            if (evt.target.classList.contains(this._selectors.remove)){
                this._removeCard()
            }
        })
    }
}

export {Card};