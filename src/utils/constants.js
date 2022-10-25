export const initialCards = [
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

export const selectors = {
  // popup
  popup: ".popup",
  popupProfile: ".popup_use_profile",
  popupCard: ".popup_use_card",
  popupImg: ".popup_use_img",
  form: ".popup__form",
  popupInput: ".popup__input",
  inputName: ".popup__input_value_name",
  inputDesc: ".popup__input_value_desc",
  inputLink: ".popup__input_value_link",
  closeBtn: ".popup__close-btn",
  popupImage: ".popup__img",
  popupImgHeading: ".popup__desc",
  popupOpen: "popup__opened",
  // PROFILE
  profile: ".profile",
  name: ".profile__name",
  work: ".profile__description",
  editBtn: ".profile__edit-btn",
  addBnt: ".profile__add-btn",
  //template
  template: "#card-tmp",
  cardItem: ".place__item",
  cardImage: "place__img",
  cardLikeBtn: ".place__btn-like",
  cardDellBtn: ".place__btn-del",
  //place
  place: ".place",
  placeContainer: ".place__container",
  placeImg: ".place__img",
};
export const cardSelectors = {
  cardItem: ".place__item",
  cardImg: ".place__img",
  cardTitle: ".place__title",
  cardLikeBtnActive: "place__btn-like_status_liked",
  like: "place__btn-like",
  likeButton: ".place__btn-like",
  popupImg: ".popup_use_img",
  remove: "place__btn-del",
};

export const popupSelecors = {
  popupInput: ".popup__input",
  popupInputTypeEror: "popup__input_type_error",
  popupInputError: "poup__input-error",
  popupForm: ".popup__form",
  popupInactiveBtn: "popup__btn-inactive",
  buttonSave: ".popup__btn-save",
};

// *popup and form
const formElement = document.querySelector(selectors.form);
const nameInput = formElement.querySelector(selectors.inputName);
const descInput = formElement.querySelector(selectors.inputDesc);
const popupProfile = document.querySelector(selectors.popupProfile);
const popupCard = document.querySelector(selectors.popupCard);
const popupWithImg = document.querySelector(selectors.popupImg);
const forms = Array.from(document.forms);


// *PROFILE
const profile = document.querySelector(selectors.profile);
const profileEditBtn = profile.querySelector(selectors.editBtn);
const addCardBtn = profile.querySelector(selectors.addBnt);
const name = profile.querySelector(selectors.name);
const work = profile.querySelector(selectors.work);

// *CARD
const template = document.querySelector(selectors.template).content;
const placeContainer = document.querySelector(selectors.placeContainer);

export {
  popupWithImg,
  formElement,
  nameInput,
  descInput,
  popupProfile,
  popupCard,
  forms,
  profile,
  profileEditBtn,
  addCardBtn,
  name,
  work,
  template,
  placeContainer,
};
