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
function popupOpenHandler(){
    console.log('sadasd')
    popup.classList.add('popup__opened');

}
function popupCloseHandler(){
    console.log('start')
    popup.classList.remove('popup__opened');

}
bntProfileEdit.addEventListener('click',popupOpenHandler)
closePopupBnt.addEventListener('click',popupCloseHandler)