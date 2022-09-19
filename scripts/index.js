const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_value_name');
const descInput = formElement.querySelector('.popup__input_value_desc');
const popup = document.querySelector('.popup');
const closePopupBnt = popup.querySelector('.popup__close-btn');

function formSubmitHandler(evt){
    evt.preventDefault();
    let nameValue = nameInput.value;
    let descValue = descInput.value;
    const profileName = document.querySelector('.profile__name').textContent = nameValue;
    const profileDesc = document.querySelector('.profile__description').textContent = descValue;
    popupCloseHandler()
}

formElement.addEventListener('submit',formSubmitHandler);


const bntProfileEdit = document.querySelector('.profile__edit-btn');
function popupOpenHandler(popup){
    popup.classList.add('popup__opened');}
function popupCloseHandler(popup){
    popup.classList.remove('popup__opened');
}
bntProfileEdit.addEventListener('click',() => {
  popupOpenHandler(popup)
})
closePopupBnt.addEventListener('click',() => {
  popupCloseHandler(popup);
})


// loadCards

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];



  
  function renderCards(){
    const placeContainer = document.querySelector('.place__container')
    setCards(placeContainer)
    removeCads();
    likeButton();
    imgSetListener()
    
  }
  function setCards(container){
    initialCards.forEach(item => {
      const templete = document.querySelector('#card-tmp').content;
      let cardElement = templete.querySelector('.place__item').cloneNode(true);
      cardElement.querySelector('.place__img').src = item.link;
      cardElement.querySelector('.place__img').alt = item.name;
      cardElement.querySelector('.place__title').textContent = item.name;
      container.append(cardElement)
  })
}

// dell cards
function removeCads(){
  const dellCardsButtens = document.querySelectorAll('.place__btn-del');
  dellCardsButtens.forEach(button => {
    button.addEventListener('click',(evt) => {
      const dellButton = evt.target;
      const placeItem = dellButton.closest('.place__item');
      placeItem.remove();
    })
  })
  
}
// likeButton = like Card
function likeButton(){
  const likeButtons = document.querySelectorAll('.place__btn-like');
  likeButtons.forEach(like => {
    like.addEventListener('click',evt => {
      likeItem = evt.target;
      likeItem.classList.toggle('place__btn-like_status_liked');
    })
  }) 
}
renderCards();



// popup 

// card popup open
const profileAddButton = document.querySelector('.profile__add-btn');
const popupCards = document.querySelector('.popup_use_card')
profileAddButton.addEventListener('click',() =>{
  popupOpenHandler(popupCards)
})
const closeCardButton = popupCards.querySelector('.popup__close-btn-card');
closeCardButton.addEventListener('click',() => {
  popupCloseHandler(popupCards);
})



// add card in popup


const form = popupCards.querySelector('.popup__form_use_card');
function addCard(){
  const name  = popupCards.querySelector('.popup__input_value_name').value;
  const link = popupCards.querySelector('.popup__input_value_link').value;
  const cardElement = document.querySelector('#card-tmp').content.cloneNode(true);
  cardElement.querySelector('.place__img').src = link;
  cardElement.querySelector('.place__img').alt = name;
  cardElement.querySelector('.place__title').textContent = name;
  const container = document.querySelector('.place__container');
  container.prepend(cardElement)

}
form.addEventListener('submit',() => {
  addCard();
  removeCads();
  imgSetListener()
  popupCloseHandler(popupCards)
})



// popup img 

function imgSetListener(){
  const popupImg = document.querySelector('.popup_use_img');
  const imgs = document.querySelectorAll('.place__img');
  console.log(imgs)
  imgs.forEach(img => {
    img.addEventListener('click',(evt) => {
      const imgs = evt.target;
      const desc = imgs.alt
      popupImg.querySelector('.popup__img').src = imgs.src;
      popupImg.querySelector('.popup__desc').textContent = imgs.alt;
      popupOpenHandler(popupImg)
    })
  })
}


