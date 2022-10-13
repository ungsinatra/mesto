import { Popup } from "./Popup";

class PopupWithForm extends Popup{
    constructor(popupSelector,submitHandler){
        this._submitHandler = submitHandler;
        this._form = this._popupSelecotor.querySelector('.poup__form');
        this._popupInputs = Array.from(this._popupSelecotor.querySelector('.popup__input'));
        super(popupSelector);
    }
    _getInputValues(){
        const inputValues = {};
        this._popupInputs.forEach(popup => {
            inputValues[popup] = popup.values;
        })
        return inputValues;
    }
    setEventListeners(){
        this._form.addEventListener('submit',() => {
            const valuesInput = this._getInputValues()
            this._submitHandler(valuesInput);
        });
        super.setEventListeners();
    }
}