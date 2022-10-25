import { selectors } from "../utils/constants.js";

class Popup {
  constructor(popupSelector) {
    this._popupSelecotor = popupSelector;
    this.closeBtn = popupSelector.querySelector(selectors.editBtn);
    this._closeEsc = this._closeEscHandler.bind(this);
  }
  open() {
    this._popupSelecotor.classList.add(selectors.popupOpen);
    this._handleEscClose();
  }
  close() {
    this._popupSelecotor.classList.remove(selectors.popupOpen);
    document.removeEventListener('keydown',this._closeEsc);
  }
  getForm() {
    this._popupForm = this._popupSelecotor.querySelector(selectors.form);
    return this._popupForm;
  }
  _handleEscClose() {
    document.addEventListener("keydown", this._closeEsc);
  }
  _closeEscHandler(evt){
    if (evt.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    this._popupSelecotor.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains(selectors.popupOpen)) {
        this.close();
      }
      if (evt.target.classList.contains("popup__close-btn")) {
        this.close();
      }
    });
  }
}

export { Popup };
