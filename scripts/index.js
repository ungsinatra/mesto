const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_value_name');
const descInput = formElement.querySelector('.popup__input_value_desc');
const popup = document.querySelector('.popup');
const closePopupBnt = popup.querySelector('.popup__close-btn');
const bntProfileEdit = document.querySelector('.profile__edit-btn');

function formSubmitHandler(evt){
    evt.preventDefault();
    let nameValue = nameInput.value;
    let descValue = descInput.value;
    const profileName = document.querySelector('.profile__name').textContent = nameValue;
    const profileDesc = document.querySelector('.profile__description').textContent = descValue;
    popup.classList.remove('popup__opened')
}

formElement.addEventListener('submit',formSubmitHandler);

//*POPUP OPEN 
function popupOpenHandler(popup){
    popup.classList.add('popup__opened');
}



//*POPUPS CLOSE
function popupClose(){
    const closeBtn = document.querySelectorAll('.popup__close-btn')
    closeBtn.forEach(bnt => {
      bnt.addEventListener('click',(evt) => {
        let button = evt.target;
        let pop = button.closest('.popup')
        pop.classList.remove('popup__opened');
        console.log(popup)
      })
    })
}
function popupCloseHandler(popup){
  popup.classList.remove('popup__opened')
}

// *LISTENER FOR PROFILE EDIT BTN
bntProfileEdit.addEventListener('click',() => {
  nameInput.value = document.querySelector('.profile__name').textContent
  descInput.value = document.querySelector('.profile__description').textContent
  popupOpenHandler(popup)
})
popupClose()

// *LOADS CARD

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
      load:false,
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
      load:false,
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
      load:false,
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
      load:false,
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
      load:false,
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
      load:false,
    }
  ];


  // *RENDER CARDS
  
  function renderCards(){
    const placeContainer = document.querySelector('.place__container')
    setCards(placeContainer)
    removeCads();
    likeButton();
    imgSetListener()
    
  }
  renderCards();


  function setCards(container){
    initialCards.reverse();
    initialCards.forEach(item => {
      if(!item.load){
      item.load = true;
      const templete = document.querySelector('#card-tmp').content;
      let cardElement = templete.querySelector('.place__item').cloneNode(true);
      cardElement.querySelector('.place__img').src = item.link;
      cardElement.querySelector('.place__img').alt = item.name;
      cardElement.querySelector('.place__title').textContent = item.name;
      container.prepend(cardElement)
      }
  })
}

// *REMOVE CARDS
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
// *LIKE BUTTON
function likeButton(){
  const likeButtons = document.querySelectorAll('.place__btn-like');
  likeButtons.forEach(like => {
    like.addEventListener('click',evt => {
      likeItem = evt.target;
      likeItem.classList.toggle('place__btn-like_status_liked');
    })
  }) 
}




// *CARD POPUP OPEN
const profileAddButton = document.querySelector('.profile__add-btn');
const popupCards = document.querySelector('.popup_use_card')
profileAddButton.addEventListener('click',() =>{
  popupOpenHandler(popupCards)
})
const closeCardButton = popupCards.querySelector('.popup__close-btn-card');
closeCardButton.addEventListener('click',() => {
  popupCloseHandler(popupCards);
})



// *ADD CARD FROM POPUP


const form = popupCards.querySelector('.popup__form_use_card');
function addCard(){
  const name  = popupCards.querySelector('.popup__input_value_name');
  const link = popupCards.querySelector('.popup__input_value_link');
  const card = {
    name:name.value,
    link:link.value,
    load:false,
  }
  initialCards.push(card);
  form.reset()
}
// *SUBMIT CARD FORM
form.addEventListener('submit',(evt) => {
  evt.preventDefault()
  addCard();
  likeButton()
  renderCards()
  popupCloseHandler(document.querySelector('.popup_use_card'))
})


// *IMG POPUP LISTENER (OPEN)

function imgSetListener(){
  const popupImg = document.querySelector('.popup_use_img');
  const imgs = document.querySelectorAll('.place__img');
  imgs.forEach(image => {
    image.addEventListener('click',(evt) => {
      const img = evt.target;
      popupImg.querySelector('.popup__img').src = img.src;
      popupImg.querySelector('.popup__desc').textContent = img.alt;
      popupOpenHandler(popupImg)
    })
  })
}



