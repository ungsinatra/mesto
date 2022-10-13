import {selectors} from './index.js'
class Popup {
  constructor(popupSelector) {
    this._popupSelecotor = popupSelector;
    this.closeBtn = popupSelector.querySelector(".popup__close-btn");
  }

  open() {
    this._popupSelecotor.classList.add(selectors.popupOpen);
  }
  close() {
    this._popupSelecotor.classList.remove(selectors.popupOpen);
  }
  _handleEscClose() {
    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        this.close();
      }
    });
  }

  setEventListeners() {
    this._handleEscClose();
    this._popupSelecotor.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup__opened")) {
        console.log("opened");
        this.close();
      }
      if (evt.target.classList.contains("popup__close-btn")) {
        console.log("btn");
        this.close();
      }
    });
  }
}

export {Popup};