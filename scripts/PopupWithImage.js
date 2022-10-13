import { Popup } from "./Popup";
import {selectors} from "./index.js";

class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._popupImg = this._popupSelecotor.querySelector(selectors.popupImage);
        this._popupHeading = this._popupSelecotor.querySelector(selectors.popupImgHeading);
    }
    open(name,heading){
        this._popupImg.src = name;
        this._popupHeading.textContent = heading;
        super.open();
    }

}