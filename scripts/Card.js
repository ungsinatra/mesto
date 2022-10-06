class Card{
    constructor(data,template){
        this._data = data;
        this._template = template;
        this._popupImg = document.querySelector(this._data.popupImg);
        this._card = this._template.querySelector(this._data.cardItem).cloneNode(true);
        this._place = document.querySelector(this._data.placeContainer);
    }

    _handleLike(button){
        button.classList.toggle(this._data.cardLikeBtnActive);
    }
    _removeCard(card){
        card.remove();
    }
    _makeCard(element){
        this._card.querySelector(this._data.cardTitle).textContent = element.name;
        this._card.querySelector(this._data.cardImg).src = element.link;
        this._card.querySelector(this._data.cardImg).alt = element.name;
        this._setListeners(this._card)
        return this._card
    }

    renderCards(element){
        this._place.prepend(this._makeCard(element));
    }

    _setListeners(card){
        card.addEventListener('click',(evt) => {
            console.log(evt.target)
            if(evt.target.classList.contains(this._data.like)){
                const likeButton = evt.target;
                this._handleLike(likeButton);
            }
            if (evt.target.classList.contains(this._data.remove)){
                this._removeCard(card)
            }
            if (evt.target.classList.contains(this._data.cardImage)){
                const img = evt.target;
                this._showImageCard(img);
            }
        })
    }
    _showImageCard(img){
            this._popupImg.classList.add(this._data.popupOpen);
            this._popupImg.querySelector(this._data.popupImage).src = img.src;
            this._popupImg.querySelector(this._data.popupImgHeading).textContent = img.alt;
    }

}

export {Card};