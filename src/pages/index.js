import "./index.css";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { selectors } from "../utils/constants.js";
import { cardSelectors } from "../utils/constants.js";
import { popupSelecors } from "../utils/constants.js";
import { initialCards } from "../utils/constants.js";

import {
  popupWithImg,
  nameInput,
  descInput,
  popupProfile,
  popupCard,
  forms,
  popupImage,
  popupHeading,
  profileEditBtn,
  addCardBtn,
  name,
  work,
  placeContainer,
} from "../utils/constants.js";

fillProfile({ name: name.textContent, desc: work.textContent });
// CARD ADD inition cards
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link, cardSelectors, () => {
        popupImgHandler(item);
      });
      const cardtemplate = card.genaraeteTemplate();
      cardList.addItem(cardtemplate);
    },
  },
  placeContainer
);
cardList.renderItems();

function popupImgHandler({ name, link }) {
  const popupImg = new PopupWithImage(popupWithImg);
  popupImage.src = link;
  popupHeading.textContent = name;
  popupWithImg.classList.add(selectors.popupOpen);
  popupImg.setEventListeners();
}

// Add card form Input
const popupCards = new PopupWithForm(popupCard, (FormValues) => {
  const arrFromValues = [FormValues];
  const cardList = new Section(
    {
      items: arrFromValues,
      renderer: (item) => {
        const card = new Card(item.name, item.link, cardSelectors, () => {
          popupImgHandler(item);
        });
        const cardtemplate = card.genaraeteTemplate();
        cardList.addItem(cardtemplate);
      },
    },
    placeContainer
  );
  cardList.renderItems();
  popupCards.close(true);
});
popupCards.setEventListeners();

// add Listerner for popup open buttons

addCardBtn.addEventListener("click", () => {
  const openCardPopup = new Popup(popupCard);
  openCardPopup.open();
});

// add Profile lsitener and set profile info
const profileSet = new PopupWithForm(popupProfile, (profileValues) => {
  const profile = new UserInfo({ name: name, desc: work });
  profile.setUserInfo(profileValues);
  const profileInfo = profile.getUserInfo();
  profileSet.close(false);
});
profileSet.setEventListeners();

profileEditBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  const popup = new Popup(popupProfile);
  popup.open();
});

function fillProfile({ name, desc }) {
  nameInput.value = name;
  descInput.value = desc;
}

// Add Validation on forms
forms.forEach((form) => {
  const validForm = new FormValidator(popupSelecors, form);
  validForm.enableValidation();
});
fillProfile({ name: name.textContent, desc: work.textContent });
