import  {FormValidator}  from "./FormValidator.js";
import {Card} from "./Card.js";


const selectors = {
  // popup
  popup: ".popup",
  popupProfile: ".popup_use_profile",
  popupCard: ".popup_use_card",
  popupImg: ".popup_use_img",
  form: ".popup__form",
  popupInput:'.popup__input',
  inputName: ".popup__input_value_name",
  inputDesc: ".popup__input_value_desc",
  inputLink: ".popup__input_value_link",
  closeBtn: ".popup__close-btn",
  popupImage: ".popup__img",
  popupImgHeading: ".popup__desc",
  popupOpen:"popup__opened",
  // PROFILE
  profile: ".profile",
  name: ".profile__name",
  work: ".profile__description",
  editBtn: ".profile__edit-btn",
  addBnt: ".profile__add-btn",
  //template
  template: "#card-tmp",
  cardItem: ".place__item",
  cardTitle: ".place__title",
  cardImg: ".place__img",
  cardImage: "place__img",
  cardLikeBtn: ".place__btn-like",
  cardLikeBtnActive: "place__btn-like_status_liked",
  cardDellBtn: ".place__btn-del",
  like:'place__btn-like',
  remove:'place__btn-del',
  //place
  place: ".place",
  placeContainer: ".place__container",
  placeImg: ".place__img",
};



// *popup and form
const formElement = document.querySelector(selectors.form);
const nameInput = formElement.querySelector(selectors.inputName);
const descInput = formElement.querySelector(selectors.inputDesc);
const closePopupBnts = document.querySelectorAll(selectors.closeBtn);
const popupProfile = document.querySelector(selectors.popupProfile);
const popupCard = document.querySelector(selectors.popupCard);
const formAddCard = popupCard.querySelector(selectors.form);
const popupImg = document.querySelector(selectors.popupImg)

// *PROFILE
const profile = document.querySelector(selectors.profile);
const profileEditBtn = profile.querySelector(selectors.editBtn);
const addCardBtn = profile.querySelector(selectors.addBnt);
const name = profile.querySelector(selectors.name);
const work = profile.querySelector(selectors.work);

// *CARD
const template = document.querySelector(selectors.template).content;
const placeContainer = document.querySelector(selectors.placeContainer)
nameInput.value = profile.querySelector(selectors.name).textContent;
descInput.value = profile.querySelector(selectors.work).textContent;

function fillInputs(){
  nameInput.value = profile.querySelector(selectors.name).textContent;
  descInput.value = profile.querySelector(selectors.work).textContent;
}


// *SUBMIT EDIT PROFILE FORM

function formSubmitHandler(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  work.textContent = descInput.value;
  fillInputs()
  closePopup(popupProfile);
}



// fillProfileInputs()
// *PROFILE EDIT SUBMIT

formElement.addEventListener("submit", formSubmitHandler);



//*POPUP OPEN

function openPopupHandler(popup) {
  popup.classList.add("popup__opened");
}



//*POPUP CLOSE

closePopupBnts.forEach((bnt) => {
  bnt.addEventListener("click", (evt) => {
    const popup = evt.target.closest(".popup");
    closePopup(popup);
  });
});


function closePopup(popup) {
  popup.classList.remove("popup__opened");
}
//* ADD CARD BNT LISTENER
formAddCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  addCardInputHandler();
  closePopup(popupCard);
});

// *PROFILE BUTTONS LISTENER

profileEditBtn.addEventListener("click", () => {
  openPopupHandler(popupProfile);
});

addCardBtn.addEventListener("click", () => {
  openPopupHandler(popupCard);
});

// //*CARDS IMG LISTENER
function popupImgOpenHandler(template) {
  const img = template.querySelector('.place__img');
  img.addEventListener("click", (evt) => {
    console.log("asdas");
    popupImg.classList.add("popup__opened");
    popupImg.querySelector(selectors.popupImage).src = img.src;
    popupImg.querySelector(selectors.popupImgHeading).textContent = img.alt;
  });
}

const initialCards = [
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
];

initialCards.forEach((element) => {
  const card = new Card(element.name,element.link,selectors,template);
  const cardtemplate = card.genaraeteTemplate();
  placeContainer.prepend(cardtemplate)
  popupImgOpenHandler(cardtemplate)
});


function addCardInputHandler() {
  const name = formAddCard.querySelector(selectors.inputName).value;
  const link = formAddCard.querySelector(selectors.inputLink).value;
  const card = new Card( name,link, selectors, template);
  const cardtemplate = card.genaraeteTemplate();
  placeContainer.prepend(cardtemplate)
  popupImgOpenHandler(cardtemplate)
  formAddCard.reset();
}

// *ESC 


function closePopupOverlayEscape(popup){
  document.addEventListener('keydown',function(evt){
    if(evt.key === 'Escape'){
      closePopup(popup)
      fillInputs()
    }
  })
}
function closePopupClickOverlay(popup){
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup') ){
      closePopup(popup)
      fillInputs()
      
    }
  })
}
function setListenerPopups(){
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach(popup => {
    closePopupOverlayEscape(popup);
    closePopupClickOverlay(popup)
  })
}
setListenerPopups()


const popupSelecors = {
  popupInput: ".popup__input",
  popupInputTypeEror: "popup__input_type_error",
  popupInputError: "poup__input-error",
  popupForm: ".popup__form",
  popupInactiveBtn: "popup__btn-inactive",
  button: "button",
};

function setInput(){
  const forms = Array.from(document.forms);
  forms.forEach(form => {
    const validForm = new FormValidator(popupSelecors,form);
    validForm.enableValidation(selectors)
  })
}
setInput()





