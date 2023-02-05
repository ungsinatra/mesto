// Импорты

import "./index.css";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { cardSelectors } from "../utils/constants.js";
import { popupSelecors } from "../utils/constants.js";
import { Api } from "../components/Api";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import {
  avatarInput,
  aboutInput,
  nameInput,
  popupWithImg,
  popupProfile,
  popupCard,
  forms,
  profileEditBtn,
  addCardBtn,
  name,
  about,
  headers,
  url,
  placeContainer,
  delPopup,
  avatarUpdatePopup,
  avatarIcon,
  avatarEditButton,
} from "../utils/constants.js";

// Api
const api = new Api({ url: url, headers: headers });

const upadeUserInfo = new UserInfo({
  name: name,
  about: about,
  avatar: avatarIcon,
});
let userData;
let myCardData;

function fillInputValues(inputData) {
  nameInput.value = inputData.name;
  aboutInput.value = inputData.about;
  avatarInput.value = inputData.avatar;
}

//Инициализация инфомации о пользователе 
const getUser = api.getUserInfo().then((userInfo) => {
  console.log(userInfo)
  fillInputValues(userInfo);
  userData = userInfo;
  upadeUserInfo.setUserInfo(userData);
});


// Инициализация карточки 
const getCards = api
  .getCards()
  .then((data) => {
    loadCards(data);
  })
  .catch((err) => {
    console.log(err);
  });

Promise.all([getUser,getCards])
  .then(([getUser,getCards]) => {
  })
  .catch(error => {
    console.log(error)
  })

function loadCards(cardsInfo){
  const sectionInstance = new Section({items:cardsInfo,renderer:(item) => {
    renderCards(item,sectionInstance)
  }},placeContainer)

  sectionInstance.renderItems();
}
function renderCards(cardData,sectionInstance) {
  const cardInstance = new Card(cardData,cardSelectors,userData._id,() => {popupImgHandler(cardData)},(remove) => {removeCardsHandler(cardData,remove)},() => {likeHandler.call(cardInstance,{id:cardData._id})});
  const cardtemplate = cardInstance.genaraeteTemplate();
  sectionInstance.addItem(cardtemplate);
}


// Для попапа img карточек

function popupImgHandler({ name, link }) {
  const popupImg = new PopupWithImage(popupWithImg);
  popupImg.open(link, name);
  popupImg.setEventListeners();
}

// Добавление карточки через форму
function handlePopups(inputsData,callback) {
  callback(inputsData)
}
const popupWithFormInstance = new PopupWithForm(popupCard,(formValues) => {
  renderLoading(true,popupCard);
  const sendCardInfo = api.setCard(formValues);
  sendCardInfo.then((cardData) => {
      myCardData = cardData;
      handlePopups(myCardData,() => {
        const formInputsArray = [myCardData];
        loadCards(formInputsArray);
        popupWithFormInstance.close(true);
      })
  sendCardInfo.finally(() => {
        console.log('finally')
        renderLoading(false,popupCard);
    })
  });
  console.log(formValues);
})
popupWithFormInstance.setEventListeners()

// likeHandler

function likeHandler({ id }) {
  console.log(this)
  if (!this.isLiked()) {
    console.log("like");
    const res = api.likeCard({ _idCard: id, userData: userData });
    return res
      .then((data) => {
        this.changeLikeCount(data.likes);
      })
      .catch((err) => {
        console.error("ERROR:LIKE");
      });
  }
  if (this.isLiked()) {
    console.log("dislike");
    const res = api.removeLike({ _idCard: id, userData: userData });
    return res
      .then((data) => {
        this.changeLikeCount(data.likes);
      })
      .catch((err) => {
        console.error("ERROR:LIKE");
      });
  }
}


function removeCardsHandler(cardInfo, removeCard) {
 
  const popupConferm = new PopupWithConfirmation({
    popupSelector: delPopup,
    submitHandler: () => {
      const deleteCard = api.deleteCard(cardInfo);
      console.log(cardInfo)
      removeCard();
      popupConferm.close();
    },
  });
  popupConferm.open();
  popupConferm.setEventListeners();
}


const updateUserInfoHandler = (inputsData,instance,response,popupSelecor) => {
  const update = response(inputsData);
  update.then(newUserInfo => {
      userData.avatar = newUserInfo.avatar;
      upadeUserInfo.setUserInfo(newUserInfo);
  } )
  update.finally(() => {
    renderLoading(false,popupSelecor);
  })
  instance.close(false);
}

// Обновление авы
const avatarInstance = new PopupWithForm(avatarUpdatePopup,(avatar) => {
  renderLoading(true,avatarUpdatePopup);
  updateUserInfoHandler(avatar,avatarInstance,(userData) => {
    const res = api.updateAvatar(userData);
    return res;
  },avatarUpdatePopup)
})
avatarInstance.setEventListeners();


// Обновление профеля пользователя имя и род деятельности 
const profileSetInstance = new PopupWithForm(popupProfile, (newProfileInfo) => {
  renderLoading(true,popupProfile);
  updateUserInfoHandler(newProfileInfo,profileSetInstance,(userData) => {
    const res = api.updateUserInfo(userData);
    return res;
  },popupProfile)
});
profileSetInstance.setEventListeners();



function renderLoading(isLoading,popupSelector,text = 'Сохранение...') {
  const saveButton = popupSelector.querySelector('.popup__btn-save');
  if(isLoading){
    saveButton.textContent = text;
  }else{
    saveButton.textContent = 'Coхранить';
  }
}


//Слушатели 



// Слушатель для добавлекние карточки 
addCardBtn.addEventListener("click", () => {
  const openCardPopup = new Popup(popupCard);
  openCardPopup.open();
});

// Слушатель для редактирование профеля
profileEditBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  const popup = new Popup(popupProfile);
  popup.open();
});

// Слушатель для обновление аватарки
avatarEditButton.addEventListener("click", (evt) => {
  // updateAvatarHandler()
  evt.preventDefault();
  const openPopup = new Popup(avatarUpdatePopup);
  openPopup.open();
});

// Валидация формы
forms.forEach((form) => {
  const validForm = new FormValidator(popupSelecors, form);
  validForm.enableValidation();
});

