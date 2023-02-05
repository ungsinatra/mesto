import { Popup } from "./Popup";

class PopupWithConfirmation extends Popup{
    constructor({popupSelector,submitHandler}){
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._form = this._popupSelecotor.querySelector('.popup__form_use_popup-conferm');
        
        
    }

    _submitClickHandler(){
        this._submitHandler();
    }

    setEventListeners(){
        this._form.addEventListener('submit',(evt) => {
            evt.preventDefault();
            this._submitClickHandler();
        })  
        super.setEventListeners();

    }

}

export {PopupWithConfirmation};