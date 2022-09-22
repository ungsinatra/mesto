const selectors = {
  // popup
  popup: ".popup",
  popupProfile: ".popup_use_profile",
  popupCard: ".popup_use_card",
  popupImg: ".popup_use_img",
  form: ".popup__form",
  inputName: ".popup__input_value_name",
  inputDesc: ".popup__input_value_desc",
  inputLink: ".popup__input_value_link",
  closeBtn: ".popup__close-btn",
  popupImage: ".popup__img",
  popupImgHeading: ".popup__desc",
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
  cardLikeBtn: ".place__btn-like",
  cardLikeBtnActive: "place__btn-like_status_liked",
  cardDellBtn: ".place__btn-del",
  //place
  place: ".place",
  placeContainer: ".place__container",
  placeImg: ".place__img",
};

// *popup and form
const formElement = document.querySelector(selectors.form);
const nameInput = formElement.querySelector(selectors.inputName);
const descInput = formElement.querySelector(selectors.inputDesc);
const popup = document.querySelector(selectors.popup);
const closePopupBnts = document.querySelectorAll(selectors.closeBtn);
const popupProfile = document.querySelector(selectors.popupProfile);
const popupImg = document.querySelector(selectors.popupImg);
const popupCard = document.querySelector(selectors.popupCard);
const formAddCard = popupCard.querySelector(selectors.form);

// *PROFILE
const profile = document.querySelector(selectors.profile);
const profileEditBtn = profile.querySelector(selectors.editBtn);
const addCardBtn = profile.querySelector(selectors.addBnt);
const name = profile.querySelector(selectors.name);
const work = profile.querySelector(selectors.work);

// *CARD
const template = document.querySelector(selectors.template).content;
//*PLACE
const place = document.querySelector(selectors.place);
const placeContainer = place.querySelector(selectors.placeContainer);
const placeImg = place.querySelector(selectors.placeImg);

// *SUBMIT EDIT PROFILE FORM
function formSubmitHandler(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  work.textContent = descInput.value;
  nameInput.value = profile.querySelector(selectors.name).textContent;
  descInput.value = profile.querySelector(selectors.work).textContent;
  closePopup(popupProfile);
}

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

//*CARDS IMG LISTENER
function popupImgOpenHandler(img) {
  img.addEventListener("click", (evt) => {
    console.log("asdas");
    const img = evt.target;
    popupImg.classList.add("popup__opened");
    popupImg.querySelector(selectors.popupImage).src = img.src;
    popupImg.querySelector(selectors.popupImgHeading).textContent = img.alt;
  });
}

// *ADD CARDS

function renderCards(element) {
  placeContainer.prepend(makeCard(element));
}

function likeCardHandler(like) {
  like.addEventListener("click", (evt) => {
    console.log("asdasd");
    evt.target.classList.toggle(selectors.cardLikeBtnActive);
  });
}
function removeCardHandler(dellBtn) {
  dellBtn.addEventListener("click", (evt) => {
    const cardElemet = evt.target.parentNode;
    cardElemet.remove();
  });
}

function makeCard(element) {
  const card = template.querySelector(".place__item").cloneNode(true);
  const cardTitle = card.querySelector(selectors.cardTitle);
  const cardDellBtn = card.querySelector(selectors.cardDellBtn);
  const cardLikeBtn = card.querySelector(selectors.cardLikeBtn);
  const cardImg = card.querySelector(selectors.cardImg);

  cardImg.src = element.link;
  cardImg.alt = element.name;
  cardTitle.textContent = element.name;
  likeCardHandler(cardLikeBtn);
  removeCardHandler(cardDellBtn);
  popupImgOpenHandler(cardImg);
  return card;
}
function addCardInputHandler() {
  const name = formAddCard.querySelector(selectors.inputName).value;
  const link = formAddCard.querySelector(selectors.inputLink).value;
  renderCards({ name, link });
  formAddCard.reset();
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

initialCards.forEach((card) => {
  renderCards(card);
});
