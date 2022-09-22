const selectors = {
  // popup
  popup: ".popup",
  popupProfile:'.popup_use_profile',
  popupCard:'.popup_use_card',
  popupImg:'.popup_use_img',
  form: ".popup__form",
  inputName: ".popup__input_value_name",
  inputDesc: ".popup__input_value_desc",
  closeBtn: ".popup__close-btn",
  // PROFILE
  profile:'.profile',
  name: ".profile__name",
  work:".profile__description",
  editBtn: ".profile__edit-btn",
  addBnt: ".profile__add-btn",

  template:"#card-tmp",
  cardItem:".place__item"

};

// *popup and form
const formElement = document.querySelector(selectors.form);
const nameInput = formElement.querySelector(selectors.inputName);
const descInput = formElement.querySelector(selectors.inputDesc);
const popup = document.querySelector(selectors.popup);
const closePopupBnts = document.querySelectorAll(selectors.closeBtn);
const popupProfile = document.querySelector(selectors.popupProfile)
const popupImg = document.querySelector(selectors.popupImg);
const popupCard = document.querySelector(selectors.popupCard);
console.log(closePopupBnts)

// *PROFILE
const profile = document.querySelector(selectors.profile)
const profileEditBtn = profile.querySelector(selectors.editBtn);
const addCardBtn = profile.querySelector(selectors.addBnt);
const name = profile.querySelector(selectors.name);
const work = profile.querySelector(selectors.work);


// *CARD
const template = document.querySelector(selectors.template);


// *SUBMIT EDIT PROFILE FORM
function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInput.value = profile.querySelector(selectors.name).textContent;
  descInput.value = profile.querySelector(selectors.work).textContent;
  name.textContent = nameInput.value;
  work.textContent = descInput.value;
  closePopup(popupProfile);
}

// *PROFILE EDIT SUBMIT
formElement.addEventListener("submit", formSubmitHandler);

//*POPUP OPEN
function openPopupHandler(popup){
  popup.classList.add('popup__opened');
}

//*POPUP CLOSE

closePopupBnts.forEach((bnt) => {
  console.log(bnt)
  bnt.addEventListener('click',(evt) => {
    const popup = evt.target.closest('.popup')
    closePopup(popup)
  })
});

function closePopup(popup) {
  popup.classList.remove("popup__opened");
}


// *PROFILE BUTTONS LISTENER

profileEditBtn.addEventListener('click',() => {
  openPopupHandler(popupProfile)
})

addCardBtn.addEventListener('click',() => {
  openPopupHandler(popupCard);
})






function renderCards(element){

}

function makeCard(element){
  const card = template.content.querySelector(selectors.cardItem).cloneNode(true)
  console.log(card)


}
makeCard()

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    
  },
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
];




// // *RENDER CARDS

// function renderCards() {
//   const placeContainer = document.querySelector(".place__container");
//   setCards(placeContainer);
//   removeCads();
//   likeButton();
//   imgSetListener();
// }
// renderCards();

// function setCards(container) {
//   initialCards.reverse();
//   initialCards.forEach((item) => {
//     if (!item.load) {
//       item.load = true;
//       const templete = document.querySelector("#card-tmp").content;
//       let cardElement = templete.querySelector(".place__item").cloneNode(true);
//       cardElement.querySelector(".place__img").src = item.link;
//       cardElement.querySelector(".place__img").alt = item.name;
//       cardElement.querySelector(".place__title").textContent = item.name;
//       container.prepend(cardElement);
//     }
//   });
// }

// // *REMOVE CARDS
// function removeCads() {
//   const dellCardsButtens = document.querySelectorAll(".place__btn-del");
//   dellCardsButtens.forEach((button) => {
//     button.addEventListener("click", (evt) => {
//       const dellButton = evt.target;
//       const placeItem = dellButton.closest(".place__item");
//       placeItem.remove();
//     });
//   });
// }
// // *LIKE BUTTON
// function likeButton() {
//   const likeButtons = document.querySelectorAll(".place__btn-like");
//   likeButtons.forEach((like) => {
//     like.addEventListener("click", (evt) => {
//       likeItem = evt.target;
//       likeItem.classList.toggle("place__btn-like_status_liked");
//     });
//   });
// }

// // *CARD POPUP OPEN
// const profileAddButton = document.querySelector(".profile__add-btn");
// const popupCards = document.querySelector(".popup_use_card");
// profileAddButton.addEventListener("click", () => {
//   popupOpenHandler(popupCards);
// });
// const closeCardButton = popupCards.querySelector(".popup__close-btn-card");
// closeCardButton.addEventListener("click", () => {
//   popupCloseHandler(popupCards);
// });

// // *ADD CARD FROM POPUP

// const form = popupCards.querySelector(".popup__form_use_card");
// function addCard() {
//   const name = popupCards.querySelector(".popup__input_value_name");
//   const link = popupCards.querySelector(".popup__input_value_link");
//   const card = {
//     name: name.value,
//     link: link.value,
//     load: false,
//   };
//   initialCards.push(card);
//   form.reset();
// }
// // *SUBMIT CARD FORM
// form.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   addCard();
//   likeButton();
//   renderCards();
//   popupCloseHandler(document.querySelector(".popup_use_card"));
// });

// // *IMG POPUP LISTENER (OPEN)

// function imgSetListener() {
//   const popupImg = document.querySelector(".popup_use_img");
//   const imgs = document.querySelectorAll(".place__img");
//   imgs.forEach((image) => {
//     image.addEventListener("click", (evt) => {
//       const img = evt.target;
//       popupImg.querySelector(".popup__img").src = img.src;
//       popupImg.querySelector(".popup__desc").textContent = img.alt;
//       popupOpenHandler(popupImg);
//     });
//   });
// }
