import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;                   
    this._form = super.getForm();
    this._popupInputs = Array.from(
      this._form.querySelectorAll(".popup__input")
    );
  }
  _getInputValues() {
    this._inputValues = {};
    this._popupInputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }
  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    });
    super.setEventListeners();
  }

  close(isCard) {
    if (isCard) {
      this._form.reset();
    }
    super.close();
  }
}

export { PopupWithForm };