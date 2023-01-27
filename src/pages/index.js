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
  popupWithImg,
  popupProfile,
  popupCard,
  forms,
  profileEditBtn,
  addCardBtn,
  name,
  work,
  headers,
  url,
  placeContainer,
  cardDelButton,
  delPopup,
  userId,
  avatarUpdatePopup,
  avatarIcon,
} from "../utils/constants.js";

// Api
const api = new Api({ url: url, headers: headers });

const upadeUserInfo = new UserInfo({
  name: name,
  about: work,
  avatar: avatarIcon,
});
let userData;
let myCardData;

Promise.all([getUser,getCards])
  .then(([getUser,getCards]) => {
    console.log(getUser);
    console.log(getCards);
  })
  .catch(error => {
    console.log(error)
  })

//Инициализация инфомации о пользователе 
const getUser = api.getUserInfo().then((userInfo) => {
  // console.log(userInfo);
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
  const sendCardInfo = api.setCard(formValues);
  sendCardInfo.then((cardData) => {
    myCardData = cardData;
    handlePopups(myCardData,() => {
      const formInputsArray = [myCardData];
      loadCards(formInputsArray);
    })
    popupWithFormInstance.close(true);
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
      removeCard();
      popupConferm.close();
    },
  });
  popupConferm.open();
  popupConferm.setEventListeners();
}


const updateUserInfoHandler = (inputsData,instance,response) => {
  const update = response(inputsData);
    update.then(newUserInfo => {
      userData.avatar = newUserInfo.avatar;
      console.log(userData);
      upadeUserInfo.setUserInfo(newUserInfo);
  });
  instance.close(false);
}

// Обновление авы
const avatarInstance = new PopupWithForm(avatarUpdatePopup,(avatar) => {
  updateUserInfoHandler(avatar,avatarInstance,(userData) => {
    const res = api.updateAvatar(userData);
    return res;
  })
})
avatarInstance.setEventListeners();


// Обновление профеля пользователя имя и род деятельности 
const profileSetInstance = new PopupWithForm(popupProfile, (newProfileInfo) => {
  updateUserInfoHandler(newProfileInfo,profileSetInstance,(userData) => {
    const res = api.updateUserInfo(userData);
    return res;
  })
});
profileSetInstance.setEventListeners();


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
avatarIcon.addEventListener("click", (evt) => {
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

