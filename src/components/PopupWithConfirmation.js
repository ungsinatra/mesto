import { Popup } from "./Popup";

class PopupWithConfirmation extends Popup{
    constructor({popupSelector,id,submitHandler}){
        super(popupSelector);
        this._submitClickHandler = submitHandler
        this._form = this._popupSelecotor.querySelector('.popup__form_use_popup-conferm');
        
        
    }
   
    getCardInfo(id,cardElement) {
        this._cardId = id;
        this._card = cardElement;
    }
    _submit() {
        this._submitClickHandler(this._cardId,this._card);
    }

    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit',(evt) => {
            evt.preventDefault();
            this._submit();
        })  

    }

}

export {PopupWithConfirmation};